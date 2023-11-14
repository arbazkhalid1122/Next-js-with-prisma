import { useEffect } from "react";
import Login from "./login";
import { useRouter } from "next/router";

function Component() {
const router = useRouter()
  useEffect(()=>{
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
    }
  },[])
  return (
    <div>
      <Login />
    </div>
  );
}

export default Component;
