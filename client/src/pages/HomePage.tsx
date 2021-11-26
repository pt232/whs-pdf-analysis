import { useEffect } from "react";
import DragIndicator from "../components/DragIndicator";
import DropZone from "../components/DropZone";
import Heading from "../components/Heading";
import StepList from "../components/StepList";
import { useFiles } from "../context/FileProvider";
import useDrag from "../hooks/useDrag";

export default function HomePage() {
  const { addFiles } = useFiles();
  const { isDragging, draggedFiles } = useDrag();

  useEffect(() => {
    addFiles(draggedFiles);
  }, [draggedFiles, addFiles]);

  return (
    <div className="lg:flex flex-col justify-center w-full min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <Heading
          title="PDF-Dateien hochladen"
          paragraph="Dokumente hochladen und bequem Daten extrahieren"
        />
        <DropZone />
        <StepList />
      </div>
      {isDragging && <DragIndicator />}
    </div>
  );
}
