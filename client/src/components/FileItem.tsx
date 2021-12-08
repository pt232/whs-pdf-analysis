import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { IFile } from "../context/FileProvider";
import Badge from "./Badge";
import RemoveButton from "./RemoveButton";
import TemplateSelector from "./TemplateSelector";

type FileItemProps = {
  file: IFile;
};

export default function FileItem({ file }: FileItemProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 grid-rows-2 md:grid-rows-1 gap-y-3 md:gap-0 items-center p-4 md:px-6 bg-white border-b last:shadow-sm last:border-0">
      <div className="flex justify-start items-center col-span-2 md:col-span-1 md:col-start-1">
        <FontAwesomeIcon icon={faFilePdf} className="text-xl text-red-500" />
        <span className="inline-block ml-3 text-thenex-gray-dark text-sm">{file.croppedName}</span>
      </div>
      <div className="flex items-center text-thenex-gray-dark col-start-3 row-start-2 md:col-start-2 md:row-start-1 justify-self-end">
        <span className="text-thenex-gray text-sm">als</span>
        <TemplateSelector fileId={file.id} />
      </div>
      <Badge text="Fertig" loading={false} />
      <div className="-ml-8 md:ml-0 md:justify-self-center text-thenex-gray text-sm">
        {file.calculatedSize}
      </div>
      <RemoveButton fileId={file.id} />
    </div>
  );
}
