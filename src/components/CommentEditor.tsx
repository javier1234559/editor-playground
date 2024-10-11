import { memo, useState } from "react";
import RichTextEditor, {
  BaseKit,
  Bold,
  BulletList,
  Clear,
  Underline,
  Highlight,
  Mention,
  History,
  Heading,
} from "reactjs-tiptap-editor";

interface CommentEditorProps {
  onSubmit: (value: string) => void;
}

const extensions = [
  BaseKit.configure({
    // Show placeholder
    placeholder: {
      showOnlyCurrent: true,
    },
    // Character count
    characterCount: {
      limit: 800,
    },
  }),
  // Format plugins
  History,
  Bold,
  BulletList,
  Highlight,
  Underline,
  Mention,
  Heading,
  Clear,
];

function CommentEditor({ onSubmit }: CommentEditorProps) {
  const [content, onChangeContent] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(content);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-comment">
      <RichTextEditor
        dense
        output="html"
        hideBubble={true}
        content={content}
        onChangeContent={onChangeContent}
        extensions={extensions}
      />
      <button className="tiptap-submit-button" type="submit">
        Send
      </button>
    </form>
  );
}

CommentEditor.displayName = "CommentEditor";
export default memo(CommentEditor);
