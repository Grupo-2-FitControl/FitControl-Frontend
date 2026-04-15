
import ActivityCard from "../components/ActivityCard";

// Importaciones de imágenes (según tu explorador de archivos)
import imgCircuit from "../assets/circuit.png";
import imgCross from "../assets/CrossTraining.jpg";
import imgPilates from "../assets/pilates.png";
import imgZumba from "../assets/zumba.png";
import coachMelissa from "../assets/Melissa.png";
import coachMaria from "../assets/maria regueiro.png";
import coachRoberto from "../assets/alberto.png";

const misActividades = [
  {
    id: 1,
    name: "AQUAFIT",
    coach: "Maria Regueiro",
    description:
      "Mejora la resistencia natural del agua para fortalecer la musculatura.",
    image: imgPilates,
    coachImage: coachMaria,
    contact: "+34 642 81 54",
  },
  {
    id: 2,
    name: "BIKE",
    coach: "Melissa Gómez",
    description:
      "Entrenamiento cardiovascular diseñado para fortalecer el tren inferior.",
    image: imgZumba,
    coachImage: coachMelissa,
    contact: "+34 624 39 42 61",
  },

  {
    id: 3,
    name: "CIRCUIT",
    coach: "Alberto García",
    description:
      "Circuito de alta intensidad por estaciones para trabajo metabólico.",
    image: imgCross,
    coachImage: coachRoberto,
    contact: "+34 600 00 00 00",
  },
  {
    id: 4,
    name: "CROSS TRAINING",
    coach: "Javier Galván",
    description: "Entrenamiento funcional variado ejecutado a alta intensidad.",
    image: imgCross,
    coachImage: coachMaria, // Recuerda importar a Javier si tienes su foto
    contact: "+34 600 11 11 11",
  },
  {
    id: 5,
    name: "PILATES",
    coach: "Ana Morandeira",
    description:
      "Centrado en el control postural, la respiración y la flexibilidad.",
    image: imgPilates,
    coachImage: coachMaria, // Recuerda importar a Ana si tienes su foto
    contact: "+34 600 22 22 22",
  },
  {
    id: 6,
    name: "ZUMBA",
    coach: "Alberto García",
    description: "Disciplina fitness que combina baile con rutinas aeróbicas.",
    image: imgZumba,
    coachImage: coachRoberto,
    contact: "+34 600 33 33 33",
  },
];

function Activities(){
    return(
<div className="w-full min-h-screen bg-[#0A0A0A] p-6 flex flex-col items-center overflow-x-hidden">
      <div className="max-w-[1100px] w-full">
        <h1 className="text-[#CCFF00] text-5xl font-black uppercase italic mb-16 border-l-8 border-[#CCFF00] pl-6">
          ACTIVIDADES
        </h1>
        {/* Grid de 2 columnas para el diseño horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {misActividades.map((act) => (
            <ActivityCard key={act.id} {...act} />
          ))}
        </div>
      </div>
    </div>
    )
}
export default Activities;