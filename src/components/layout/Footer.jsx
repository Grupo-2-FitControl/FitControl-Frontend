function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-white font-sans">
      <div className="max-w-[1100px] mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-8">

        {/* LOGO + COPYRIGHT */}
        <div className="flex items-center gap-4">
          <img
            src="src/assets/LogoFitControlGym.png"
            alt="Fit Control Logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <p className="text-[#CCFF00] font-black italic uppercase tracking-tighter text-lg leading-none">
              Fit Control
            </p>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">
              &copy; 2026 Todos los derechos reservados
            </p>
          </div>
        </div>

        {/* ENLACES */}
        <nav className="flex flex-col sm:flex-row items-center gap-4 text-[11px] font-black uppercase tracking-widest">
          <a
            href="#contacto"
            className="inline-block text-[#CCFF00] hover:text-[#fb923c] hover:scale-125 transition-all duration-200"
          >
            Contacto
          </a>
          <span className="hidden sm:block text-gray-700">|</span>
          <a
            href="#terminos"
            className="inline-block text-[#CCFF00] hover:text-[#fb923c] hover:scale-125 transition-all duration-200"
          >
            Términos y condiciones
          </a>
        </nav>

        {/* REDES SOCIALES */}
        <div className="flex items-center gap-4">
          {/* Instagram */}
          <a
            href="#"
            aria-label="Instagram"
            className="inline-block text-[#CCFF00] hover:text-[#fb923c] hover:scale-125 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="#"
            aria-label="Facebook"
            className="inline-block text-[#CCFF00] hover:text-[#fb923c] hover:scale-125 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="#"
            aria-label="YouTube"
            className="inline-block text-[#CCFF00] hover:text-[#fb923c] hover:scale-125 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>

          {/* X / Twitter */}
          <a
            href="#"
            aria-label="X"
            className="inline-block text-[#CCFF00] hover:text-[#fb923c] hover:scale-125 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
