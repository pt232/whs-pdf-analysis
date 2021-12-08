import { useFiles } from "../context/FileProvider";

type TemplateItemProps = {
  fileId?: string;
  text: string;
  tooltip: string;
  closeList?: (isVisible: boolean) => void;
};

export default function TemplateItem({ fileId, text, tooltip, closeList }: TemplateItemProps) {
  const { addTemplate, addTemplates } = useFiles();

  function handleClick() {
    if (fileId) addTemplate(fileId, text);
    else addTemplates(text);

    if (closeList) closeList(false);
  }

  return (
    <li
      title={tooltip}
      className="px-4 py-2 text-thenex-gray text-sm uppercase cursor-pointer transition-colors hover:bg-thenex-gray hover:text-white"
      onClick={handleClick}
    >
      {text}
    </li>
  );
}
