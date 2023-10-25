import { useEffect } from "react";
import { useRouter } from "next/router";
import Home from "./pages/home";
import Login from "./pages/login";

function Component() {
    const router = useRouter();

    useEffect(() => {
        const get = localStorage.getItem("id");
        if (get) {
            router.push('/home');
        }
        console.log(get);
        
    }, []);

    return (
        <div>
            {
             <Login />
            }
        </div>
    );
}

export default Component;
