import TemplateItem from "./TemplateItem";

export default function TemplateList() {
  return (
    <ul className="absolute w-60 bg-thenex-gray-dark rounded-md overflow-hidden shadow-lg">
      <TemplateItem text="Swcc" tooltip="Saline Water Conversion Corporation" />
      <TemplateItem text="Tgu" tooltip="Trinidad Generation Unlimited" />
      <TemplateItem text="Proman" tooltip="Proman" />
      <TemplateItem text="Sabic" tooltip="Saudi Basic Industries Corporation" />
      <TemplateItem text="Sadara" tooltip="Sadara Chemical Company" />
    </ul>
  );
}
