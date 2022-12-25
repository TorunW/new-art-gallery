import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import { styles } from '../styles/textEditor.module.css';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        style={{
          borderStyle: 'solid',
          borderColor: 'grey',
          color: 'white',
          margin: '5px',
          background: 'black',
          borderRadius: '3px',
        }}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
        style={{
          borderStyle: 'solid',
          borderColor: 'grey',
          color: 'white',
          margin: '5px',
          background: 'black',
          borderRadius: '3px',
        }}
      >
        italic
      </button>

      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
        style={{
          borderStyle: 'solid',
          borderColor: 'grey',
          color: 'white',
          margin: '5px',
          background: 'black',
          borderRadius: '3px',
        }}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        style={{
          borderStyle: 'solid',
          borderColor: 'grey',
          color: 'white',
          margin: '5px',
          background: 'black',
          borderRadius: '3px',
        }}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        style={{
          borderStyle: 'solid',
          borderColor: 'grey',
          color: 'white',
          margin: '5px',
          background: 'black',
          borderRadius: '3px',
        }}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        style={{
          borderStyle: 'solid',
          borderColor: 'grey',
          color: 'white',
          margin: '5px',
          background: 'black',
          borderRadius: '3px',
        }}
      >
        h3
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
        style={{
          borderStyle: 'solid',
          borderColor: 'grey',
          color: 'white',
          margin: '5px',
          background: 'black',
          borderRadius: '3px',
        }}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
        style={{
          borderStyle: 'solid',
          borderColor: 'grey',
          color: 'white',
          margin: '5px',
          background: 'black',
          borderRadius: '3px',
        }}
      >
        ordered list
      </button>
    </>
  );
};

export default function Editor(props) {
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
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
