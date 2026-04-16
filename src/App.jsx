import Activities from "./pages/Activities";
import { Routes, Route } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Teachers from "./pages/teachers/Teachers.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Activities />} />
    </Routes>
  );
      <Route path="/" element={<Navigate to="/teachers" />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/teachers" element={<Teachers />} />
    </Routes>
  )
}

export default App;