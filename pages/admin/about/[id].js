import { importDb } from '../../../config/db';
import { useState, useEffect } from 'react';
import { server } from '../../../config/server';
import TextEditor from '../../../components/textEditor';
import textEditorStyles from '../../../styles/textEditor.module.css';

const aboutView = ({ about }) => {
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

    setUpdate(true);
  }

  return (
    <div>
      <div className={textEditorStyles.editAbout}>
        <div className={textEditorStyles.title}>Title</div>
        <input
          className={textEditorStyles.input}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <TextEditor content={aboutText} onUpdate={setAboutText} />
        <div className={textEditorStyles.buttonContainer}>
          <button
            className={textEditorStyles.button}
            onClick={() => onSave(id)}
          >
            Save Changes
          </button>
          <a className={textEditorStyles.button} href="/admin">
            Back to admin panel
          </a>
        </div>
      </div>
    </div>
  );
};

export default aboutView;

export const getServerSideProps = async context => {
  const db = await importDb();
  const about = await db.get('select * from about where id = ?', [
    context.params.id,
  ]);
  return { props: { about } };
};
