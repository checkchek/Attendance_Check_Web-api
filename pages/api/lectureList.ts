import User, { IUser } from "@/models/User";
import dbConnect from "@/utils/db/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { ILecture } from "models/Lecture";

interface ILectureList {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  days: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbConnect();
  const num = req.query.num;
  const user = await User.findOne({ num: num }).populate("lectures");

  const lecture_list: Array<ILectureList> = [];
  let userName;

  if (!user) {
    return res.status(200).json({ name: "user not found.", lecture_list });
  } else {
    userName = user.name;
    user.lectures.map((lecture: ILecture) => {
      lecture_list.push(lecture);
    });
  }

  return res.status(200).json({ name: userName, lecture_list });
}
