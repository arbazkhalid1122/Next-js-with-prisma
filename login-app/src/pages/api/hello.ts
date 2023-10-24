import type { NextApiRequest, NextApiResponse } from 'next'
// const NewUsers = require('../Schema/login')
// import NewUser from "..Schema/login"<
import { NewUsers } from '../Schema/login'
import DbConnect from '@/pages/db/db'



export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await DbConnect()
  if (req.method === 'GET') {
    const data = req.body
    console.log(data);
    res.json(data)
    
  }
   else if (req.method === 'POST') {
      const {email, password} = req.body;
      try {
        // NewUsers(data)
        const registeredUser = await NewUsers({
          email,
          password
        })

        registeredUser.save()

        if(NewUsers) {
          res.status(201).json({success: true,message:'User created successfully'})
        } else  {
          
        }
      } catch (error) {
        console.log(error);
      }
   }
}

