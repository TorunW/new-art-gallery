import { importDb } from '../../config/db';

export default async function getSubGallery(req, res) {
  const db = await importDb();
  if (req.method === 'POST') {
    await db.run(
      'INSERT INTO subgallery(title, price, picture, size, type_of) VALUES (?,?,?,?,?)',
      req.body.title,
      req.body.price,
      req.body.picture,
      req.body.size,
      req.body.type_of
    );
    const newImage = await db.get(
      'SELECT * FROM Subgallery ORDER BY id DESC LIMIT 1'
    );
    res.json(newImage);
  } else if (req.method === 'GET') {
    const subgallerys = await db.all('select * from subgallery');
    res.json(subgallerys);
  }
}
