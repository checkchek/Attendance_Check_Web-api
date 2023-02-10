import dbConnect from "@/utils/db/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const stdno = String(req.query.stdno);
  return res.status(200).json({});
}
