import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  const [visible, setVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setVisible(false);
  }, [location.pathname]);

  return (
    <header className="shadow-md sticky top-0 z-50 background flex flex-col lg:flex-row justify-between items-center px-6">
      <div className="w-full flex justify-between items-center gap-4 border-b-2 border-gray-500 p-4 lg:border-none lg:w-auto">
        <button
          className="text-primary lg:hidden"
          onClick={() => setVisible((prev) => !prev)}
        >
          {visible ? "✕" : "☰"}
        </button>

        <div className="flex items-center gap-4 text-center">
          <img
            src="src/assets/LogoFitControlGym.png"
            alt="Logo del gimnasio"
            className="w-10 h-10"
          />

          <div className="flex flex-col items-start">
            <span className="font-bold text-sm uppercase text-primary">
              Fit Control
            </span>
            <p className="uppercase text-lime-500 text-xs font-bold">
              Gym Manager
            </p>
          </div>
        </div>
      </div>

      <nav
        className={`transition-all duration-300 ease-in-out p-4 w-full lg:w-auto ${visible ? "block" : "hidden"} lg:block lg:opacity-100 z-50`}
      >
        <ul className="flex flex-col gap-3 items-center w-full text-center lg:flex-row lg:gap-10">
          <li>
            <NavLink
              to={"/"}
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-link"
              }
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/activities"}
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-link"
              }
            >
              Actividades
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/teachers"}
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-link"
              }
            >
              Profesores
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/users"}
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-link"
              }
            >
              Usuarios
            </NavLink>
          </li>
        </ul>
      </nav>
      {visible && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden"
          onClick={() => setVisible(false)}
        />
      )}
    </header>
  );
}

export default Navbar;
