// 'use client'
import Link from "next/link";
import styles from "../login/login.module.scss";
import axios from "axios";
import { useRouter } from "next/router";

export default function Signup() {
  const nav = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const res = axios.post("http://localhost:3000/api/Signup", data);
      const result = (await res).data;
      if (result.reg) {
        nav.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.main}>
          <h1>Signup</h1>
          <input type="text" placeholder="Enter username" name="username" />
          <input type="text" placeholder="Enter Your Email" name="email" />
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
          />
          <input
            type="password"
            placeholder="Re Enter Password"
            name="confirm"
          />
          <button type="submit">Signup</button>
          <Link href="/login" className={styles.signup}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
