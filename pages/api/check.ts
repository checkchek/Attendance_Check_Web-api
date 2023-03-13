// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";
import Lecture, { IAttendance, ILecture } from "@/models/Lecture";
import dbConnect from "@/utils/db/dbConnect";

/*
  출석 부 DB 수정
*/

type Data = {
  num: string;
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  dbConnect();
  const num = String(req.query.num);
  const lectureName = String(req.query.lecture);
  const week = Number(req.query.week);
  const lecture = await Lecture.findOne({ name: lectureName });

  if (!lecture) return res.status(200).json({ num: num, result: "error" });
  const attendance_list = { ...lecture.attendance };
  const attendance_copy = [...attendance_list[num]];
  attendance_copy[week] = 0;
  attendance_list[num] = attendance_copy;
  lecture.attendance = attendance_list;

  await lecture.save();

  return res.status(200).json({ num: num, result: "success" });
}
