import UploadButton from "./UploadButton";

export default function DropZone() {
  return (
    <div className="flex flex-col justify-center items-center w-full my-10 p-16 bg-dropzone-pattern bg-repeat">
      <UploadButton />
      <p className="mt-4 text-thenex-gray text-sm">oder Dateien hier ablegen</p>
    </div>
  );
}
