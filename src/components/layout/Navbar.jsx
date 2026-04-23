import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Inicio" },
    { to: "/activities", label: "Actividades" },
    { to: "/teachers", label: "Profesores" },
    { to: "/users", label: "Usuarios" },
  ];

  useEffect(() => {
    setVisible(false);
  }, [location.pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-black shadow-md ">
        <div className="flex justify-between items-center px-6 py-4 md:px-10 md:py-6 border-b-2 border-mist-700">
          <div className="flex items-center gap-4">
            <img
              src="src/assets/LogoFitControlGym.png"
              alt="Logo del gimnasio"
              className="w-10 h-10"
            />
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm uppercase text-primary">
                Fit Control
              </span>
              <p className="uppercase text-secondary text-xs font-bold">
                Gym Manager
              </p>
            </div>
          </div>

          <button
            className="text-primary lg:hidden text-2xl leading-none"
            onClick={() => setVisible((prev) => !prev)}
            aria-label="Menú"
          >
            {visible ? "✕" : "☰"}
          </button>

          <nav className="hidden lg:flex">
            <ul className="flex gap-10">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      isActive ? "nav-active" : "nav-link"
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <nav
          className={`border-b-2 border-mist-700 ${
            visible ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } lg:hidden overflow-hidden transition-all duration-300`}
        >
          <ul className="flex flex-col items-center gap-4">
            {navLinks.map(({ to, label }) => (
              <li key={to} className="w-full text-center">
                <NavLink
                  to={to}
                  onClick={() => setVisible(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "nav-active block w-full"
                      : "nav-link block w-full"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {visible && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setVisible(false)}
        />
      )}
    </>
  );
}

export default Navbar;
