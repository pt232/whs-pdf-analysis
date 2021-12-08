import { createContext, ReactNode, useContext, useState } from "react";

type ProviderProps = {
  children: ReactNode;
};

type ContextProps = {
  message: string;
  addMessage: (text: string) => void;
  removeMessage: () => void;
};

const ErrorMessageContext = createContext<ContextProps>({
  message: "",
  addMessage: () => {},
  removeMessage: () => {},
});

export function useErrorMessage() {
  return useContext(ErrorMessageContext);
}

export default function ErrorMessageProvider({ children }: ProviderProps) {
  const [message, setMessage] = useState("");

  function addMessage(text: string) {
    setMessage(text);
  }

  function removeMessage() {
    setMessage("");
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
