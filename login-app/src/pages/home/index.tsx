import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function Home() {
  const [val, setVal] = useState(null);
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem('accessToken');
    if(!token){
      router.push('/login')
    }
  })


  useEffect(() => {
    const load = async () => {
      const get = axios.get("http://localhost:3000/api/todo");
      const name = (await get).data;
      setData(name);
    };
    load();
  }, []);

  const handle = (e: any) => {
    setVal(e.target.value);
  };

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
