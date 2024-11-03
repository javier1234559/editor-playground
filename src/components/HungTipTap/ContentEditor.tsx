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
  Italic,
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
import { GIPHY_API_KEY } from "../../setting";
import { UseEditorOptions } from "@tiptap/react";
import { CustomBubbleMenu } from "./CustomBubbleMenu";
import { useEditorState } from "./useEditorState";

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
  Italic,
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
  const { isReady, editor, editorRef } = useEditorState();

  const customOption: UseEditorOptions = {
    onUpdate: ({ editor }) => {
      const wordCount = editor
        .getText()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
      console.log("Word count:", wordCount);
    },
  };

  return (
    <div className="editor-container">
      <RichTextEditor
        ref={editorRef}
        output="html"
        dark={isDark}
        content={content}
        onChangeContent={onChangeContent}
        extensions={extensions}
        useEditorOptions={customOption}
        // disable bubble menu and add custom one
        hideBubble
      />
      {isReady && editor && <CustomBubbleMenu editor={editor} />}
    </div>
  );
}

ContentEditor.displayName = "ContentEditor";
export default memo(ContentEditor);
