import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface picData {
  id: string | number;
  name: string;
  about: string;
  picUrl: string;
}
interface picError {
  status: string;
}

export default async function getpics(req: NextApiRequest, res: NextApiResponse<picData[] | picError>) {
  return await axios
    .get(
      "https://script.google.com/macros/s/AKfycbzlljYxq_oqWwpklZnioXWFLnSKQXtcl298GCnD6lE6MwQNJh96XZF3_lNNxPTwbHFyGQ/exec?type=getpics",
      { withCredentials: false }
    )
    .then((res: any) => res.data)
    .then((result: picData[]) => {
      console.log(result);
      return res.send(result);
    })
    .catch((e) => {
      console.log({ e });
      return res.send({ status: "error" });
    });
}
