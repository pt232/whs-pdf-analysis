import { ChevronDownIcon } from "@heroicons/react/solid";
import { useState } from "react";
import TemplateList from "./TemplateList";

export default function TemplateSelector() {
  const [isListVisible, setIsListVisible] = useState(false);

  return (
    <div
      className="relative flex items-center p-2 ml-2 border border-thenex-gray-dark rounded-md cursor-pointer"
      onClick={() => setIsListVisible((preValue) => !preValue)}
    >
      <span className="-mt-2 mr-6">...</span>
      <ChevronDownIcon className={`w-4 h-4 transform ${isListVisible && "rotate-180"}`} />

      {isListVisible && <TemplateList />}
    </div>
  );
}
