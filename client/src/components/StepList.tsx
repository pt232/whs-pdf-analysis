import Step from "./Step";

export default function StepList() {
  return (
    <div className="flex flex-col items-center space-y-12 mt-28 lg:flex-row lg:items-start lg:space-y-0">
      <Step count="1" title="Dokumente auswählen" />
      <Step count="2" title="Konvertierung starten" />
      <Step count="3" title="Importdatei herunterladen" />
    </div>
  );
}
