import { DocumentSearchIcon, PlusSmIcon } from "@heroicons/react/outline";
import { useRef } from "react";
import { useFiles } from "../context/file/FileProvider";
import { fileListToArray } from "../utils/listToArray";

type UploadButtonProps = {
  isFileAddedState: boolean;
  text: string;
};

export default function UploadButton({ isFileAddedState, text }: UploadButtonProps) {
  const { addFiles } = useFiles();
  const inputEl = useRef<HTMLInputElement>(null);

  function handleClick() {
    inputEl.current?.click();
  }

  function handleChange() {
    const files = inputEl.current?.files;
    if (files) addFiles(fileListToArray(files));
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`${isFileAddedState ? "btn--files" : "btn--default"}`}
      >
        {isFileAddedState ? (
          <>
            <PlusSmIcon className="h-6 w-6 text-thenex-blue" />
            <span className="inline-block ml-3 text-sm">{text}</span>
          </>
        ) : (
          <>
            <span className="inline-block mr-4 sm:mr-8">{text}</span>
            <DocumentSearchIcon className="h-6 w-6" />
          </>
        )}
      </button>
      <input
        ref={inputEl}
        onChange={handleChange}
        type="file"
        accept="application/pdf"
        multiple={true}
        className="hidden"
      />
    </>
  );
}
