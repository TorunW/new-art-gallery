import { NextApiRequest, NextApiResponse } from 'next';
import { importDb } from '../../config/db';

export default async function getAbout(
  req = NextApiRequest,
  res = NextApiResponse
) {
  const db = await importDb();
  if (req.method === 'POST') {
    await db.run(
      'INSERT INTO about(title, about_text) VALUES (?,?)',
      req.body.fullname,
      req.body.email
    );
  }
  let about = await db.all('select * from about');
  res.json(about);
  console.log(about);
}
