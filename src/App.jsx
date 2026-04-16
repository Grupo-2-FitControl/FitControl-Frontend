import Activities from "./pages/Activity/Activities.jsx";
import { Routes, Route, Navigate } from "react-router-dom"; // <--- ESTA ES LA LÍNEA CLAVE
import Teachers from "./pages/teachers/Teachers.jsx";

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Navigate to="/activities" />} />
      
      
      <Route path="/activities" element={<Activities />} />
      <Route path="/teachers" element={<Teachers />} />
      
      <Route path="*" element={<Navigate to="/activities" />} />
    </Routes>
  );
}
export default App;