import React, { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import { useQuery } from "react-query";
import Image from "next/image";
import { LazyLoadImage } from "react-lazy-load-image-component";

import autoAnimate from "@formkit/auto-animate";

interface picData {
  id: string | number;
  name: string;
  about: string;
  picUrl: string;
  amount?: number;
}

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
  fetch("https://tech-top-sellsbot.vercel.app/api/bidbad/getpics")
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
  const [contendersNumber, setContendersNumber] = useState(0);
  const [picsArray, setPicsArray] = useState<any[]>();

  const pics = useQuery({
    queryKey: "getpics",
    queryFn: fetchPics,
  });

  useEffect(() => {
    if (picsArray == undefined && pics.data !== undefined) {
      setPicsArray([...pics.data.contenders]);
    }
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
  return (
    <div dir="rtl" className="flex flex-col items-center w-screen">
      <div className="flex mt-8 mb-20">
        <h3 className="ml-8"> זמן לסיום ההימורים</h3>
        <Countdown date={Date.now() + 1000000000} />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <p className="ml-4">מי יותר</p>
          <p className={"text-4xl text-red-400"}>יהרוג את כולם</p>
        </div>

        {pics.data && pics.data != undefined && (
          <div className="flex w-10/12 justify-center border-gray-300 border-2 mt-4   ">
            {contendersNumber <= pics.data.questions.length - 1 ? (
              <div className="flex">
                <Contender handleClick={handleClick} picData={pics.data.questions[contendersNumber]} />
                <Contender handleClick={handleClick} picData={pics.data.questions[contendersNumber + 1]} />
              </div>
            ) : (
              <div>
                {
                  /*@ts-ignore*/
                  picsArray &&
                    picsArray
                      ?.sort((a: any, b: any) => b.amount - a.amount)
                      .map((pic) => <Contender handleClick={handleClick} picData={pic} />)
                }
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface contenderProps {
  picData: picData;
  handleClick: any;
}

export function Contender(props: contenderProps) {
  return (
    <div className="flex flex-col items-center mt-8 ml-6 mr-8 " onClick={props.handleClick}>
      <p>{props.picData.name}</p>
      <div className="relative w-48 h-48 ml-8 mr-8 mb-8">
        <Image
          id={props.picData.name}
          src={props.picData.picUrl}
          fill={true}
          className="w-48 h-50 hover:bg-slate-300 rounded-2xl mb-8 h-40"
          alt="Image Alt"
        />
      </div>
    </div>
  );
}
