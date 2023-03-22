import Lecture from "@/models/Lecture";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lectureId = Number(req.query.lectureId);
  const findLecture = await Lecture.findOne({
    id: lectureId,
  }).populate("students");

  if (!findLecture) return res.status(200).json({ result: "none" });

  return res.status(200).json({
    attendance: findLecture.attendance,
    students: findLecture.students,
  });
}
