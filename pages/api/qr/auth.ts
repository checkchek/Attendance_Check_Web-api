import Code from "@/models/Code";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = String(req.query.code);

  const findCode = await Code.findOne({ code: code });
  if (!findCode) {
    return res.status(200).json({ result: "fail", message: "코드 불일치" });
  }
  const curTime = new Date();
  console.log(findCode);
  if (findCode.code === code) {
    console.log(curTime.getTime() - findCode.time);
    if (curTime.getTime() - findCode.time < 5000) {
      console.log("위치 인증 완료");
      return res.status(200).json({ result: "success" });
    } else {
      return res
        .status(200)
        .json({ result: "fail", message: "인증 유효 시간 초과" });
    }
  }
  return res.status(200).json({ result: "fail", message: "코드 불일치" });
}
