import React from "react";
import ActivityCard from "./components/ActivityCard";

// Importaciones de imágenes (según tu explorador de archivos)
import imgCircuit from "./assets/circuit.png";
import imgCross from "./assets/CrossTraining.jpg";
import imgPilates from "./assets/pilates.png";
import imgZumba from "./assets/zumba.png";
import coachMelissa from "./assets/Melissa.png";
import coachMaria from "./assets/maria regueiro.png";
import coachRoberto from "./assets/alberto.png";

function App() {
  const misActividades = [
    { id: 1, name: "BIKE", coach: "Melissa Gómez", description: "Entrenamiento cardiovascular intenso.", contact: "+34 624 39 42 61", image: imgCross, coachImage: coachMelissa },
    { id: 2, name: "AQUAFIT", coach: "Maria Regueiro", description: "Mejora la resistencia sin impacto.", contact: "+34 600 00 00 00", image: imgCircuit, coachImage: coachMaria },
    { id: 3, name: "CIRCUIT", coach: "Roberto Alberto", description: "Circuito de alta intensidad.", contact: "+34 600 00 00 00", image: imgCircuit, coachImage: coachRoberto },
    { id: 4, name: "CROSS", coach: "Javier", description: "Entrenamiento funcional variado.", contact: "+34 600 00 00 00", image: imgCross, coachImage: imgCross },
  ];

  return (
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
  );
}

// ESTA LÍNEA ES LA QUE FALTA Y CAUSA LA PANTALLA BLANCA
export default App;