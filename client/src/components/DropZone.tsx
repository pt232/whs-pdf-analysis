import UploadButton from "./UploadButton";

export default function DropZone() {
  return (
    <div className="flex flex-col justify-center items-center w-full my-10 py-16 px-12 sm:px-16 bg-dropzone-pattern dark:bg-dropzone-pattern-dark bg-repeat">
      <UploadButton isFileAddedState={false} text="Dateien wählen" />
      <p className="mt-4 text-thenex-gray text-sm">oder Dateien hier ablegen</p>
    </div>
  );
}
