// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("[REQUEST] face api");
  const encodeImg = req.body;
  const decodeImg = Buffer.from(encodeImg, "base64");
  console.log(decodeImg);
  fs.writeFileSync("./decodeImg.jpg", decodeImg);

  res.status(200).json({ name: "John Doe" });
}
