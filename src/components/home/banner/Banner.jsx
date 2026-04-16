import ActivityCard from "./ActivityCard";
function Banner() {

  return (
    <section className="flex flex-col background w-full">
      <header className="text-center flex flex-col gap-4 lg:flex-row justify-around items-center bg-gray-700 p-4">
        <div className="  flex flex-col gap-4">
          <h2 className="text-white text-2xl lg:text-5xl">Actividades Futuras</h2>
          <p className="text-mist-400 lg:text-2xl">Próximas clases disponibles</p>
        </div>

        <button className="w-[70%] px-6 py-4 background-primary rounded-md  lg:w-[20%]">
          +Nueva Actividad
        </button>
      </header>
     
    </section>
  );
}

export default Banner;
