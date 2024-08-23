import { subtext, title } from "@/ui/fonts";
import { FaMicrophone } from "react-icons/fa6";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const mainText = `
Hey I am your notes assistant,

These are the things I can do

- Record your meetings
- Take your notes

and much more`;
  const subText = `~~Make your chicken noodles~~`;
  return (
    <main className="flex min-h-screen flex-col justify-between items-center pt-12 pb-20 px-8">
      <h1 className={`${title.className} text-4xl`}>NotesApp</h1>
      <div className="h-[50vh] text-xl w-full lg:w-2/5">
        <Markdown remarkPlugins={[remarkGfm]}>{mainText}</Markdown>
        <Markdown
          className={`${subtext.className} inline`}
          remarkPlugins={[remarkGfm]}
        >
          {subText}
        </Markdown>
      </div>

      <button
        className={`p-4 self-center shadow-[0_0_4px_-0.8px_rgba(0,0,0,1)] dark:shadow-[0_0_4px_-0.8px_rgba(255,255,255,1)] no-dark:shadow-[inset_1.6px_1.6px_3px_-3px_rgba(256,256,256,1),1px_1px_0.2px_1px_rgba(0,0,0,1)] rounded-full`}
      >
        <FaMicrophone className="size-12" size={"64px"} />
      </button>
    </main>
  );
}