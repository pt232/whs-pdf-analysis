export default function Footer() {
  return (
    <footer className="w-full mt-auto py-3 bg-thenex-gray-dark dark:bg-darkmode-dark text-thenex-gray dark:text-darkmode-lighter">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-6 text-sm">
        <p>Projekt im Berufsfeld &copy; 2022</p>
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
