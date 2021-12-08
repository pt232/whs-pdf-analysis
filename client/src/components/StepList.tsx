import StepItem from "./StepItem";

export default function StepList() {
  return (
    <div className="flex flex-col items-center space-y-12 mt-28 lg:flex-row lg:items-start lg:justify-center lg:space-y-0">
      <StepItem count="1" title="Dokumente auswählen" />
      <StepItem count="2" title="Konvertierung starten" />
      <StepItem count="3" title="Importdatei herunterladen" />
    </div>
  );
}
