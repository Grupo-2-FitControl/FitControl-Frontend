import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "auto";
  }, [visible]);

  return (
    <>
      <header className="bg-mist-800 w-full lg:w-64 flex flex-col shadow-md lg:h-screen lg:sticky lg:top-0 lg:border-r-2 text-primary relative z-50">
        
        <div className="w-full p-6 border-b border-gray-400 flex justify-between items-center lg:flex-col">
    
          <div
            className="text-2xl lg:hidden cursor-pointer"
            onClick={() => setVisible(!visible)}
          >
            {visible ? "✕" : "☰"}
          </div>

          <img
            src="src/assets/LogoFitControlGym.png"
            alt="FitControl Gym Logo"
            className="w-12 h-12 object-contain"
          />

          <div className="text-center leading-tight">
            <h1 className="text-xl font-bold flex gap-1 justify-center">
              <span className="text-secondary">Fit</span>
              <span className="text-white">Control</span>
            </h1>
            <p className="text-sm text-primary">Gym Manager</p>
          </div>
        </div>

        <nav
          className={` bg-mist-800 flex-1 transform transition-transform duration-500 
          ${visible ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static fixed left-0 top-[100px] h-full z-50`}
        >
          <ul className="flex flex-col gap-3 p-4 text-white">
            
            <li className="p-2 rounded flex gap-2 justify-center lg:justify-around hover:text-black hover:font-bold">
              <Link to="/">Actividades</Link>
            </li>

            <li className="p-2 rounded flex gap-2 justify-center lg:justify-around hover:text-black hover:font-bold">
              <a href="#">Usuarios</a>
            </li>

            <li className="p-2 rounded flex gap-2 justify-center lg:justify-around hover:text-black hover:font-bold">
              <a href="#">Profesores</a>
            </li>

            <li className="p-2 rounded flex gap-2 justify-center lg:justify-around hover:text-black hover:font-bold">
              <a href="#">Mis actividades</a>
            </li>

          </ul>
        </nav>
      </header>

      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-500 
        ${visible ? "opacity-50" : "opacity-0 pointer-events-none"}`}
        onClick={() => setVisible(false)}
      />
    </>
  );
}

export default Navbar;