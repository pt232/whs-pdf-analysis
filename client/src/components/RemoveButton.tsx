import { XIcon } from "@heroicons/react/solid";

export default function RemoveButton() {
  return (
    <button className="flex justify-center items-center w-7 h-7 cursor-pointer rounded-sm col-start-3 row-start-1 md:col-start-5 justify-self-end hover:border hover:border-black">
      <XIcon className="w-5 h-5 text-thenex-gray" />
    </button>
  );
}
