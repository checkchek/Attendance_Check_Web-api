// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";
import Lecture, { ILecture } from "@/models/Lecture";
import dbConnect from "@/utils/db/dbConnect";

type Data = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  dbConnect();
  const stdno = String(req.query.stdno);
  const user = await User.findOne({ stdno: stdno }).populate("lectures");

  console.log(user);
  let resObj: any = {};
  user.lectures.map((lecture: ILecture) => {
    resObj[lecture.name] = lecture.attendance[stdno];
  });

  return res.status(200).json({ result: resObj });
}
