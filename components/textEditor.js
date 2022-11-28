import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styles from '../styles/textEditor.module.css';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className={styles.menuContainer}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? styles.isActive : styles.notActive}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive('italic') ? styles.isActive : styles.notActive
        }
      >
        italic
      </button>

      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive('paragraph') ? styles.isActive : styles.notActive
        }
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive('heading', { level: 1 })
            ? styles.isActive
            : styles.notActive
        }
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive('heading', { level: 2 })
            ? styles.isActive
            : styles.notActive
        }
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive('heading', { level: 3 })
            ? styles.isActive
            : styles.notActive
        }
      >
        h3
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive('bulletList') ? styles.isActive : styles.notActive
        }
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive('orderedList') ? styles.isActive : styles.notActive
        }
      >
        ordered list
      </button>
    </div>
  );
};

export default props => {
  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log(html);
      props.onUpdate(html);
      // send the content to an API here
    },
    content: props.content,
  });

  return (
    <div className={styles.editorContainer}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className={styles.editor} />
    </div>
  );
};
