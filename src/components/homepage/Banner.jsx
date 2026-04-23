import {Link} from "react-router-dom";
function Banner() {
  return (
    <section className="flex-1 flex items-center bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/src/assets/bannerBackground.jpg')] bg-cover bg-center p-6 md:p-20 min-h-[calc(100dvh-var(--navbar-height))]">
      <div className="w-full relative font-bold flex flex-col gap-5 lg:max-w-3xl">
        <h1 className="uppercase leading-tight text-center lg:text-left">
          <span className="block text-primary text-4xl md:text-6xl lg:text-7xl">Descubre de qué</span>
          <span className="block text-secondary text-4xl md:text-6xl lg:text-7xl">eres capaz</span>
        </h1>

        <div className="text-center font-bold text-black text-secondary inline-block text-lg uppercase lg:text-3xl lg:text-left">
          Tu transformación comienza aquí
        </div>

        <p className="text-gray-300 text-lg text-center md:text-xl max-w-xl md:text-left">
          Únete a cientos de personas que ya están alcanzando sus objetivos. Sea cual sea tu meta, tenemos el
          entrenamiento perfecto para ti.
        </p>
        <div className="text-center lg:text-left">
          <button className="uppercase text-black background-primary p-4 w-[35%] cursor-pointer rounded-xl">
            <Link to={"/activities"}>Explorar Clases</Link>
          </button>
        </div>
        
      </div>
    </section>
  );
}

export default Banner;
