import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  JSONContent,
} from "novel";
import { useState } from "react";
import { defaultExtensions } from "./extension";
import { NodeSelector } from "./node-selector";
import { TextButtons } from "./text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";
import { handleCommandNavigation } from "novel/extensions";
import { Separator } from "../ui/separator";

const extensions = [...defaultExtensions, slashCommand];

const NovelEditor = () => {
  const [content, setContent] = useState<JSONContent | undefined>({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Hello, world!",
          },
        ],
      },
    ],
  });
  const [openNode, setOpenNode] = useState(false);

  return (
    <EditorRoot>
      <EditorContent
        extensions={extensions}
        initialContent={content}
        onUpdate={({ editor }) => {
          const json = editor.getJSON();
          setContent(json);
        }}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full border-1 border-gray-200 dark:border-gray-800`,
          },
        }}
      >
        <EditorBubble
          tippyOptions={{
            placement: "top",
          }}
          className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
        >
          <Separator orientation="vertical" />
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation="vertical" />
          <TextButtons />
          <Separator orientation="vertical" />
        </EditorBubble>

        {/* command */}
        <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>
      </EditorContent>
    </EditorRoot>
  );
};
export default NovelEditor;
