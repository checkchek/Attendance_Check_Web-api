import Lecture, { ILecture, IAttendance } from "@/models/Lecture";

import User, { IUser } from "@/models/User";
import dbConnect from "@/utils/db/dbConnect";
import { HydratedDocument } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  // lecture 초기화 (생성)
  const lecture1: HydratedDocument<ILecture> = new Lecture({
    name: "C언어",
  });
  const lecture2: HydratedDocument<ILecture> = new Lecture({
    name: "자료구조",
  });
  const lecture3: HydratedDocument<ILecture> = new Lecture({
    name: "네트워크",
  });

  // user 초기화 (생성)
  const user1: HydratedDocument<IUser> = new User({
    name: "학생1",
    stdno: "20181111",
    id: "std1",
    pw: "std1",
    lectures: [lecture1, lecture2],
  });
  const user2: HydratedDocument<IUser> = new User({
    name: "학생2",
    stdno: "20182222",
    id: "std2",
    pw: "std2",
    lectures: [lecture2],
  });
  const user3: HydratedDocument<IUser> = new User({
    name: "학생3",
    stdno: "20183333",
    id: "std3",
    pw: "std3",
    lectures: [lecture1, lecture3],
  });

  // 수강생 초기화 (생성)
  lecture1.students = [user1, user3];
  lecture2.students = [user1, user2];
  lecture3.students = [user3];

  // 출석부 초기화 (생성)
  let attendance1: IAttendance = {};
  lecture1.students.forEach((student: HydratedDocument<IUser>) => {
    attendance1[student.stdno] = [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ];
  });
  let attendance2: IAttendance = {};
  lecture2.students.forEach((student: HydratedDocument<IUser>) => {
    attendance2[student.stdno] = [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ];
  });
  let attendance3: IAttendance = {};
  lecture3.students.forEach((student: HydratedDocument<IUser>) => {
    attendance3[student.stdno] = [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ];
  });

  lecture1.attendance = attendance1;
  lecture2.attendance = attendance2;
  lecture3.attendance = attendance3;

  await user1.save();
  await user2.save();
  await user3.save();
  await lecture1.save();
  await lecture2.save();
  await lecture3.save();

  console.log("✅ DataBase 생성 완료!");

  return res.status(200).json({});
}
