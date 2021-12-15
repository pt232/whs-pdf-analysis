import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type ProviderProps = {
  children: ReactNode;
};

type ContextProps = {
  heading: Heading;
  setHeading: Dispatch<SetStateAction<Heading>>;
};

type Heading = {
  title: string;
  paragraph: string;
};

const HeadingContext = createContext<ContextProps>({
  heading: {
    title: "PDF-Datei hochladen",
    paragraph: "Dokumente hochladen und bequem Daten extrahieren",
  },
  setHeading: () => {},
});

export function useHeading() {
  return useContext(HeadingContext);
}

export default function HeadingProvider({ children }: ProviderProps) {
  const [heading, setHeading] = useState<Heading>({
    title: "PDF-Datei hochladen",
    paragraph: "Dokumente hochladen und bequem Daten extrahieren",
  });

  const contextValue = {
    heading,
    setHeading,
  };

  return <HeadingContext.Provider value={contextValue}>{children}</HeadingContext.Provider>;
}
