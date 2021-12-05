type TemplateItemProps = {
  text: string;
  tooltip: string;
};

export default function TemplateItem({ text, tooltip }: TemplateItemProps) {
  return (
    <li
      title={tooltip}
      className="px-4 py-2 text-thenex-gray text-sm uppercase cursor-pointer transition-colors hover:bg-thenex-gray hover:text-white"
    >
      {text}
    </li>
  );
}
