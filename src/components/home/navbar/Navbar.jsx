import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/LogoFitControlGym.png";

function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "auto";
  }, [visible]);

  return (
    <header>
      <div className="fixed top-0 left-0 w-full z-50 bg-mist-800 p-4 flex justify-between items-center text-white lg:hidden">
        <button className="text-2xl" onClick={() => setVisible(true)}>
          ☰
        </button>

        <div className="flex items-center gap-2">
          <img src={logo} className="w-8 h-8" />
          <span className="font-bold">FitControl</span>
        </div>
      </div>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-mist-800 text-white z-50
    transform transition-transform duration-300

    ${visible ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
        `}
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-600">
          <div className="flex items-center gap-2">
            <img src={logo} className="w-10 h-10" />
            <span className="font-bold text-lg">FitControl</span>
          </div>

          <button
            className="text-xl lg:hidden"
            onClick={() => setVisible(false)}
          >
            ✕
          </button>
        </div>

        <nav className="p-4">
          <ul className="flex flex-col gap-6 items-center w-full">
            <li className="p-2 text-[#d4ff00] hover:text-black transition-colors flex justify-center items-center gap-2 text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-activity"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12h4l3 8l4 -16l3 8h4" />
              </svg>
              <Link to="/" onClick={() => setVisible(false)}>
                Actividades
              </Link>
            </li>

            <li className="p-2 text-[#d4ff00] hover:text-black transition-colors flex justify-center items-center gap-2 text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-users"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
              </svg>
              <Link to="/activities" onClick={() => setVisible(false)}>
                Usuarios
              </Link>
            </li>

            <li className="p-2 text-[#d4ff00] hover:text-black transition-colors flex justify-center items-center gap-2 text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-school"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
              </svg>
              <Link to="/teachers" onClick={() => setVisible(false)}>
                Profesores
              </Link>
            </li>

            <li className="p-2 text-[#d4ff00] hover:text-black transition-colors flex justify-center items-center gap-2 text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9" />
                <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <Link to="/mis-actividades" onClick={() => setVisible(false)}>
                Mis actividades
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${visible ? "opacity-50" : "opacity-0 pointer-events-none"}`}
        onClick={() => setVisible(false)}
      />
    </header>
  );
}

export default Navbar;
