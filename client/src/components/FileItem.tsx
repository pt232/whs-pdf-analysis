import { DocumentIcon } from "@heroicons/react/outline";

type FileItemProps = {
  file: File;
};

export default function FileItem({ file }: FileItemProps) {
  return (
    <div className="py-4 px-6 bg-white border-b last:shadow-sm last:border-0">
      <div className="flex items-center">
        <DocumentIcon className="w-6 h-6 text-thenex-blue" />
        <span className="inline-block ml-2 text-gray-700 text-sm">{file.name}</span>
      </div>
    </div>
  );
}
