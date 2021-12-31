import { ExclamationCircleIcon, XIcon } from "@heroicons/react/solid";
import { ErrorMessage, useErrorMessage } from "../context/message/ErrorMessageProvider";

type ErrorMessageItemProps = {
  message: ErrorMessage;
};

export default function ErrorMessageItem({ message }: ErrorMessageItemProps) {
  const { removeMessage } = useErrorMessage();

  return (
    <div className="flex items-center mt-10 -mb-6 px-4 md:px-5 py-2 bg-red-100 text-red-700 border border-red-400">
      <ExclamationCircleIcon className="flex-shrink-0 w-5 h-5" />
      <p className="mx-4">
        <span className="inline-block mr-1 font-medium">{message.context}</span>
        {message.message}
      </p>
      <XIcon className="ml-auto flex-shrink-0 w-5 h-5 cursor-pointer" onClick={removeMessage} />
    </div>
  );
}
