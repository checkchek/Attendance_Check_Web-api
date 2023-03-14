import Lecture from "@/models/Lecture";
import { NextApiRequest, NextApiResponse } from "next";

interface IData {
  attendance: number[];
  lectureId: number;
  studentId: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: IData = JSON.parse(req.body);

  const findLecture = await Lecture.findOne({ id: data.lectureId });
  findLecture.attendance[data.studentId] = data.attendance;

  await Lecture.updateOne(
    { id: data.lectureId },
    {
      $set: {
        attendance: findLecture.attendance,
      },
    }
  );

  return res.status(200).json({});
}
