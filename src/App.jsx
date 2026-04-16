import Activities from "./pages/Activities";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Activities />} />
    </Routes>
  );
}

export default App;