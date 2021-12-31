import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileProvider from "../context/file/FileProvider";
import HeadingProvider from "../context/heading/HeadingProvider";
import ErrorMessageProvider from "../context/message/ErrorMessageProvider";
import DownloadPage from "../pages/DownloadPage";
import HomePage from "../pages/HomePage";

export default function App() {
  return (
    <Router>
      <ErrorMessageProvider>
        <HeadingProvider>
          <FileProvider>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/download" element={<DownloadPage />} />
            </Routes>
          </FileProvider>
        </HeadingProvider>
      </ErrorMessageProvider>
    </Router>
  );
}
