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
  console.log("hhi");
  console.log(req.body.substr(0, 10));
  const encode = req.body;
  const decode = Buffer.from(encode, "base64");
  console.log(decode);
  fs.writeFileSync("./decode.jpg", decode);

  res.status(200).json({ name: "John Doe" });
}
