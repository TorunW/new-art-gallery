import { NextApiRequest, NextApiResponse } from 'next';
import { importDb } from '../../../config/db';

export default async function getMessageById(
  req = NextApiRequest,
  res = NextApiResponse
) {
  const db = await importDb();

  if (req.method === 'PUT') {
    await db.run(
      `update contact set fullname = ?, email = ?, msg = ?, created_at = ?, seen = ? where id = ?`,
      req.body.fullname,
      req.body.email,
      req.body.msg,
      req.body.created_at,
      req.body.seen,
      req.query.id
    );
  }

  if (req.method === 'DELETE') {
    await db.run('delete from contact where id = ?', req.query.id);
  }

  let contact = await db.all('select * from contact where id = ?', [
    req.query.id,
  ]);
  res.json(contact);
}
