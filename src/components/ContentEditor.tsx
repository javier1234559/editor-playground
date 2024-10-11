import { memo } from "react";
import RichTextEditor, {
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
  // ImportWord,
  // HorizontalRule,
} from "reactjs-tiptap-editor";
import { GIPHY_API_KEY } from "../config";

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
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Clear,
  // insert and feature plugins
  // ImportWord,
  SlashCommand,
  Link,
  Emoji,
  ExportWord,
  // HorizontalRule,
  ImageGif.configure({
    // Giphy API key
    GIPHY_API_KEY: GIPHY_API_KEY,
  }),
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
