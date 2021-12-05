import { useEffect } from "react";
import Wrapper from "./Wrapper";
import DragIndicator from "../components/DragIndicator";
import DropBar from "../components/DropBar";
import DropZone from "../components/DropZone";
import FileList from "../components/FileList";
import { useFiles } from "../context/FileProvider";
import useDrag from "../hooks/useDrag";

export default function HomePage() {
  const { addedFiles, addFiles } = useFiles();
  const { isDragging, draggedFiles } = useDrag();

  useEffect(() => {
    addFiles(draggedFiles);
  }, [draggedFiles, addFiles]);

  return (
    <Wrapper>
      {addedFiles.length > 0 ? (
        <div className="shadow-2xl my-10">
          <FileList files={addedFiles} />
          <DropBar />
        </div>
      ) : (
        <DropZone />
      )}
      {isDragging && <DragIndicator />}
    </Wrapper>
  );
}
