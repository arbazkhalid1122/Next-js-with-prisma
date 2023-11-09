import Link from "next/link";
import "./login.module.scss";
import styles from "./login.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const nav = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const data = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post("http://localhost:3000/api/login", data);
      if (res.data) {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        nav.push("./home");
      }                                       
    } catch (error:any) {
      if (error.response && error.response.status === 401) {
        // alert("Access token expired. Trying to refresh the token.");
        // const refreshData = {
        //   refreshToken: localStorage.getItem("refreshToken"),
        // };
        // As there is no refresh API, we will directly alert the user to login again.
        alert("Please login again.");
        nav.push("/login");
          // localStorage.setItem("accessToken", refreshRes.data.accessToken);
          // nav.push("./home");
        // } else {
        //   alert("Refresh token also expired. Please login again.");
        //   nav.push("/login");
        // }
      }
    }
  };

 

  const router = useRouter();

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.main}>
          <h1>Login</h1>
          <input type="text" placeholder="Enter Your Email" name="email" />
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
          />
          <button type="submit">Login</button>
          <Link href="/signup" className={styles.signup}>
            Create New Account
          </Link>
        </div>
      </form>
    </div>
  );
}
