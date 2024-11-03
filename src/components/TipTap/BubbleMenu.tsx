import { BubbleMenu, useCurrentEditor } from "@tiptap/react";
import { AlertCircle, BookmarkIcon, Languages } from "lucide-react";
import { GrammarCheck, LintOption, TranslateOption } from "./OptionMenu";
import { useState } from "react";

const BubbleMenuActions = () => {
  const { editor } = useCurrentEditor();
  const [activeOption, setActiveOption] = useState<string | null>(null);

  if (!editor) return null;

  const closeActiveOption = () => setActiveOption(null);

  const renderActiveOption = () => {
    switch (activeOption) {
      case "grammar":
        return <GrammarCheck onClose={closeActiveOption} />;
      case "translate":
        return <TranslateOption onClose={closeActiveOption} />;
      case "lint":
        return <LintOption onClose={closeActiveOption} />;
      default:
        return null;
    }
  };

  return (
    <BubbleMenu
      className="bubble-menu bg-white shadow-lg rounded-lg border"
      editor={editor}
    >
      {activeOption ? (
        renderActiveOption()
      ) : (
        <div className="flex gap-1 p-1">
          <button
            onClick={() => setActiveOption("grammar")}
            className="p-2 hover:bg-gray-100 rounded"
            title="Grammar Check"
          >
            <AlertCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveOption("translate")}
            className="p-2 hover:bg-gray-100 rounded"
            title="Translate"
          >
            <Languages className="h-4 w-4" />
          </button>
          <button
            onClick={() => setActiveOption("lint")}
            className="p-2 hover:bg-gray-100 rounded"
            title="Save for Later"
          >
            <BookmarkIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </BubbleMenu>
  );
};

export default BubbleMenuActions;
