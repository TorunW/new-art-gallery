import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: { bodyParser: false },
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.file);
    const pathname = `uploads/${files.file.originalFilename}`;
    return res.status(201).send({ pathname });
  });
};

const saveFile = async file => {
  console.log(file, 'file');
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/uploads/${file.originalFilename}`, data);
  await fs.unlinkSync(file.filepath);
  return;
};

export default (req, res) => {
  req.method === 'POST'
    ? post(req, res)
    : req.method === 'PUT'
    ? console.log('PUT')
    : req.method === 'DELETE'
    ? console.log('DELETE')
    : req.method == 'GET'
    ? console.log('GET')
    : res.status(404).send('');
};
