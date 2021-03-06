import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { IDocumentFile, useFiles } from "../context/file/FileProvider";
import { useErrorMessage } from "../context/message/ErrorMessageProvider";

type ConvertButtonProps = {
  text: string;
};

export default function ConvertButton({ text }: ConvertButtonProps) {
  const navigate = useNavigate();
  const { loading, documentFiles, uploadDocumentFiles } = useFiles();
  const { addMessage, removeMessage } = useErrorMessage();

  function handleClick() {
    if (loading) return;

    removeMessage();
    if (!checkForTemplates(documentFiles))
      return addMessage("Fehler beim Upload!", "Nicht alle Dateien haben eine Vorlage.");

    uploadDocumentFiles().then((success) => {
      if (success) navigate("/download");
      else addMessage("Fehler beim Upload!", "Beim Upload ist etwas schiefgelaufen.");
    });
  }

  function checkForTemplates(files: IDocumentFile[]) {
    return files.every((f) => f.template !== "");
  }

  return (
    <button
      className={`group flex justify-between items-center py-5 px-8 bg-thenex-blue text-white dark:text-darkmode-lighter font-bold text-lg transition-all ${
        loading ? "opacity-40 cursor-not-allowed" : "opacity-100 hover:bg-opacity-90"
      }`}
      onClick={handleClick}
    >
      <span className="mr-8">{text}</span>
      <ArrowRightIcon
        className={`w-5 h-5 opacity-70 transition-transform transform ${
          loading ? "translate-x-1" : "group-hover:translate-x-1"
        }`}
      />
    </button>
  );
}
