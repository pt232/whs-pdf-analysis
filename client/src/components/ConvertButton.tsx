import { ArrowRightIcon } from "@heroicons/react/solid";
import { IFile, useFiles } from "../context/file/FileProvider";
import { useErrorMessage } from "../context/message/ErrorMessageProvider";
import { buildFormDataFromObjects } from "../utils/buildFormData";
import { post } from "../utils/rest";

type ConvertButtonProps = {
  text: string;
};

export default function ConvertButton({ text }: ConvertButtonProps) {
  const { addedFiles } = useFiles();
  const { addMessage, removeMessage } = useErrorMessage();

  async function handleClick() {
    removeMessage();

    if (!checkForTemplates(addedFiles)) return addMessage("Nicht alle Dateien haben eine Vorlage.");

    try {
      addedFiles.forEach((f) => {
        const formData = buildFormDataFromObjects(f);
        post("upload", formData);
      });
    } catch (err) {
      addMessage("Beim Upload ist etwas schief gelaufen.");
    }
  }

  function checkForTemplates(files: IFile[]) {
    return files.every((f) => f.template !== "");
  }

  return (
    <button
      className="group flex justify-between items-center py-5 px-8 bg-thenex-blue text-white font-bold text-lg transition-all hover:bg-opacity-90"
      onClick={handleClick}
    >
      <span className="mr-8">{text}</span>
      <ArrowRightIcon className="w-5 h-5 opacity-70 transition-transform transform group-hover:translate-x-1" />
    </button>
  );
}
