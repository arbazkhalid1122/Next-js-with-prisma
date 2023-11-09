import type { NextApiRequest, NextApiResponse } from "next";
import { NewUsers } from "../Schema/signup";
import DbConnect from "@/pages/db/db";
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  await DbConnect();
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = await NewUsers.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist!" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid Credentials!" });
    }

    const accessToken = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1m' });
    const refreshToken = jwt.sign({ id: user._id }, 'your-refresh-key', { expiresIn: '7d' });
    return res.status(200).json({ user, accessToken, refreshToken });
    }
}
