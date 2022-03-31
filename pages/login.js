import styles from '../styles/Home.module.css';
import Head from 'next/head';

export default function Login() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Login</h1>
        {/* <input
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
        <hr /> */}
      </main>
    </div>
  );
}
