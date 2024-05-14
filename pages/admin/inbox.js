import { importDb } from '../../config/db';
import { server } from '../../config/server';
import { useState, useEffect } from 'react';
import styles from '../../styles/Inbox.module.css';
import { IoMail, IoMailOpen, IoTrashSharp } from 'react-icons/io5';
import Link from 'next/link';

const Inbox = ({ initMessages }) => {
  const [messages, setMessages] = useState(initMessages);

  useEffect(() => {
    let token = sessionStorage.getItem('Token');
    // push back to login if token doesnt exist, this should be in the admin index
    if (!token) {
      // should push to admin in real life project
      router.push('/signup');
    }
  }, []);

  async function onSubmit(message) {
    message.seen = message.seen === 1 ? 0 : 1;

    const response = await fetch(`${server}/api/message/${message.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    await response.json();
    getMessages();
  }

  async function getMessages() {
    const response = await fetch(`${server}/api/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newMessages = await response.json();
    setMessages(newMessages);
  }

  async function onDeleteMessage(id) {
    await fetch(`${server}/api/message/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    getMessages();
  }

  return (
    <div className={styles.inbox}>
      <h2 className={styles.title}>Inbox</h2>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.thName}>Name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Message</th>
            <th className={styles.th}>Sent</th>
            <th className={styles.th}>Read</th>
            <th className={styles.th}>Delete</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {messages.map((message, index) => (
            <tr className={styles.tr} key={index} message={message}>
              <td className={styles.tdName}>
                <span className={styles.span}>{message.fullname}</span>
              </td>
              <td className={styles.td}>
                <span className={styles.span}>{message.email}</span>
              </td>
              <td className={styles.td}>
                <span className={styles.span}>{message.msg}</span>
              </td>
              <td className={styles.td}>
                <span className={styles.span}>{message.created_at}</span>
              </td>
              <td className={styles.td}>
                <a className={styles.i} onClick={() => onSubmit(message)}>
                  {message.seen === 1 ? <IoMail /> : <IoMailOpen />}
                </a>
              </td>
              <td className={styles.td}>
                <a
                  className={styles.i}
                  onClick={() => onDeleteMessage(message.id)}
                >
                  <IoTrashSharp />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.buttonContainer}>
        <Link href="/admin" className={styles.button}>
          Back to admin panel
        </Link>
      </div>
    </div>
  );
};

export default Inbox;

export const getStaticProps = async () => {
  const db = await importDb();
  const messages = await db.all('select * from contact');

  return {
    props: { initMessages: messages },
  };
};
