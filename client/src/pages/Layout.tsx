import { ReactNode } from "react";
import Heading from "../components/Heading";
import ErrorMessageItem from "../components/ErrorMessageItem";
import StepList from "../components/StepList";
import { useErrorMessage } from "../context/message/ErrorMessageProvider";
import { useHeading } from "../context/heading/HeadingProvider";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { message } = useErrorMessage();
  const {
    heading: { title, paragraph },
  } = useHeading();

  return (
    <div className="lg:flex flex-col justify-center items-center min-h-screen py-10 px-6">
      <div className="w-full max-w-5xl mx-auto">
        <Heading title={title} paragraph={paragraph} />
        {message ? <ErrorMessageItem text={message} /> : null}
        {children}
        <StepList />
      </div>
    </div>
  );
}
