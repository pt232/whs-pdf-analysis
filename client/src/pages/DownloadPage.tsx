import { useEffect } from "react";
import { useHeading } from "../context/heading/HeadingProvider";
import Layout from "./Layout";

export default function DownloadPage() {
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading({
      title: "Konvertierung abgeschlossen!",
      paragraph: "Laden Sie die konvertierte Datei herunter",
    });
  }, [setHeading]);

  return (
    <Layout>
      <p className="mt-10 text-center text-thenex-gray-dark">
        Hier wird noch dran gearbeitet... <span className="text-2xl">🐒</span>
      </p>
    </Layout>
  );
}
