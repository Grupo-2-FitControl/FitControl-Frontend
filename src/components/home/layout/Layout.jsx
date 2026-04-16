import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Navbar />

      <main className="lg:ml-64 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
