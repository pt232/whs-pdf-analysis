import { ReactNode } from "react";
import Heading from "../components/Heading";
import StepList from "../components/StepList";

type WrapperProps = {
  children: ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className="lg:flex flex-col justify-center items-center min-h-screen py-10 px-6">
      <div className="w-full max-w-5xl mx-auto">
        <Heading
          title="PDF-Dateien hochladen"
          paragraph="Dokumente hochladen und bequem Daten extrahieren"
        />
        {children}
        <StepList />
      </div>
    </div>
  );
}
