import { useState } from "react";
import CommentEditor from "./CommentEditor";
import ContentEditor from "./ContentEditor";
import PreviewContent from "./PreviewContent";
import "reactjs-tiptap-editor/style.css";
import { content as mockContent } from "../../data";

function HungTipTap() {
  const [isDark, setIsDark] = useState(false);
  const [content, setContent] = useState(mockContent);
  const [comment, setComment] = useState("");

  const onChangeContent = (value: string) => {
    setContent(value);
  };

  const onChangeComment = (value: string) => {
    setComment(value);
  };

  return (
    <>
      <div>
        <h1>Hung TipTap</h1>
        <label>
          <input
            type="checkbox"
            checked={isDark}
            onChange={(e) => setIsDark(e.target.checked)}
          />
          Dark Mode
        </label>
        <div className="container"></div>
        <h1>Reactjs-tiptap-editor</h1>
        <div className="container">
          <PreviewContent content={content} />
          <ContentEditor
            isDark={isDark}
            content={content}
            onChangeContent={onChangeContent}
          />
        </div>
        <div className="container" style={{ marginTop: "100px" }}>
          <PreviewContent content={comment} />
          <CommentEditor onSubmit={onChangeComment} />
        </div>
      </div>
    </>
  );
}

export default HungTipTap;
