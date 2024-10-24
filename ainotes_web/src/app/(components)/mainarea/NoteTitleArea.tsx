import { titleFont } from "@/ui/fonts";
import { useEffect, useState } from "react";

interface NoteTitleAreaProps {
  updateTitle: (newTitle: string) => void;
  noteTitle: string | undefined;
}

export default function NoteTitleArea({
  updateTitle,
  noteTitle,
}: NoteTitleAreaProps) {
  const [title, setTitle] = useState(noteTitle);
  useEffect(() => {
    setTitle(noteTitle);
  }, [noteTitle]);
  return (
    <>
      <h1 className="text-4xl mb-8 text-center">
        {noteTitle ? (
          <textarea
            className="w-full bg-inherit border-none active:border-none resize-none overflow-hidden"
            onBlur={(e) => {
              if (e.target.value !== noteTitle && title) {
                updateTitle(title);
              }
            }}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        ) : (
          <span className={`${titleFont.className}`}>BrainDump</span>
        )}
      </h1>
    </>
  );
}
