import { DocumentSearchIcon } from "@heroicons/react/outline";

export default function UploadButton() {
  return (
    <button className="flex items-center bg-thenex-blue text-white px-10 py-4 rounded shadow-lg transform transition-transform hover:scale-105">
      <span className="inline-block mr-8">Dateien wählen</span>
      <DocumentSearchIcon className="h-7 w-7" />
    </button>
  );
}
