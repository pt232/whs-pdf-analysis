import StepItem from "./StepItem";

export default function StepList() {
  const stepDescriptions = [
    "Wählen Sie die PDF-Dokumente, die Sie konvertieren möchten, über den Button oder per Drag & Drop aus. Suchen Sie sich dann die passende Vorlage heraus. Zur Verfügung steht eine Auswahl der Thenex-Kunden.",
    "Klicken Sie auf den Konvertieren-Button. Die PDF-Dokumente werden dann hochgeladen. Anschließend wird für Sie eine Excel-Datei erstellt. Der Vorgang kann einige Sekunden dauern.",
    "Jetzt steht Ihre neue Importdatei für das Topix-System zum Download bereit. Nachdem der Download abgeschlossen ist, werden die vorher hochgeladenen PDF-Dokumente vom Server wieder entfernt.",
  ];

  return (
    <div className="flex flex-col items-center space-y-12 mt-28 lg:flex-row lg:items-start lg:justify-center lg:space-y-0">
      <StepItem count="1" title="Dokumente auswählen" description={stepDescriptions[0]} />
      <StepItem count="2" title="Konvertierung starten" description={stepDescriptions[1]} />
      <StepItem count="3" title="Importdatei herunterladen" description={stepDescriptions[2]} />
    </div>
  );
}
