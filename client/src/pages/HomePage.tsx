import Layout from "./Layout";
import DragIndicator from "../components/DragIndicator";
import DropBar from "../components/DropBar";
import DropZone from "../components/DropZone";
import FileList from "../components/FileList";
import { useFiles } from "../context/file/FileProvider";
import useDrag from "../hooks/useDrag";
import { useEffect } from "react";
import { useHeading } from "../context/heading/HeadingProvider";

export default function HomePage() {
  const { setHeading } = useHeading();
  const { documentFiles, clearFiles } = useFiles();
  const isDragging = useDrag();

  useEffect(() => {
    clearFiles();
    setHeading({
      title: "PDF-Datei hochladen",
      paragraph: "Dokumente hochladen und bequem Daten extrahieren",
    });

    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      {documentFiles.length > 0 ? (
        <div className="my-10 w-full shadow-2xl">
          <FileList files={documentFiles} />
          <DropBar />
        </div>
      ) : (
        <DropZone />
      )}
      {isDragging && <DragIndicator />}
    </Layout>
  );
}
