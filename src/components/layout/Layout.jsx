import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}

export default Layout;
