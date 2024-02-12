import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

import "./RichTextEditor.scss";
const EditorButton = ({ content, clickHandler, disabled, className }) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={clickHandler}
      disabled={disabled}
    >
      {content}
    </button>
  );
};
const TipTapMenubar = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="editor-menubar">
      <EditorButton
        content={<Bold />}
        clickHandler={() => {
          editor.chain().focus().toggleBold().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      />
      <EditorButton
        content={<Italic />}
        clickHandler={() => {
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      />
      <EditorButton
        content={<List />}
        clickHandler={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      />
      <EditorButton
        content={<ListOrdered />}
        clickHandler={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      />
    </div>
  );
};

const TiptapEditor = ({ text, updateText }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `${text}`,
    onUpdate: ({ editor }) => {
      const html = editor.getText();
      updateText(html);
    },
  });

  return (
    <div className="!mt-2 border border-gray-300 shadow rounded">
      <TipTapMenubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
