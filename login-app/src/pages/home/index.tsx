import axios from "axios";
import { useEffect, useState } from "react";
import { signUpWithGoogle } from "../googleAuth/auth";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth"; // Import the getAuth function

export default function Home() {
  const [val, setVal] = useState(null);
  const [data, setData] = useState([]);

  const handle = (e: any) => {
    setVal(e.target.value);
  };

  useEffect(() => {
    const load = async () => {
      const get = axios.get("http://localhost:3000/api/todo");
      const name = (await get).data;
      setData(name);
    };
    load();
  }, []);

  const router = useRouter();

  const finish = async () => {
    const data = {
      name: val,
    };
    axios.post("http://localhost:3000/api/todo", data);
  };

  return (
    <div>
      <input type="text" placeholder="Enter Name" onChange={handle} />
      <button onClick={finish}>Add Todo</button>
      <div>{data?.map((item: any) => <h1>{item?.name}</h1>)}</div>
    </div>
  );
}
