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
    const { email, password, loginWith } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }
    const find = await NewUsers.findOne({ email });

    if (!find) {
      try {
        if (loginWith === true) {
          const googleUser = await NewUsers({
            email,
            loginWith,
          });
          googleUser.save();
        } else {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          const registeredUser = await NewUsers({
            email,
            password: hashedPassword,
          });
          registeredUser.save();
        }
        if (NewUsers) {
          res
            .status(201)
            .json({ success: true, message: "User created successfully" });
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
