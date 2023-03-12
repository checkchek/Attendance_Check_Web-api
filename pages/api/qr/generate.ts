import Code, { ICode } from "@/models/Code";
import { HydratedDocument } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = String(req.query.code);
  const time = Number(req.query.time);

  console.log(code, time);

  await Code.remove({});
  const newCode: HydratedDocument<ICode> = new Code({
    time: time,
    code,
  });
  await newCode.save();
  console.log(newCode);

  return res.status(200).json(newCode);
}
