import { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");
import DbConnect from "@/pages/db/db";

export default async function token(req: NextApiRequest, res: NextApiResponse) {
    await DbConnect()
  if (req.method === "POST") {
    const { refreshToken } = req.body;
    jwt.verify(refreshToken, 'refresh-token-secret', (err:any, user:any) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        const accessToken = jwt.sign({ userId: user.userId }, 'refresh-token-secret', { expiresIn: '15m' });
        res.json({ accessToken });
    });
   
  }
}
