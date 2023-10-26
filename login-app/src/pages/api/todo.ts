import type { NextApiRequest, NextApiResponse } from "next";
import { todos } from "../Schema/todo";
import DbConnect from "@/pages/db/db";

export default async function Signup(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await DbConnect();

  if (req.method === "POST") {
    const { name } = req.body;
    const todo = await todos({
      name,
    });
    todo.save();
    if (todo) {
      res.status(201).json({ message: "todo created" });
    }
  } else if (req.method == "GET") {
    const get = await todos.find();
    if (get) {
      res.status(200).json(get);
    }
  }
}
