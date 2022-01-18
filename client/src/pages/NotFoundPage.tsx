import { Link } from "react-router-dom";
import Layout from "./Layout";

export default function NotFoundPage() {
  return (
    <Layout hideContent={true}>
      <div className="flex flex-col items-center text-center">
        <span className="text-2xl md:text-3xl">😭</span>
        <p className="mt-3 md:mt-4 text-thenex-gray-dark dark:text-darkmode-lighter md:text-lg font-medium">
          Bitte nicht weinen,{" "}
          <Link to="/" className="underline">
            hier
          </Link>{" "}
          geht es zurück...
        </p>
      </div>
    </Layout>
  );
}
