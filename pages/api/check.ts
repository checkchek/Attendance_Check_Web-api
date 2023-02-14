// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";
import Lecture, { IAttendance, ILecture } from "@/models/Lecture";
import dbConnect from "@/utils/db/dbConnect";

type Data = {
  stdno: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  dbConnect();
  const stdno = String(req.query.stdno);
  const lectureName = String(req.query.lecture);
  const week = Number(req.query.week);
  console.log(stdno, lectureName);

  // const today = new Date();
  // const year = today.getFullYear();
  // const month = ("0" + (today.getMonth() + 1)).slice(-2);
  // const day = ("0" + today.getDate()).slice(-2);
  // const hours = ("0" + today.getHours()).slice(-2);
  // const minutes = ("0" + today.getMinutes()).slice(-2);
  // const seconds = ("0" + today.getSeconds()).slice(-2);
  // const timeString = hours + ":" + minutes + ":" + seconds;
  // const dateString = year + "-" + month + "-" + day;

  const lecture = await Lecture.findOne({ name: lectureName });
  if (!lecture) return res.status(200).json({ stdno: stdno });
  const attendance_list = { ...lecture.attendance };
  const attendance_copy = [...attendance_list[stdno]];
  attendance_copy[week] = 0;
  attendance_list[stdno] = attendance_copy;
  lecture.attendance = attendance_list;

  console.log(lecture);
  await lecture.save();

  return res.status(200).json({ stdno: stdno });
}
