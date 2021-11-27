import { DocumentSearchIcon, PlusSmIcon } from "@heroicons/react/outline";
import { useRef } from "react";
import { useFiles } from "../context/FileProvider";
import { fileListToArray } from "../utils/listToArray";

type UploadButtonProps = {
  isFileAddedState: boolean;
};

export default function UploadButton({ isFileAddedState }: UploadButtonProps) {
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
            <span className="inline-block ml-3 text-sm">Füge mehr Dateien hinzu</span>
          </>
        ) : (
          <>
            <span className="inline-block mr-8">Dateien wählen</span>
            <DocumentSearchIcon className="h-7 w-7" />
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
