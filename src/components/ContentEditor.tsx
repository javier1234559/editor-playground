import { memo } from "react";
import RichTextEditor, {
  locale,
  BaseKit,
  Bold,
  BulletList,
  Blockquote,
  Clear,
  Heading,
  Indent,
  TextDirection,
  TextAlign,
  Highlight,
  Underline,
  History,
  Emoji,
  Link,
  ExportWord,
  ImageGif,
  SlashCommand,
} from "reactjs-tiptap-editor";

interface ContentEditorProps {
  isDark: boolean;
  content: string;
  onChangeContent: (content: string) => void;
}

const extensions = [
  BaseKit.configure({
    // Show placeholder
    placeholder: {
      showOnlyCurrent: true,
    },
    // Character count
    characterCount: {
      limit: 50_000,
    },
  }),
  // Format plugins
  Heading,
  History,
  Indent,
  Bold,
  BulletList,
  Blockquote,
  Highlight,
  Underline,
  TextDirection,
  TextAlign,
  Clear,
  // insert and feature plugins
  SlashCommand,
  Link,
  Emoji,
  ExportWord,
  ImageGif,
];

function ContentEditor({
  isDark,
  content,
  onChangeContent,
}: ContentEditorProps) {
  return (
    <RichTextEditor
      output="html"
      dark={isDark}
      content={content}
      onChangeContent={onChangeContent}
      extensions={extensions}
    />
  );
}

ContentEditor.displayName = "ContentEditor";
export default memo(ContentEditor);
