import { importDb } from '../../../config/db';
import { useState, useEffect } from 'react';
import { server } from '../../../config/server';
import TextEditor from '../../../components/textEditor';
import styles from '../../../styles/adminStyles/textEditor.module.css';
import Link from 'next/link';

const AboutView = ({ about }) => {
  const [title, setTitle] = useState(about.title);
  const [aboutText, setAboutText] = useState(about.about_text);
  const [id, setId] = useState(about.id);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (update === true) {
      setTimeout(() => {
        setUpdate(false);
        window.location.href = '/admin';
      }, 3000);
    }
  }, [update]);

  async function onSave() {
    let newabout = {
      title,
      about_text: aboutText,
    };

    const response = await fetch(`/api/about/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newabout),
    });
    console.log(response);
    setUpdate(true);
  }

  return (
    <div className={styles.editPage}>
      <div className={styles.textEditorContainer}>
        <h4 className={styles.title}>Title:</h4>
        <input
          className={styles.input}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <h4 className={styles.title}>Text:</h4>

        <TextEditor
          className={styles.editorInput}
          content={aboutText}
          onUpdate={setAboutText}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => onSave(id)}>
            Spara ändringar
          </button>
          <Link className={styles.button} href="/admin">
            Tillbaka
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutView;

export const getServerSideProps = async context => {
  const db = await importDb();
  const about = await db.get('select * from about where id = ?', [
    context.params.id,
  ]);
  return { props: { about } };
};
