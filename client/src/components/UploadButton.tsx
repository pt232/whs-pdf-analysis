import { DocumentSearchIcon } from "@heroicons/react/outline";
import { useRef } from "react";
import { useFiles } from "../context/FileProvider";
import { fileListToArray } from "../utils/listToArray";

export default function UploadButton() {
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
        className="flex items-center bg-thenex-blue text-white px-10 py-4 rounded shadow-lg transform transition-transform hover:scale-105"
      >
        <span className="inline-block mr-8">Dateien wählen</span>
        <DocumentSearchIcon className="h-7 w-7" />
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
