// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { spawn } = require("child_process");

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("python API");
  var process = spawn("python3", ["test.py"]);
  process.stdout.on("data", function (data: any) {
    console.log(data.toString());
  });

  res.status(200).json({ name: "python api" });
}
