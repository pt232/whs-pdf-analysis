import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileProvider from "../context/FileProvider";
import HomePage from "../pages/HomePage";

export default function App() {
  return (
    <FileProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </FileProvider>
  );
}
