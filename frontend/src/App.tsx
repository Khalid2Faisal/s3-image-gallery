import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import UploadImagePage from "./pages/UploadImagePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/newImage" element={<UploadImagePage />} />
      </Route>
    </Routes>
  );
}

export default App;
