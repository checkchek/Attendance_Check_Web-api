// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";
import Lecture, { ILecture } from "@/models/Lecture";
import dbConnect from "@/utils/db/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbConnect();
  const num = String(req.query.num);
  const lectureId = req.query.lectureId;

  const user = await User.findOne({ num: num }).populate("lectures");

  if (!user) {
    return res.status(200).json({ messsage: "user not found." });
  }
  let result: any = {};
  if (lectureId) {
    result = user.lectures.find((v: any) => String(v.id) === lectureId);
  } else {
    result = user.lectures;
  }

  return res.status(200).json(result);
}
