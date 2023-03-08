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
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  dbConnect();
  const num = String(req.query.num);
  const lectureName = String(req.query.lecture);
  const week = Number(req.query.week);
  console.log("check", num, lectureName);

  const lecture = await Lecture.findOne({ name: lectureName });
  if (!lecture) return res.status(200).json({ num: num });
  const attendance_list = { ...lecture.attendance };
  const attendance_copy = [...attendance_list[num]];
  attendance_copy[week] = 0;
  attendance_list[num] = attendance_copy;
  lecture.attendance = attendance_list;

  console.log(lecture);
  await lecture.save();

  return res.status(200).json({ num: num });
}

// const today = new Date();
// const year = today.getFullYear();
// const month = ("0" + (today.getMonth() + 1)).slice(-2);
// const day = ("0" + today.getDate()).slice(-2);
// const hours = ("0" + today.getHours()).slice(-2);
// const minutes = ("0" + today.getMinutes()).slice(-2);
// const seconds = ("0" + today.getSeconds()).slice(-2);
// const timeString = hours + ":" + minutes + ":" + seconds;
// const dateString = year + "-" + month + "-" + day;
