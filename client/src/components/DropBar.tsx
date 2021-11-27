import ConvertButton from "./ConvertButton";
import UploadButton from "./UploadButton";

export default function DropBar() {
  return (
    <div className="flex flex-col w-full md:flex-row">
      <div className="flex justify-center items-center w-full py-6 md:p-4 bg-dropzone-pattern bg-repeat md:justify-start">
        <UploadButton isFileAddedState={true} />
        <p className="ml-4 text-thenex-gray text-sm hidden md:block">oder Dateien hier ablegen</p>
      </div>
      <ConvertButton />
    </div>
  );
}
