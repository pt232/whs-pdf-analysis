import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="w-full mt-auto py-3 bg-thenex-gray-dark text-thenex-gray">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-6">
        <p className="flex items-baseline space-x-2">
          <span>Made with </span> <FontAwesomeIcon icon={faHeart} className="text-xs" />
        </p>
        <a
          href="https://github.com/pt232/whs-pdf-analysis"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
