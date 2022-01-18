import { XIcon } from "@heroicons/react/solid";
import { useFiles } from "../context/file/FileProvider";

type RemoveButtonProps = {
  fileId: string;
};

export default function RemoveButton({ fileId }: RemoveButtonProps) {
  const { loading, removeFile } = useFiles();

  function handleClick() {
    if (loading) return;
    removeFile(fileId);
  }

  return (
    <button
      className={`flex justify-center items-center w-7 h-7 cursor-pointer rounded-sm col-start-3 row-start-1 md:col-start-5 justify-self-end hover:border hover:border-black dark:border-darkmode ${
        loading && "opacity-40 cursor-not-allowed"
      }`}
      onClick={handleClick}
    >
      <XIcon className="w-5 h-5 text-thenex-gray dark:text-darkmode-lighter" />
    </button>
  );
}
