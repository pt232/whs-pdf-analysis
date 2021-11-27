import { ArrowRightIcon } from "@heroicons/react/solid";

export default function ConvertButton() {
  return (
    <button className="group flex justify-between items-center py-5 px-8 bg-thenex-blue text-white font-bold text-lg transition-all hover:bg-opacity-90">
      <span className="mr-8">Konvertieren</span>
      <ArrowRightIcon className="w-5 h-5 opacity-70 transition-transform transform group-hover:translate-x-1" />
    </button>
  );
}
