import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="shadow-md sticky top-0 z-50 background flex flex-col lg:flex-row justify-between items-center px-6">
      <div className="w-full flex justify-between items-center gap-4 border-b-2 border-gray-500 p-4 lg:border-none lg:w-auto">
        <button className="text-primary lg:hidden">☰</button>

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

      <nav className="p-4 w-full lg:w-auto">
        <ul className="flex flex-col gap-6 items-center w-full text-center lg:flex-row lg:gap-10">
          <li className="nav-link">
            <Link to={"/"}>
              Inicio
            </Link>
          </li>
          <li className="nav-link">
            <Link to={"/activities"}>
              Actividades
            </Link>
          </li>
          <li className="nav-link">
            <Link to={"/teachers"}>
              Profesores
            </Link>
          </li>
          <li className="nav-link">
            <Link to={"/users"}>
              Usuarios
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
