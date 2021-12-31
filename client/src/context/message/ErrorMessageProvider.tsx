import { createContext, ReactNode, useContext, useState } from "react";

type ProviderProps = {
  children: ReactNode;
};

type ContextProps = {
  message: ErrorMessage | null;
  addMessage: (context: string, text: string) => void;
  removeMessage: () => void;
};

export type ErrorMessage = {
  context: string;
  message: string;
};

const ErrorMessageContext = createContext<ContextProps>({
  message: null,
  addMessage: () => {},
  removeMessage: () => {},
});

export function useErrorMessage() {
  return useContext(ErrorMessageContext);
}

export default function ErrorMessageProvider({ children }: ProviderProps) {
  const [message, setMessage] = useState<ErrorMessage | null>(null);

  function addMessage(context: string, text: string) {
    setMessage({
      context,
      message: text,
    });
  }

  function removeMessage() {
    setMessage(null);
  }

  const contextValue = {
    message,
    addMessage,
    removeMessage,
  };

  return (
    <ErrorMessageContext.Provider value={contextValue}>{children}</ErrorMessageContext.Provider>
  );
}
