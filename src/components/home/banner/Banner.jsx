import ActivityCard from "./ActivityCard";
import { useState, useEffect } from "react";
import SummaryCard from "./SummaryCard";

function Banner() {
  const [data, setData] = useState([]);
  const [dataSummary, setDataSummary] = useState([]);

  useEffect(() => {
    const fakeDataActivities = [
      {
        id: 1,
        image: "src/assets/Bike.png",
        title: "Juan Pérez",
        description: "Actividad 1",
        trainer: "Alberto",
        price: "25",
        date: "16/10/1994",
        spots: "4",
        maxSpots: "4",
      },
      {
        id: 2,
        image: "src/assets/Bike.png",
        title: "Juan Pérez",
        description: "Actividad 1",
        trainer: "Alberto",
        price: "25",
        date: "16/10/1994",
        spots: "4",
        maxSpots: "4",
      },
      {
        id: 3,
        image: "src/assets/Bike.png",
        title: "Juan Pérez",
        description: "Actividad 1",
        trainer: "Alberto",
        price: "25",
        date: "16/10/1994",
        spots: "4",
        maxSpots: "4",
      },
      {
        id: 4,
        image: "src/assets/Bike.png",
        title: "Juan Pérez",
        description: "Actividad 1",
        trainer: "Alberto",
        price: "25",
        date: "16/10/1994",
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
        date: "16/10/1994",
        spots: "4",
        maxSpots: "4",
      },
      {
        id: 2,
        image: "src/assets/Bike.png",
        title: "Juan Pérez",
        description: "Actividad 1",
        trainer: "Alberto",
        price: "25",
        date: "16/10/1994",
        spots: "4",
        maxSpots: "4",
      },
      {
        id: 3,
        image: "src/assets/Bike.png",
        title: "Juan Pérez",
        description: "Actividad 1",
        trainer: "Alberto",
        price: "25",
        date: "16/10/1994",
        spots: "4",
        maxSpots: "4",
      },
      {
        id: 4,
        image: "src/assets/Bike.png",
        title: "Juan Pérez",
        description: "Actividad 1",
        trainer: "Alberto",
        price: "25",
        date: "16/10/1994",
        spots: "4",
        maxSpots: "4",
      },
    ];

    setData(fakeDataActivities);

    const fakeDataActivitiesSummary = [
      {
        id: 1,
        numberActivitiesSummary: "6",
        descriptionActivitySummary: "Total Actividades",
      },
      {
        id: 2,
        numberActivitiesSummary: "12",
        descriptionActivitySummary: "Inscripciones hoy",
      },
      {
        id: 3,
        numberActivitiesSummary: "4",
        descriptionActivitySummary: "Usuarios activos",
      },
      {
        id: 4,
        numberActivitiesSummary: "3",
        descriptionActivitySummary: "Profesores activos",
      },
    ];

    setDataSummary(fakeDataActivitiesSummary);
  }, []);

  return (
    <article className="flex flex-col background w-full pt-16 lg:pt-0">
      <header className="text-center flex flex-col gap-4 lg:flex-row justify-around items-center bg-gray-700 p-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-2xl lg:text-5xl">
            Actividades Futuras
          </h2>
          <p className="text-mist-400 lg:text-2xl">
            Próximas clases disponibles
          </p>
        </div>

        <button className="w-[70%] px-6 py-4 background-primary rounded-md lg:w-[20%]">
          +Nueva Actividad
        </button>
      </header>
      <div className="p-6">
        <section className="p-4 flex flex-col gap-8 ">
          <h3 className="text-5xl text-white">Resumen</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dataSummary.map((activity, index) => (
              <SummaryCard
                key={activity.id}
                {...activity}
                cardColor={index % 2 === 0 ? "green" : "red"}
              />
            ))}
          </div>
        </section>
        <section className="p-4 flex items-center flex-col gap-8">
          <h3 className="text-5xl text-white">Actividades</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((activity) => (
              <ActivityCard key={activity.id} {...activity} />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

export default Banner;
