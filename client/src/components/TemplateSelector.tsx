import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useFiles } from "../context/file/FileProvider";
import { useClickedOutside } from "../hooks/useClickedOutside";
import { TemplateList } from "./TemplateList";

type TemplateSelectorProps = {
  fileId: string;
};

export default function TemplateSelector({ fileId }: TemplateSelectorProps) {
  const listElement = React.createRef<HTMLDivElement>();
  const { loading, documentFiles } = useFiles();
  const [isListVisible, setIsListVisible] = useClickedOutside(listElement);
  const [templateName, setTemplateName] = useState("...");

  useEffect(() => {
    const targetFile = documentFiles.find((f) => f.id === fileId);
    if (targetFile?.template) setTemplateName(targetFile.template);
  }, [documentFiles, fileId]);

  function handleClick() {
    if (loading) return;
    setIsListVisible((preValue) => !preValue);
  }

  return (
    <div
      className="relative flex items-center p-2 ml-2 border border-thenex-gray-dark rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <span className="mr-2 uppercase text-xs">{templateName}</span>
      <ChevronDownIcon className={`w-4 h-4 transform ${isListVisible && "rotate-180"}`} />

      {isListVisible && <TemplateList ref={listElement} fileId={fileId} />}
    </div>
  );
}
