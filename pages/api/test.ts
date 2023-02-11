import Lecture from "@/models/Lecture";
import User from "@/models/User";
import dbConnect from "@/utils/db/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const lecture = await Lecture.find({ name: "C언어" });
  console.log(lecture[0].attendance);

  return res.status(200).json({});
}
