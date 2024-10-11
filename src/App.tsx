import { useState } from "react";

// Import CSS
import "./App.css";
import "reactjs-tiptap-editor/style.css";
import ContentEditor from "./components/ContentEditor";
import PreviewContent from "./components/PreviewContent";
import CommentEditor from "./components/CommentEditor";

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");

  const onChangeContent = (value: string) => {
    setContent(value);
  };

  const onChangeComment = (value: string) => {
    setComment(value);
  };

  return (
    <>
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
    </>
  );
};

export default App;
