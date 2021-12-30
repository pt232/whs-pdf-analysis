import React from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { IDocumentFile } from "../context/file/FileProvider";
import { useClickedOutside } from "../hooks/useClickedOutside";
import FileItem from "./FileItem";
import { TemplateList } from "./TemplateList";

type FileListProps = {
  files: IDocumentFile[];
};

export default function FileList({ files }: FileListProps) {
  const listElement = React.createRef<HTMLDivElement>();
  const [isListVisible, setIsListVisible] = useClickedOutside(listElement);

  function closeList(isVisible: boolean): void {
    setIsListVisible(false);
  }

  return (
    <div className="w-full">
      <ul className="relative w-full z-10">
        {files.map((file) => {
          return <FileItem key={file.id} file={file} />;
        })}
      </ul>
      <div className="relative flex justify-center py-6 bg-gray-100">
        <p
          className="relative flex items-center text-thenex-gray text-xs cursor-pointer"
          onClick={() => setIsListVisible((preValue) => !preValue)}
        >
          Vorlage für alle
          <ChevronDownIcon className={`ml-1 w-4 h-4 transform ${isListVisible && "rotate-180"}`} />
        </p>
        {isListVisible && (
          <TemplateList ref={listElement} orientation="top" closeList={closeList} />
        )}
      </div>
    </div>
  );
}
