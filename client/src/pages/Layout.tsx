import { ReactNode } from "react";
import Heading from "../components/Heading";
import ErrorMessageItem from "../components/ErrorMessageItem";
import StepList from "../components/StepList";
import { useErrorMessage } from "../context/message/ErrorMessageProvider";
import { useHeading } from "../context/heading/HeadingProvider";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

type LayoutProps = {
  children: ReactNode;
  hideContent?: boolean;
};

export default function Layout({ children, hideContent }: LayoutProps) {
  const { message } = useErrorMessage();
  const {
    heading: { title, paragraph },
  } = useHeading();

  return (
    <div className="lg:flex flex-col justify-between items-center min-h-screen dark:bg-darkmode-darker">
      <Navbar />
      <div className="w-full max-w-5xl mx-auto my-6 py-10 px-6">
        {!hideContent ? <Heading title={title} paragraph={paragraph} /> : null}
        {message && !hideContent ? <ErrorMessageItem message={message} /> : null}
        {children}
        {!hideContent ? <StepList /> : null}
      </div>
      <Footer />
    </div>
  );
}
