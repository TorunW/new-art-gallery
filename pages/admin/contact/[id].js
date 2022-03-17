import { importDb } from '../../../config/db';
import { useState } from 'react';
import { server } from '../../../config/server';
import Link from 'next/link';

const messageView = ({ message }) => {};

export default messageView;

export const getServerSideProps = async context => {
  const db = await importDb();
  const message = await db.get('select * from contact where id = ?', [
    context.params.id,
  ]);
  return { props: { message } };
};
