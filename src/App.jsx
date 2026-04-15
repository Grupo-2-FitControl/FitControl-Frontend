import Activities from "./pages/Activities";
import Layout from "./components/home/layout/Layout"
import Home from "./pages/home/Home"
import { Routes, Route } from "react-router-dom";
function App() {
  return (
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="activities" element={<Activities />} />
      </Route>
    </Routes>
  );
}
export default App;
