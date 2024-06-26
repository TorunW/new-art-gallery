import { useRouter } from 'next/router';
import { app } from '../firebaseConfig';
import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from '../styles/Login.module.css';

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
    createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        console.log(res.user);
        sessionStorage.setItem('Token', res.user.accessToken);
        router.push('/admin');
      })
      .catch(err => {
        alert('email already exists');
      });
  };

  return (
    <signup className={styles.loginForm}>
      <div>
        <input
          placeholder="email"
          className={styles.inputContainer}
          onChange={e => setEmail(e.target.value)}
          value={email}
          type="email"
        />
        <br />
        <input
          placeholder="lösenord"
          className={styles.inputContainer}
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password"
        />
        <br />
        <button className={styles.button} onClick={signUp}>
          Registera användare
        </button>
      </div>
    </signup>
  );
}
