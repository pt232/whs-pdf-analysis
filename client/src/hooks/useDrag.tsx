import { useEffect, useRef, useState } from "react";

export default function useDrag() {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedFiles, setDraggedFiles] = useState<File[]>([]);
  const dragCounter = useRef(0);

  function handleDragEnter(e: DragEvent) {
    e.preventDefault();
    dragCounter.current++;
    setIsDragging(true);
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    const files = e.dataTransfer?.files;

    if (files && files.length > 0) {
      let addedFiles: File[] = [];

      Array.from(files).forEach((file) => {
        addedFiles.push(file);
      });

      setDraggedFiles((prevFiles) => [...prevFiles, ...addedFiles]);

      e.dataTransfer.clearData();
      dragCounter.current = 0;
      setIsDragging(false);
    }
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setIsDragging(false);
  }

  useEffect(() => {
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);
    window.addEventListener("dragleave", handleDragLeave);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
      window.removeEventListener("dragleave", handleDragLeave);
    };
  });

  return { isDragging, draggedFiles };
}
