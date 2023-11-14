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
    
    const tokens = issueTokens(user);
    return res.status(200).json({ user, ...tokens });
    }

    else if (req.method === "GET") {  
      try {
          const verify = jwt.verify(req.headers.authorization, 'access-token-secret');
          return res.status(200).json({ message: "Token verified!" });
      } catch (error) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }
  }
  
}

export function issueTokens(user:any) {
  const accessToken = jwt.sign({ user }, 'access-token-secret', { expiresIn: '2m' });
  const refreshToken = jwt.sign({ user }, 'refresh-token-secret', { expiresIn: '7d' });
  return { accessToken, refreshToken };
}
