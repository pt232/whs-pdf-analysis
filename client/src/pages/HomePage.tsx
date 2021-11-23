import DropZone from "../components/DropZone";
import Heading from "../components/Heading";
import StepList from "../components/StepList";

export default function HomePage() {
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
    </div>
  );
}
