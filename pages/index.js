import Header from '../components/Header';
import Contact from '../components/Contact';
import { server } from '../config/server';
import { importDb } from '../config/db';
import { useState } from 'react';
import Card from '../components/Card';

export default function Home({ about, contact, initMessages }) {
  const [messages, setMessages] = useState(initMessages);

  async function onSubmitNewMessage(newMessage) {
    const response = await fetch(`${server}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    });
    const newMessages = await response.json();
    setMessages(newMessages);
  }

  return (
    <>
      <Header />
      <Card />
      <Contact contact={contact} about={about} onSubmit={onSubmitNewMessage} />
    </>
  );
}

export const getStaticProps = async () => {
  const db = await importDb();
  const about = await db.all('select * from about');
  const contact = await db.all('select * from contact');
  return { props: { about, initMessages: contact } };
};
