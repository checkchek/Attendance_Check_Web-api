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

  await User.remove({});
  await Lecture.remove({});

  // lecture 초기화 (생성)
  const lecture1: HydratedDocument<ILecture> = new Lecture({
    id: 1,
    name: "C언어",
    days: ["mon"],
    startTime: "09:00",
    endTime: "12:00",
  });
  const lecture2: HydratedDocument<ILecture> = new Lecture({
    id: 2,
    name: "자료구조",
    days: ["tue", "thu"],
    startTime: "15:00",
    endTime: "16:00",
  });
  const lecture3: HydratedDocument<ILecture> = new Lecture({
    id: 3,
    name: "네트워크",
    days: ["wed", "fri"],
    startTime: "09:00",
    endTime: "10:30",
  });

  // user 초기화 (생성)
  // 학생
  const user1: HydratedDocument<IUser> = new User({
    name: "학생1",
    std: true,
    num: "20181111",
    id: "std1",
    pw: "std1",
    lectures: [lecture1, lecture2],
  });
  const user2: HydratedDocument<IUser> = new User({
    name: "학생2",
    std: true,
    num: "20182222",
    id: "std2",
    pw: "std2",
    lectures: [lecture2],
  });
  const user3: HydratedDocument<IUser> = new User({
    name: "학생3",
    std: true,
    num: "20183333",
    id: "std3",
    pw: "std3",
    lectures: [lecture2, lecture3],
  });
  const user4: HydratedDocument<IUser> = new User({
    name: "학생4",
    std: true,
    num: "20180004",
    id: "std4",
    pw: "std4",
    lectures: [lecture2, lecture3],
  });
  const user5: HydratedDocument<IUser> = new User({
    name: "학생5",
    std: true,
    num: "20180005",
    id: "std5",
    pw: "std5",
    lectures: [lecture2, lecture3],
  });
  const user6: HydratedDocument<IUser> = new User({
    name: "학생6",
    std: true,
    num: "20180006",
    id: "std6",
    pw: "std6",
    lectures: [lecture2, lecture3],
  });
  const user7: HydratedDocument<IUser> = new User({
    name: "학생7",
    std: true,
    num: "20180007",
    id: "std7",
    pw: "std7",
    lectures: [lecture2, lecture3],
  });
  const user8: HydratedDocument<IUser> = new User({
    name: "학생8",
    std: true,
    num: "20180008",
    id: "std8",
    pw: "std8",
    lectures: [lecture2, lecture3],
  });
  const user9: HydratedDocument<IUser> = new User({
    name: "학생9",
    std: true,
    num: "20180009",
    id: "std9",
    pw: "std9",
    lectures: [lecture2, lecture3],
  });
  const user10: HydratedDocument<IUser> = new User({
    name: "학생10",
    std: true,
    num: "20180010",
    id: "std10",
    pw: "std10",
    lectures: [lecture2, lecture3],
  });
  const user11: HydratedDocument<IUser> = new User({
    name: "학생11",
    std: true,
    num: "20180011",
    id: "std11",
    pw: "std11",
    lectures: [lecture2, lecture3],
  });
  const user12: HydratedDocument<IUser> = new User({
    name: "학생12",
    std: true,
    num: "20180012",
    id: "std12",
    pw: "std12",
    lectures: [lecture2, lecture3],
  });
  const user13: HydratedDocument<IUser> = new User({
    name: "학생13",
    std: true,
    num: "20180013",
    id: "std13",
    pw: "std13",
    lectures: [lecture2, lecture3],
  });
  const user14: HydratedDocument<IUser> = new User({
    name: "학생14",
    std: true,
    num: "20180014",
    id: "std14",
    pw: "std14",
    lectures: [lecture2, lecture3],
  });
  const user15: HydratedDocument<IUser> = new User({
    name: "학생15",
    std: true,
    num: "20180015",
    id: "std15",
    pw: "std15",
    lectures: [lecture2, lecture3],
  });
  const user16: HydratedDocument<IUser> = new User({
    name: "학생16",
    std: true,
    num: "20180016",
    id: "std16",
    pw: "std16",
    lectures: [lecture2, lecture3],
  });
  const user17: HydratedDocument<IUser> = new User({
    name: "학생17",
    std: true,
    num: "20180017",
    id: "std17",
    pw: "std17",
    lectures: [lecture2, lecture3],
  });
  const user18: HydratedDocument<IUser> = new User({
    name: "학생18",
    std: true,
    num: "20180018",
    id: "std18",
    pw: "std18",
    lectures: [lecture2, lecture3],
  });
  const user19: HydratedDocument<IUser> = new User({
    name: "학생19",
    std: true,
    num: "20180019",
    id: "std19",
    pw: "std19",
    lectures: [lecture2, lecture3],
  });
  const user20: HydratedDocument<IUser> = new User({
    name: "학생20",
    std: true,
    num: "20180020",
    id: "std20",
    pw: "std20",
    lectures: [lecture2, lecture3],
  });

  // 교수
  const prof1: HydratedDocument<IUser> = new User({
    name: "교수1",
    std: false,
    num: "1111",
    id: "prof1",
    pw: "prof1",
    lectures: [lecture1],
  });
  const prof2: HydratedDocument<IUser> = new User({
    name: "교수2",
    std: false,
    num: "2222",
    id: "prof2",
    pw: "prof2",
    lectures: [lecture2, lecture3],
  });

  // 수강생 초기화 (생성)
  lecture1.students = [user1, user3];
  lecture2.students = [
    user1,
    user2,
    user4,
    user5,
    user6,
    user7,
    user8,
    user9,
    user10,
    user11,
    user12,
    user13,
    user14,
    user15,
    user16,
    user17,
    user18,
    user19,
    user20,
  ];
  lecture3.students = [
    user3,
    user4,
    user5,
    user6,
    user7,
    user8,
    user9,
    user10,
    user11,
    user12,
    user13,
    user14,
    user15,
    user16,
    user17,
    user18,
    user19,
    user20,
  ];

  // 출석부 초기화 (생성)
  let attendance1: IAttendance = {};
  lecture1.students.forEach((student: HydratedDocument<IUser>) => {
    attendance1[student.num] = [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ];
  });
  let attendance2: IAttendance = {};
  lecture2.students.forEach((student: HydratedDocument<IUser>) => {
    attendance2[student.num] = [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ];
  });
  let attendance3: IAttendance = {};
  lecture3.students.forEach((student: HydratedDocument<IUser>) => {
    attendance3[student.num] = [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ];
  });

  lecture1.attendance = attendance1;
  lecture2.attendance = attendance2;
  lecture3.attendance = attendance3;

  await user1.save();
  await user2.save();
  await user3.save();
  await user4.save();
  await user5.save();
  await user6.save();
  await user7.save();
  await user8.save();
  await user9.save();
  await user10.save();
  await user11.save();
  await user12.save();
  await user13.save();
  await user14.save();
  await user15.save();
  await user16.save();
  await user17.save();
  await user18.save();
  await user19.save();
  await user20.save();
  await prof1.save();
  await prof2.save();
  await lecture1.save();
  await lecture2.save();
  await lecture3.save();

  console.log("✅ DataBase 생성 완료!");

  return res.status(200).json({});
}
