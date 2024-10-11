import DOMPurify from "dompurify";
import { memo } from "react";

interface PreviewContentProps {
  content: string;
}

function PreviewContent({ content }: PreviewContentProps) {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div
      style={{
        border: "1px solid #e1e1e1",
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "20px",
      }}
    >
      <div
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      ></div>
    </div>
  );
}

PreviewContent.displayName = "PreviewContent";
export default memo(PreviewContent);
