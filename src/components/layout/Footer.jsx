import { useState } from "react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialIcon = ({ href, label, Icon }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? "#fb923c" : "#CCFF00",
        transform: hovered ? "scale(1.5)" : "scale(1)",
        display: "inline-block",
        transition: "color 0.2s ease, transform 0.2s ease",
      }}
    >
      <Icon size={28} />
    </a>
  );
};

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
            <p className="text-white text-[10px] uppercase tracking-widest mt-1">
              &copy; 2026 Todos los derechos reservados
            </p>
          </div>
        </div>

        {/* ENLACES */}
        <nav className="flex flex-col sm:flex-row items-center gap-4 text-sm font-light tracking-wide">
          <a
            href="#contacto"
            className="inline-block text-[#fb923c] hover:text-white transition-colors duration-200"
          >
            Contacto
          </a>
          <span className="hidden sm:block text-gray-700">|</span>
          <a
            href="#terminos"
            className="inline-block text-[#fb923c] hover:text-white transition-colors duration-200"
          >
            Términos y condiciones
          </a>
        </nav>

        {/* REDES SOCIALES */}
        <div className="flex items-center gap-5">
          <SocialIcon href="#" label="Instagram" Icon={FaInstagram} />
          <SocialIcon href="#" label="Facebook" Icon={FaFacebook} />
          <SocialIcon href="#" label="YouTube" Icon={FaYoutube} />
          <SocialIcon href="#" label="X" Icon={FaXTwitter} />
        </div>

      </div>
    </footer>
  );
}

export default Footer;
