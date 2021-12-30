import ConvertButton from "./ConvertButton";
import UploadButton from "./UploadButton";

type DropBarProps = {
  type?: "excel";
};

export default function DropBar({ type }: DropBarProps) {
  return (
    <div className="flex flex-col w-full md:flex-row">
      <div
        className={`flex justify-center items-center w-full py-6 md:p-4 bg-dropzone-pattern bg-repeat ${
          type === "excel" ? "md:justify-center" : "md:justify-start"
        }`}
      >
        <UploadButton
          isFileAddedState={true}
          text={type === "excel" ? "Weitere Dateien konvertieren" : "Füge mehr Dateien hinzu"}
          type={type}
        />
        {type !== "excel" ? (
          <p className="ml-4 text-thenex-gray text-sm hidden md:block">oder Dateien hier ablegen</p>
        ) : null}
      </div>
      {type !== "excel" ? <ConvertButton text="Konvertieren" /> : null}
    </div>
  );
}
