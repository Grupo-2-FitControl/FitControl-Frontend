function Banner() {
  return (
    <section className="flex-1 flex items-center bg-[url('/src/assets/bannerBackground.jpg')] bg-cover bg-center p-6 md:p-20 min-h-[calc(100dvh-var(--navbar-height))]">
      

      <div className="relative font-bold flex flex-col gap-8 max-w-3xl">
        <div className="text-black bg-lime-400 px-4 py-2 inline-block text-sm uppercase w-fit">
          Tu transformación comienza aquí
        </div>

        <h1 className="uppercase leading-tight">
          <span className="block text-primary text-4xl md:text-6xl lg:text-7xl">
            Descubre de qué
          </span>
          <span className="block text-secondary text-4xl md:text-6xl lg:text-7xl">
            eres capaz
          </span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-xl">
          Únete a cientos de personas que ya están alcanzando sus objetivos. Sea
          cual sea tu meta, tenemos el entrenamiento perfecto para ti.
        </p>
          <button className="uppercase text-black background-primary p-4 w-[35%] cursor-pointer">
            Explorar Clases
          </button> 
  
      </div>
    </section>
  );
}

export default Banner;
