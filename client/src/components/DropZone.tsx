import { useFiles } from "../context/FileProvider";
import UploadButton from "./UploadButton";

export default function DropZone() {
  const { addedFiles } = useFiles();

  return (
    <div className="flex flex-col justify-center items-center w-full my-10 p-16 bg-dropzone-pattern bg-repeat">
      <UploadButton isFileAddedState={addedFiles.length > 0} />
      <p className="mt-4 text-thenex-gray text-sm">oder Dateien hier ablegen</p>
    </div>
  );
}
