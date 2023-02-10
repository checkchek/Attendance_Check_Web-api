import Lecture from "@/models/Lecture";

import User from "@/models/user";
import dbConnect from "@/utils/db/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const lecture1 = new Lecture({
    name: "C언어",
  });
  const lecture2 = new Lecture({
    name: "자료구조",
  });
  const lecture3 = new Lecture({
    name: "네트워크",
  });

  const user1 = new User({
    name: "학생1",
    stdno: "20181111",
    id: "std1",
    pw: "std1",
    lectures: [lecture1, lecture2],
  });
  const user2 = new User({
    name: "학생2",
    stdno: "20182222",
    id: "std2",
    pw: "std2",
    lectures: [lecture2],
  });
  const user3 = new User({
    name: "학생3",
    stdno: "20183333",
    id: "std3",
    pw: "std3",
    lectures: [lecture1, lecture3],
  });

  lecture1.students = [user1, user3];
  lecture2.students = [user1, user2];
  lecture3.students = [user3];

  await user1.save();
  await user2.save();
  await user3.save();
  await lecture1.save();
  await lecture2.save();
  await lecture3.save();

  return res.status(200).json({});
}
