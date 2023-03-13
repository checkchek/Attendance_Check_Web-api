import Lecture, { ILecture } from "@/models/Lecture";
import { HydratedDocument } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lectureName = req.query.lecture;
  const findLecture: HydratedDocument<ILecture> | null = await Lecture.findOne({
    name: lectureName,
  });
  if (!findLecture) return res.status(200).json({ result: "none" });

  return res.status(200).json(findLecture.attendance);
}
