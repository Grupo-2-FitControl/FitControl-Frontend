import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div className="flex justify-around  items-center gap-4 border-b-2 border-gray-500 p-4">
        <button> ☰ </button>
        <div className="flex items-center gap-1">
          <img
            src="src/assets/LogoFitControlGym.png"
            alt="Logo del gimnasio"
            className="w-8 h-8"
          />
          <span className="font-bold text-sm uppercase">Fit Control</span>
        </div>
        <p className="uppercase text-lime-500 text-xs font-bold">Gym Manager</p>
      </div>
      <nav className="p-4">
        <ul className="flex flex-col gap-6 items-center w-full">
          <li>
            <Link to={"/"}>Inicio</Link>
          </li>
          <li>
            <Link to={"/activities"}>Actividades</Link>
          </li>
          <li>
            <Link to={"/teachers"}>Profesores</Link>
          </li>
          <li>
            <Link to={"/users"}>Usuarios</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
