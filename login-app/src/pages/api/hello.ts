import type { NextApiRequest, NextApiResponse } from 'next'
import { NewUsers } from '../Schema/login';
import DbConnect from '@/pages/db/db'



export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await DbConnect()
  if (req.method === 'GET') {
    console.log(req.body);
    
  }
   else if (req.method === 'POST') {
      const data = req.body;
      console.log(req.body);
      NewUsers(data)
   }
}
