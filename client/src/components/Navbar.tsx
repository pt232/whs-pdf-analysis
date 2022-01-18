import { Link } from "react-router-dom";
import DarkModeButton from "./DarkModeButton";

export default function Navbar() {
  return (
    <header className="w-full py-4 border-b dark:bg-darkmode-dark dark:border-darkmode shadow-sm">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-6">
        <Link to="/">
          <h2 className="font-logo text-thenex-blue dark:text-darkmode-lighter text-2xl md:text-3xl select-none">
            thenex
          </h2>
        </Link>
        <DarkModeButton />
      </div>
    </header>
  );
}
