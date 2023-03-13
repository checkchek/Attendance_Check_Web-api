import Code, { ICode } from "@/models/Code";
import { HydratedDocument } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = String(req.query.code);
  const time = Number(req.query.time);
  const lectureId = Number(req.query.lectureId);

  if (!(lectureId && code && time)) {
    return res.status(200).json({ message: "fail" });
  }

  await Code.remove({ lectureId });
  const newCode: HydratedDocument<ICode> = new Code({
    lectureId,
    time,
    code,
  });
  await newCode.save();
  console.log(newCode);

  return res.status(200).json(newCode);
}
