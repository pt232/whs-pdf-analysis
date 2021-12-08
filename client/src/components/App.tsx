import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileProvider from "../context/file/FileProvider";
import ErrorMessageProvider from "../context/message/ErrorMessageProvider";
import HomePage from "../pages/HomePage";

export default function App() {
  return (
    <ErrorMessageProvider>
      <FileProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </FileProvider>
    </ErrorMessageProvider>
  );
}
