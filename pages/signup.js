import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { app } from '../firebaseConfig';
import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup() {
  const auth = getAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    let token = sessionStorage.getItem('Token');
    if (token) {
      router.push('/admin');
    }
  }, []);

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password).then(res => {
      console.log(res.user);
      sessionStorage.setItem('Token', res.user.accessToken);
      router.push('/admin');
    });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Signup</h1>
        <input
          placeholder="email"
          className={styles.inputContainer}
          onChange={e => setEmail(e.target.value)}
          value={email}
          type="email"
        />
        <input
          placeholder="password"
          className={styles.inputContainer}
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password"
        />
        <hr />
        <button className={styles.button} onClick={signUp}>
          Sign Up
        </button>
      </main>
    </div>
  );
}
