import CircleButton from "@/components/buttons/CircleButton";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { IoSparklesSharp } from "react-icons/io5";

interface InputButtonsProps {
  toggleNoteRecording: () => {};
  toggleQueryRecording: () => {};
  isRecordingNote: boolean;
  isRecordingQuery: boolean;
}

export default function InputButtons({
  toggleNoteRecording,
  toggleQueryRecording,
  isRecordingNote,
  isRecordingQuery,
}: InputButtonsProps) {
  return (
    <div className="flex w-full justify-center gap-10">
      <CircleButton onClick={toggleNoteRecording} disabled={isRecordingQuery}>
        {isRecordingNote ? (
          <FaStop className="text-black" size={"38px"} />
        ) : (
          <FaMicrophone className="size-12" size={"64px"} />
        )}
      </CircleButton>
      <CircleButton onClick={toggleQueryRecording} disabled={isRecordingNote}>
        {isRecordingQuery ? (
          <FaStop className="text-black" size={"38px"} />
        ) : (
          <IoSparklesSharp className="size-12" size={"64px"} />
        )}
      </CircleButton>
    </div>
  );
}