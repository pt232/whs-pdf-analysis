import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileExcel } from "@fortawesome/free-regular-svg-icons";
import { IDocumentFile, IExcelFile } from "../context/file/FileProvider";
import Badge from "./Badge";
import RemoveButton from "./RemoveButton";
import TemplateSelector from "./TemplateSelector";
import DownloadButton from "./DownloadButton";

type FileItemProps = {
  type?: "excel";
  file: IDocumentFile | IExcelFile;
  excelFile?: IExcelFile;
};

export default function FileItem({ type, file, excelFile }: FileItemProps) {
  function getBadgeText() {
    if (type === "excel" && file.loading) return "Konvertiert";
    if (type === "excel" && !file.loading) return "Beendet";
    if (type !== "excel" && file.loading) return "Lädt hoch";
    else return "Hochgeladen";
  }

  return (
    <div
      className={`grid grid-cols-3 ${
        type === "excel" ? "md:grid-cols-3" : "md:grid-cols-5"
      } grid-rows-2 md:grid-rows-1 gap-y-3 md:gap-0 items-center p-3 md:px-5 bg-white border-b last:shadow-sm last:border-0`}
    >
      <div className="flex justify-start items-center col-span-2 md:col-span-1 md:col-start-1">
        <FontAwesomeIcon
          icon={type !== "excel" ? faFilePdf : faFileExcel}
          className={`text-xl ${type !== "excel" ? "text-red-500" : "text-green-600"}`}
        />
        <span className="inline-block ml-3 text-thenex-gray-dark text-sm">{file.croppedName}</span>
      </div>
      {type !== "excel" ? (
        <div className="flex items-center text-thenex-gray-dark col-start-3 row-start-2 md:col-start-2 md:row-start-1 justify-self-end">
          <span className="text-thenex-gray text-sm">als</span>
          <TemplateSelector fileId={file.id} />
        </div>
      ) : null}
      <Badge
        text={getBadgeText()}
        loading={file.loading}
        finished={!file.loading && type === "excel"}
      />
      <div
        className={`${
          type === "excel" ? "ml-0" : "-ml-8"
        } md:ml-0 md:justify-self-center text-thenex-gray text-sm`}
      >
        {file.calculatedSize}
      </div>
      {type === "excel" ? (
        <DownloadButton fileId={excelFile?.file.id} loading={file.loading} />
      ) : (
        <RemoveButton fileId={file.id} />
      )}
    </div>
  );
}
