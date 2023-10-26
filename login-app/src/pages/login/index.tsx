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

    const res = axios.post("http://localhost:3000/api/login", data);
    const response = await res;

    if (response.data) {
      localStorage.setItem("id", response.data._id);
      nav.push("./home");
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
