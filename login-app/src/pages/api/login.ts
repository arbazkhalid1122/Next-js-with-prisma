import type { NextApiRequest, NextApiResponse } from "next";
import { NewUsers } from "../Schema/signup";
import DbConnect from "@/pages/db/db";
const bcrypt = require("bcrypt");



const isAuthenticated = (req:any) => {
    // Implement your authentication logic here.
    // For example, check if the user is authenticated based on a session or token.
    // Return true if the user is authenticated, and false if not.
    return req.session && req.session.user;
  };



export default async function login(req: NextApiRequest, res: NextApiResponse) {
  await DbConnect();
  if (req.method === "POST") {
    const {email, password} = req.body;
    console.log(email);
    
    const user = await NewUsers.findOne({ email});

console.log(req,'req');

    if(user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      
      if(isPasswordMatch) {
        res.status(200).json(user)
      } else {
        res.status(401).json({error: "Invaliad Credentials!"})
      }
    } else {
      res.status(404).json({message: "User does not exists!"})
    }
  }

}
