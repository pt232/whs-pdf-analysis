import { ChevronDownIcon } from "@heroicons/react/solid";
import FileItem from "./FileItem";

type FileListProps = {
  files: File[];
};

export default function FileList({ files }: FileListProps) {
  return (
    <div>
      <ul className="relative z-10">
        {files.map((file, index) => {
          return <FileItem key={index} file={file} />;
        })}
      </ul>
      <div className="flex justify-center py-6 bg-gray-100">
        <p className="flex items-center text-thenex-gray text-xs cursor-pointer">
          Konvertiere alle in <ChevronDownIcon className="ml-1 w-4 h-4" />
        </p>
      </div>
    </div>
  );
}
