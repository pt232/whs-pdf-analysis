import { SunIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full py-4 border-b shadow-sm">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-6">
        <Link to="/">
          <h2 className="font-logo text-thenex-blue text-2xl md:text-3xl select-none">thenex</h2>
        </Link>
        <button title="Darkmode Button">
          <SunIcon className="w-6 h-6 text-thenex-gray-dark" />
        </button>
      </div>
    </header>
  );
}
