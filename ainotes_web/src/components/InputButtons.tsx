import { FaMicrophone, FaStop } from "react-icons/fa";

interface InputButtonsProps {
  toggleRecording: () => {};
  isRecording: boolean;
}

export default function InputButtons({
  toggleRecording,
  isRecording,
}: InputButtonsProps) {
  return (
    <div>
      <button
        onClick={toggleRecording}
        className={`flex items-center justify-center self-center shadow-[0_0_4px_-0.8px_rgba(0,0,0,1)] dark:shadow-[0_0_4px_-0.8px_rgba(255,255,255,1)] no-dark:shadow-[inset_1.6px_1.6px_3px_-3px_rgba(256,256,256,1),1px_1px_0.2px_1px_rgba(0,0,0,1)] rounded-full`}
        style={{ width: "64px", height: "64px" }}
      >
        {isRecording ? (
          <FaStop className="text-black" size={"38px"} />
        ) : (
          <FaMicrophone className="size-12" size={"64px"} />
        )}
      </button>
    </div>
  );
}
