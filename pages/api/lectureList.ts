import User, { IUser } from "@/models/User";
import dbConnect from "@/utils/db/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { ILecture } from "models/Lecture";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbConnect();
  console.log("lectureList");
  const stdno = req.query.stdno;
  console.log(stdno);
  const user = await User.findOne({ stdno: stdno }).populate("lectures");

  const lecture_list: Array<string> = [];
  let userName;

  if (!user) {
    return res.status(200).json({ name: "user not found.", lecture_list });
  } else {
    userName = user.name;
    user.lectures.map((lecture: ILecture) => {
      lecture_list.push(lecture.name);
    });
  }

  return res.status(200).json({ name: userName, lecture_list });
}
