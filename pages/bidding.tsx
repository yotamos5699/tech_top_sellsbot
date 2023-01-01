import React, { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import { useQuery } from "react-query";
import Image from "next/image";
import * as process from "process";
import { LazyLoadImage } from "react-lazy-load-image-component";

import autoAnimate from "@formkit/auto-animate";

import {
  DndContext,
  closestCorners,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable";
interface picData {
  id: string | number;
  name: string;
  about: string;
  picUrl: string;
  amount?: number;
}
const PORT = "https://tech-top-sellsbot.vercel.app/"; //|| "http://localhost:3000/";
console.log({ PORT });
const setContenders = (contenders: picData[]) => {
  let sequens = [];
  for (let i = 0; i <= contenders.length - 2; i++) {
    for (let j = 1 + i; j <= contenders.length - 1; j++)
      sequens.push({ ...contenders[i], amount: 0 }, { ...contenders[j], amount: 0 });
  }
  console.log({ sequens });
  return sequens;
};

const fetchPics = async () =>
  fetch(PORT + "api/bidbad/getpics")
    .then((res) => {
      console.log({ res });
      return res.json();
    })
    .then((res) => {
      const questions = setContenders(res);
      const contenders = res.map((con: picData) => {
        return { ...con, amount: 0 };
      });
      return { questions: questions, contenders: contenders };
    });

export default function Bidding() {
  // const [show, setShow] = useState(false);
  // const parent = useRef(null);
  const [isFinished, setIsFinished] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [contendersNumber, setContendersNumber] = useState(0);
  const [picsArray, setPicsArray] = useState<any[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const pics = useQuery({
    queryKey: "getpics",
    queryFn: fetchPics,
  });

  useEffect(() => {
    if (contendersNumber * 2 - 1 == pics.data?.questions.length) {
      setPicsArray((prev) => prev.sort((a: any, b: any) => b.amount - a.amount));
      setIsFinished(true);
      console.log({ isFinished });
    }
  }, [picsArray]);

  useEffect(() => {
    console.log("pics.data", pics.data, { picsArray });
    if (picsArray[0] == undefined && pics.data?.contenders !== undefined) {
      console.log({ pics });
      setPicsArray([...pics.data.contenders]);
    }
    console.log("in use effect", { picsArray });
  }, [pics.data]);

  const handleClick = (e: any) => {
    console.log("id", e.target.id);
    setContendersNumber((prev) => prev + 2);
    setPicsArray((prev) =>
      prev?.map((pic: picData) => {
        if (e.target.id == pic.name && (pic.amount === 0 || pic.amount)) {
          console.log("pic name", pic.name);
          return { ...pic, amount: pic.amount + 1 };
        } else return pic;
      })
    );
    console.log({ picsArray });
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      console.log({ active, over });
      setPicsArray((pics: any) => {
        let oldIndex = 0;
        pics.forEach((pic: picData, index: number) => {
          if (active.id == pic.id) oldIndex = index;
        });
        let newIndex = 0;
        pics.forEach((pic: picData, index: number) => {
          if (over.id == pic.id) newIndex = index;
        });
        console.log({ oldIndex, newIndex });
        let newArray: picData[] = [];
        picsArray.forEach((pic: picData, index: number) => {
          newArray.push(index == oldIndex ? picsArray[newIndex] : index == newIndex ? picsArray[oldIndex] : pic);
        });
        return [...newArray];
      });
    }
    console.log({ picsArray });
  };

  //   {items.map((id) => (
  //     <SortableItem key={id} id={id} handle={true} value={id} />
  //   ))}

  // </SortableContext>

  return (
    <div dir="rtl" className="flex flex-col items-center w-screen touch-none">
      <div className="flex mt-8 mb-20">
        <h3 className="ml-8"> זמן לסיום ההימורים</h3>
        <Countdown date={Date.now() + 1000000000} />
      </div>
      <div className="flex flex-col items-center align-middle">
        <div className="flex items-center">
          <p className="ml-4">מי יותר</p>
          <p className={"text-4xl text-red-400"}>יהרוג את כולם</p>
        </div>
        {isFinished && (
          <div className="flex w-full justify-between gap-20 mt-5 items-center self-center">
            {" "}
            <p className="mr-8"> הדירוג שלך, ניתן לתקן את סדר המקומות </p>
            <p
              className={
                "w-1/6 text-center ml-8 bg-blue-500 hover:bg-blue-400 text-white font-bold border rounded  py-2 px-3 border-blue-700 hover:border-blue-500"
              }
            >
              שלח
            </p>
          </div>
        )}
        {pics.data && pics.data != undefined && (
          <div className="flex flex-col items-center w-screen justify-center  ">
            {contendersNumber <= pics.data.questions.length - 1 ? (
              <div className=" border-gray-300 border-2 mt-4 sm:w-10/12  max-w-[1000px]">
                <div className="flex flex-col sm:flex-row   ">
                  <Contender handleClick={handleClick} picData={pics.data.questions[contendersNumber]} />
                  <Contender handleClick={handleClick} picData={pics.data.questions[contendersNumber + 1]} />
                </div>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
              >
                <SortableContext items={picsArray} strategy={rectSortingStrategy}>
                  <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 sm:mt-6 w-screen">
                    {
                      /*@ts-ignore*/
                      picsArray &&
                        picsArray.map((pic, index) => (
                          <div key={pic.id} className="relative sm:w-full">
                            <p className="absolute  w-1/6 h-1/6 text-center align-text-bottom text-xl mr-6 border-gray-300 border-2 rounded-lg">
                              {index + 1}
                            </p>{" "}
                            <Contender
                              isFinished={isFinished}
                              key={pic.id}
                              id={pic.id}
                              handleClick={handleClick}
                              picData={pic}
                            />
                          </div>
                        ))
                    }
                  </div>
                  <DragOverlay>
                    {activeId ? (
                      <div
                        style={{
                          //  width: "100px",
                          //  height: "100px",
                          backgroundColor: "red",
                        }}
                      ></div>
                    ) : null}
                  </DragOverlay>
                </SortableContext>
              </DndContext>
            )}
            <p className="mt-4 flex justify-center items-center gap-6">
              <span className="flex space-x-4"> בחירה </span>
              <span className="flex space-x-4 text-rose-300 text-xl font-bold">|{contendersNumber / 2 + 1}|</span>
              <span>מתוך</span>

              <span className=" text-rose-300 text-xl font-bold">|{pics.data.questions.length / 2}|</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface contenderProps {
  picData: picData;
  handleClick: any;
  id?: any;
  isFinished?: boolean;
}

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// const SortableItem = (props) => {

//   return (
//     <div >
//       <Box>
//         <button>
//           Drag handle
//         </button>
//         <div
//           style={{
//             minWidth: "30px",
//             minHeight: "20px",
//             border: "1px solid balck",
//             borderColor: "black"
//           }}
//         >
//           {props.value}
//         </div>
//       </Box>
//     </div>
//   );
// };

export function Contender(props: contenderProps) {
  // console.log(" id", props.id);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.id,
  });
  isDragging && console.log("pic id", props.picData.id);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    //  width: "100px",
    //   height: "100px",
    // border: "2px solid red",
    // backgroundColor: "#cccccc",
    //margin: "10px",
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging && props.isFinished ? 0.3 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex flex-col items-center mt-8 ml-6 mr-8 sm:w-full"
      onClick={props.handleClick}
    >
      <p>{props.picData.name}</p>
      <div
        className="relative w-48 h-48 sm:h-10/12 sm:w-8/12  ml-8 mr-8 mb-8
      
      transition duration-500 ease-in-out bg-gray-800 hover:bg-gray-300 transform hover:-translate-y-1 hover:scale-110 ...
      "
      >
        <Image
          id={props.picData.name}
          src={props.picData.picUrl}
          fill={true}
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
          className=" hover:bg-slate-300 rounded-2xl mb-8 h-40"
          alt="Image Alt"
        />
      </div>
    </div>
  );
}
