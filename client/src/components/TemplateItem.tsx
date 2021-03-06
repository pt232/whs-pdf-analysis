import { useFiles } from "../context/file/FileProvider";

type TemplateItemProps = {
  fileId?: string;
  text: string;
  tooltip: string;
  closeList?: (isVisible: boolean) => void;
};

export default function TemplateItem({ fileId, text, tooltip, closeList }: TemplateItemProps) {
  const { addTemplate, addTemplates } = useFiles();

  function handleClick() {
    if (text === "Swcc") return;

    if (fileId) addTemplate(fileId, text);
    else addTemplates(text);

    if (closeList) closeList(false);
  }

  return (
    <li
      title={tooltip}
      className={`px-4 py-2 text-thenex-gray dark:text-darkmode-lighter text-sm uppercase cursor-pointer transition-colors hover:bg-thenex-gray hover:text-white ${
        text === "Swcc" ? "cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
    >
      {text}
    </li>
  );
}
