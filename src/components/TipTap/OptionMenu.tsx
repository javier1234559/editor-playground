import { useState } from "react";
import { useCurrentEditor } from "@tiptap/react";
import {
  BookmarkIcon,
  X,
  Loader2,
  Check,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

export const GrammarCheck = ({ onClose }) => {
  const { editor } = useCurrentEditor();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  if (!editor) {
    return null;
  }

  const checkGrammar = async () => {
    setLoading(true);
    const text = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to
    );

    try {
      const response = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ text, language: "en-US" }),
      });
      const data = await response.json();
      setSuggestions(data.matches || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-[200px]">
      <div className="flex justify-between items-center p-2 border-b">
        <span className="font-medium text-sm">Grammar Check</span>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-2">
        {loading ? (
          <div className="flex items-center gap-2 justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Checking...</span>
          </div>
        ) : suggestions.length > 0 ? (
          <div className="max-h-48 overflow-y-auto">
            {suggestions.map((match, idx) => (
              <div key={idx} className="mb-2 p-2 border-b last:border-0">
                <p className="text-red-500 text-sm">{match.message}</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {match.replacements.slice(0, 3).map((replacement, i) => (
                    <button
                      key={i}
                      className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 px-2 py-1 rounded"
                      onClick={() => {
                        editor
                          .chain()
                          .focus()
                          .insertContentAt(
                            {
                              from: match.offset,
                              to: match.offset + match.length,
                            },
                            replacement.value
                          )
                          .run();
                      }}
                    >
                      {replacement.value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <button
            onClick={checkGrammar}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Check Grammar
          </button>
        )}
      </div>
    </div>
  );
};

export const TranslateOption = ({ onClose }) => {
  const { editor } = useCurrentEditor();
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState("");
  const [error, setError] = useState("");
  const [targetLang, setTargetLang] = useState("vi");

  if (!editor) {
    return null;
  }

  // Replace with your Groq API key
  const GROQ_API_KEY =
    "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";

  const translateWithGroq = async (text) => {
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: [
              {
                role: "system",
                content: `You are a translator. Translate the following English text to ${getLanguageName(
                  targetLang
                )}. Only respond with the translation, nothing else.`,
              },
              {
                role: "user",
                content: text,
              },
            ],
            temperature: 0.3, // Lower temperature for more consistent translations
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Translation failed");
      }

      const data = await response.json();
      return data.choices[0]?.message?.content?.trim() || "";
    } catch (err) {
      console.error("Groq translation error:", err);
      throw new Error(err.message || "Translation failed");
    }
  };

  // Helper function to get full language name
  const getLanguageName = (code) => {
    return supportedLanguages.find((lang) => lang.code === code)?.name || code;
  };

  const translate = async () => {
    setLoading(true);
    setError("");

    const text = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to
    );

    if (!text.trim()) {
      setError("Please select some text to translate");
      setLoading(false);
      return;
    }

    try {
      const translatedText = await translateWithGroq(text);
      setTranslation(translatedText);
    } catch (err) {
      console.error("Translation error:", err);
      setError(err.message || "Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const supportedLanguages = [
    { code: "vi", name: "Vietnamese" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "es", name: "Spanish" },
    { code: "ru", name: "Russian" },
  ];

  return (
    <div className="min-w-[300px]">
      <div className="flex justify-between items-center p-2 border-b">
        <span className="font-medium text-sm">Translate with Groq</span>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-2 space-y-2">
        <div className="space-y-2">
          <div className="text-xs text-gray-500">Target Language</div>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full p-2 border rounded text-sm bg-white"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {!GROQ_API_KEY || GROQ_API_KEY === "your-groq-api-key" ? (
          <div className="text-xs text-amber-500 bg-amber-50 p-2 rounded">
            Please set your Groq API key to use translation.
          </div>
        ) : null}

        {loading ? (
          <div className="flex items-center gap-2 justify-center py-4">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Translating...</span>
          </div>
        ) : translation ? (
          <div className="space-y-2">
            <div className="text-xs text-gray-500">Translation:</div>
            <div className="text-sm p-2 bg-gray-50 rounded border">
              {translation}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  editor.chain().focus().insertContent(translation).run();
                  onClose();
                }}
                className="flex-1 py-1.5 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm flex items-center justify-center"
              >
                Replace Text
              </button>

              <button
                onClick={() => {
                  setTranslation("");
                  setError("");
                }}
                className="p-1.5 text-gray-500 hover:text-gray-700 border rounded"
                title="Translate Again"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={translate}
            disabled={!GROQ_API_KEY || GROQ_API_KEY === "your-groq-api-key"}
            className={`w-full py-2 px-4 rounded text-sm ${
              !GROQ_API_KEY || GROQ_API_KEY === "your-groq-api-key"
                ? "bg-gray-300 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Translate Text
          </button>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm p-2 bg-red-50 rounded">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export const LintOption = ({ onClose }) => {
  const { editor } = useCurrentEditor();
  const [showBookmarkConfirm, setShowBookmarkConfirm] = useState(false);

  if (!editor) {
    return null;
  }

  const saveForLater = () => {
    const text = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to
    );
    // Save to your storage system
    console.log("Saved for later:", text);
    setShowBookmarkConfirm(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="min-w-[200px]">
      <div className="flex justify-between items-center p-2 border-b">
        <span className="font-medium text-sm">Save for Later</span>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-2">
        {showBookmarkConfirm ? (
          <div className="flex items-center gap-2 justify-center text-green-500">
            <Check className="w-4 h-4" />
            <span>Saved!</span>
          </div>
        ) : (
          <button
            onClick={saveForLater}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm flex items-center justify-center gap-2"
          >
            <BookmarkIcon className="w-4 h-4" />
            Save Selection
          </button>
        )}
      </div>
    </div>
  );
};
