import { ReactNode } from "react";
import Heading from "../components/Heading";
import ErrorMessageItem from "../components/ErrorMessageItem";
import StepList from "../components/StepList";
import { useErrorMessage } from "../context/message/ErrorMessageProvider";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { message } = useErrorMessage();

  return (
    <div className="lg:flex flex-col justify-center items-center min-h-screen py-10 px-6">
      <div className="w-full max-w-5xl mx-auto">
        <Heading
          title="PDF-Dateien hochladen"
          paragraph="Dokumente hochladen und bequem Daten extrahieren"
        />
        {message ? <ErrorMessageItem text={message} /> : null}
        {children}
        <StepList />
      </div>
    </div>
  );
}
