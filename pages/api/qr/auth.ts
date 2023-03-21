import Code from "@/models/Code";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = String(req.query.code);
  const lectureId = Number(req.query.lectureId);

  const findCode = await Code.findOne({ code, lectureId });
  if (!findCode) {
    return res
      .status(200)
      .json({ result: "fail", message: "유효하지 않는 코드" });
  }

  const curTime = new Date();

  if (findCode.code === code) {
    if (curTime.getTime() - findCode.time < 5000) {
      console.log("위치 인증 완료");
      return res.status(200).json({ result: "success", message: "인증 완료" });
    } else {
      return res
        .status(200)
        .json({ result: "fail", message: "인증 유효 시간 초과" });
    }
  }

  return res
    .status(200)
    .json({ result: "fail", message: "유효하지 않는 코드" });
}
