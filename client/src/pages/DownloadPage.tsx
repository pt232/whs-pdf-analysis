import { useEffect } from "react";
import DropBar from "../components/DropBar";
import FileItem from "../components/FileItem";
import { useFiles } from "../context/file/FileProvider";
import Layout from "./Layout";

export default function DownloadPage() {
  const { excelFile, convertAndAddExcelFiles } = useFiles();

  useEffect(() => {
    convertAndAddExcelFiles();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="w-full my-10 shadow-2xl">
        <FileItem key={excelFile.id} type="excel" file={excelFile} excelFile={excelFile} />
        <DropBar type="excel" />
      </div>
    </Layout>
  );
}
