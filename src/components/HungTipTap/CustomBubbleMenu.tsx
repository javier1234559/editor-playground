import { BubbleMenu } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import { useState } from "react";
import { AlertCircle, BookmarkIcon, Languages } from "lucide-react";
import { GrammarCheck, LintOption, TranslateOption } from "./OptionMenu";

interface CustomBubbleMenuProps {
  editor: Editor;
}

export const CustomBubbleMenu = ({ editor }: CustomBubbleMenuProps) => {
  const [activeOption, setActiveOption] = useState<string | null>(null);

  if (!editor) return null;

  const closeActiveOption = () => setActiveOption(null);

  const renderActiveOption = () => {
    switch (activeOption) {
      case "grammar":
        return <GrammarCheck onClose={closeActiveOption} editor={editor} />;
      case "translate":
        return <TranslateOption onClose={closeActiveOption} editor={editor} />;
      case "lint":
        return <LintOption onClose={closeActiveOption} editor={editor} />;
      default:
        return null;
    }
  };

  return (
    <BubbleMenu
      className="bubble-menu bg-blue-800 text-black shadow-lg rounded-lg border"
      editor={editor}
    >
      {activeOption ? (
        renderActiveOption()
      ) : (
        <div className="flex gap-1 p-1">
          <button
            onClick={() => setActiveOption("grammar")}
            className="p-2 hover:bg-blue-100 rounded"
            title="Grammar Check"
          >
            <AlertCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveOption("translate")}
            className="p-2 hover:bg-blue-100 rounded"
            title="Translate"
          >
            <Languages className="h-4 w-4" />
          </button>
          <button
            onClick={() => setActiveOption("lint")}
            className="p-2 hover:bg-blue-100 rounded"
            title="Save for Later"
          >
            <BookmarkIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </BubbleMenu>
  );
};
