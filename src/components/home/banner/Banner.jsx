import ActivityCard from "./ActivityCard";
import { useState, useEffect } from "react";

function Banner() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fakeDataActivities = [
      {
        id: 1,
        image: "src/assets/Bike.png",
        title: "Juan Pérez",
        description: "Actividad 1",
        trainer: "Alberto",
        price: "25",
        ate: "16/10/1994",
        spots: "4",
        maxSpots: "4",
      },
      {
        id: 1,
        image: "src/assets/Bike.png",
        title: "Juan Pérez",
        description: "Actividad 1",
        trainer: "Alberto",
        price: "25",
        ate: "16/10/1994",
        spots: "4",
        maxSpots: "4",
      },

      {
        id: 1,
        image: "src/assets/Bike.png",
        title: "Juan Pérez",
        description: "Actividad 1",
        trainer: "Alberto",
        price: "25",
        ate: "16/10/1994",
        spots: "4",
        maxSpots: "4",
      },

      {
        id: 1,
        image: "src/assets/Bike.png",
        title: "Juan Pérez",
        description: "Actividad 1",
        trainer: "Alberto",
        price: "25",
        ate: "16/10/1994",
        spots: "4",
        maxSpots: "4",
      },
    ];

    setData(fakeDataActivities);
  }, []);

  return (
    <section className="flex flex-col background w-full pt-16">
      <header className="text-center flex flex-col gap-4 lg:flex-row justify-around items-center bg-gray-700 p-4">
        <div className="  flex flex-col gap-4">
          <h2 className="text-white text-2xl lg:text-5xl">
            Actividades Futuras
          </h2>
          <p className="text-mist-400 lg:text-2xl">
            Próximas clases disponibles
          </p>
        </div>

        <button className="w-[70%] px-6 py-4 background-primary rounded-md  lg:w-[20%]">
          +Nueva Actividad
        </button>
      </header>

      <section className="p-4">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((activity) => (
            <ActivityCard key={activity.id} {...activity} />
          ))}
        </div>
      </section>
    </section>
  );
}

export default Banner;
