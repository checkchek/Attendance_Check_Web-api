import Lecture from "@/models/Lecture";
import User from "@/models/User";
import dbConnect from "@/utils/db/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("test");
  await dbConnect();

  

  return res.status(200).json({});
}
