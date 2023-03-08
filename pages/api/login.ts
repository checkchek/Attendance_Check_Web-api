import User, { IUser } from "@/models/User";
import dbConnect from "@/utils/db/dbConnect";
import { HydratedDocument } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  console.log("login api");
  const { id, pw } = req.body;
  const user = await User.findOne({ id: id });

  if (!user) {
    return res.status(200).json({ login: "false", message: "user not found." });
  }

  if (user.pw === pw) {
    return res
      .status(200)
      .json({
        login: "success",
        message: "login success.",
        num: user.num,
        name: user.name,
      });
  } else {
    return res
      .status(200)
      .json({ login: "false", message: "user password is not matched." });
  }
}
