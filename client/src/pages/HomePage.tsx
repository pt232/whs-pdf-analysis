import Layout from "./Layout";
import DragIndicator from "../components/DragIndicator";
import DropBar from "../components/DropBar";
import DropZone from "../components/DropZone";
import FileList from "../components/FileList";
import { useFiles } from "../context/file/FileProvider";
import useDrag from "../hooks/useDrag";

export default function HomePage() {
  const { documentFiles } = useFiles();
  const isDragging = useDrag();

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
