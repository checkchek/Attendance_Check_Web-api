import { csCheckList } from "@/db";

import User from "@/models/user";
import dbConnect from "@/utils/db/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  return res.status(200).json({});
}
