import Link from 'next/link';
import './login.module.scss';
import styles from './login.module.scss';

export default function Login() {
  const handleSubmit = (event:any) => {
    event.preventDefault();
    
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log('Email:', email);
    console.log('Password:', password);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.main}>
          <h1>Login</h1>
          <input type="text" placeholder='Enter Your Email' name='email' />
          <input type="password" placeholder='Enter Your Password' name='password' />
          <button type='submit'>Login</button>
          <Link href="/signup" className={styles.signup}>Create New Account</Link>
        </div>
      </form>
    </div>
  );
}
