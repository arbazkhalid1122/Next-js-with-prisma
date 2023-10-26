import type { NextApiRequest, NextApiResponse } from "next";
import { NewUsers } from "../Schema/signup";
import DbConnect from "@/pages/db/db";
const bcrypt = require("bcrypt");

export default async function Signup(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await DbConnect();

  if (req.method === "POST") {
    const { email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const find = await NewUsers.findOne({ email });

    if (!find) {
      try {
        const registeredUser = await NewUsers({
          email,
          password: hashedPassword,
        });
        registeredUser.save();

        if (NewUsers) {
          res
            .status(201)
            .json({ success: true, message: "User created successfully" });
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return res
        .status(409)
        .json({ error: "User with this email already exists!" });
    }
  }
}
