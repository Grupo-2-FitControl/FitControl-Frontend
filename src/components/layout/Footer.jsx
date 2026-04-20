function Footer() {
  return (
    <footer className="p-8 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-zinc-800 bg-black text-zinc-400">
      <div className="flex items-center gap-4">
        <img
          src="src/assets/LogoFitControlGym.png"
          alt="Fit Control Logo"
          className="w-12 h-12 object-contain"
        />
        <p className="text-sm">
          &copy; 2026 <span className="text-white font-bold">Fit Control</span>.
          <span className="block md:inline">
            {" "}
            Todos los derechos reservados.
          </span>
        </p>
      </div>

      <div className="flex flex-col justify-around text-xs uppercase tracking-widest items-center lg:w-[60%] lg:flex-row gap-4">
        <p className="w-full flex items-center justify-center bg-zinc-900/50 px-4 py-2 border-l-2 border-[#d4ff00] text-center">
          <span className="text-zinc-600 italic">Frontend:</span> React +
          Tailwind
        </p>
        <p className="w-full flex items-center justify-center bg-zinc-900/50 px-4 py-2 border-l-2 border-[#d4ff00] text-center" >
          <span className="text-zinc-600 italic">Backend:</span> Spring Boot
        </p>

        <p className="w-full flex items-center justify-center bg-zinc-900/50 px-4 py-2 border-l-2 border-[#d4ff00] text-center">
          Diseño: Diseño atómico
        </p>
      </div>
    </footer>
  );
}

export default Footer;
