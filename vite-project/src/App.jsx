import { Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import TablePage from "./pages/TablePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} /> {/* Page d'accueil */}
      <Route path="/table" element={<TablePage />} /> {/* Page tableau */}
    </Routes>
  );
};

export default App;
