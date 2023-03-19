// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";
import Lecture, { IAttendance, ILecture } from "@/models/Lecture";
import dbConnect from "@/utils/db/dbConnect";
import Code, { ICode } from "@/models/Code";

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
  const lectureId = Number(req.query.lectureId);
  const week = Number(req.query.week) - 1;
  const qrcode = String(req.query.qrcode);

  const lecture = await Lecture.findOne({ id: lectureId });
  const code: ICode | null = await Code.findOne({
    code: qrcode,
    lectureId,
  });

  if (!lecture) {
    return res.status(200).json({ num: num, result: "lecture error" });
  }
  if (!code) {
    return res.status(200).json({ num: num, result: "code error" });
  }

  const now = new Date().getTime();
  const attendance_list = { ...lecture.attendance };
  const attendance_copy = [...attendance_list[num]];
  if (now - code.time < 5000) {
    attendance_copy[week] = 0;
  } else if (now - code.time < 1000 * 60 * 10) {
    return res.status(200).json({ num: num, result: "QR code 유효시간 초과" });
  }
  attendance_list[num] = attendance_copy;
  lecture.attendance = attendance_list;
  await lecture.save();

  return res.status(200).json({ num: num, result: "success" });
}
