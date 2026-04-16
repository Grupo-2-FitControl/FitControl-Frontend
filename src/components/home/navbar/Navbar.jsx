import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/LogoFitControlGym.png";

function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = visible ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = original;
    };
  }, [visible]);

  return (
    <header>
      <div className="bg-mist-800 w-full p-4 flex justify-between items-center text-white lg:hidden">
        <button className="text-2xl" onClick={() => setVisible(true)}>
          ☰
        </button>

        <div className="flex items-center gap-2">
          <img src={logo} className="w-8 h-8" />
          <span className="font-bold">FitControl</span>
        </div>
      </div>

      <aside
        className={`fixed top-0 left-0 h-full w-[40%] bg-mist-800 text-white z-50 transform transition-transform duration-300 ${visible ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:h-screen lg:w-60
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
            <li className="text-xl">
              <Link className="w-full" to="/" onClick={() => setVisible(false)}>
                Actividades
              </Link>
            </li>

            <li className="text-xl">
              <Link to="/activities" onClick={() => setVisible(false)}>
                Usuarios
              </Link>
            </li>

            <li className="text-xl">
              <Link to="/teachers" onClick={() => setVisible(false)}>
                Profesores
              </Link>
            </li>

            <li className="text-xl">
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
