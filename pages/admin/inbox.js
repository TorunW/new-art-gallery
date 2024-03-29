import { importDb } from '../../config/db';
import { server } from '../../config/server';
import { useState, useEffect } from 'react';
import InboxStyles from '../../styles/Inbox.module.css';
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
    <div className={InboxStyles.inbox}>
      <h2 className={InboxStyles.title}>Inbox</h2>

      <table className={InboxStyles.table}>
        <thead className={InboxStyles.thead}>
          <tr className={InboxStyles.tr}>
            <th className={InboxStyles.thName}>Name</th>
            <th className={InboxStyles.th}>Email</th>
            <th className={InboxStyles.th}>Message</th>
            <th className={InboxStyles.th}>Sent</th>
            <th className={InboxStyles.th}>Read</th>
            <th className={InboxStyles.th}>Delete</th>
          </tr>
        </thead>
        <tbody className={InboxStyles.body}>
          {messages.map((message, index) => (
            <tr className={InboxStyles.tr} key={index} message={message}>
              <td className={InboxStyles.tdName}>
                <span className={InboxStyles.span}>{message.fullname}</span>
              </td>
              <td className={InboxStyles.td}>
                <span className={InboxStyles.span}>{message.email}</span>
              </td>
              <td className={InboxStyles.td}>
                <span className={InboxStyles.span}>{message.msg}</span>
              </td>
              <td className={InboxStyles.td}>
                <span className={InboxStyles.span}>{message.created_at}</span>
              </td>
              <td className={InboxStyles.td}>
                <a className={InboxStyles.i} onClick={() => onSubmit(message)}>
                  {message.seen === 1 ? <IoMail /> : <IoMailOpen />}
                </a>
              </td>
              <td className={InboxStyles.td}>
                <a
                  className={InboxStyles.i}
                  onClick={() => onDeleteMessage(message.id)}
                >
                  <IoTrashSharp />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={InboxStyles.buttonContainer}>
        <Link href="/admin" className={InboxStyles.button}>
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
