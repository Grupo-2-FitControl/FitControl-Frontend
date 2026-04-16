import ActivityCard from "../../components/Activity/ActivityCard";
import React, { useState } from "react";
import {
  ArrowPathIcon,
  XMarkIcon,
  CheckIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import imgCircuit from "../../assets/circuit.png";
import imgCross from "../../assets/CrossTraining.jpg";
import imgPilates from "../../assets/pilates.png";
import imgZumba from "../../assets/zumba.png";
import coachMelissa from "../../assets/Melissa.png";
import coachMaria from "../../assets/maria regueiro.png";
import coachAlberto2 from "../../assets/alberto2.png";
import coachJavier from "../../assets/javier.png";
import coachAna from "../../assets/ana.png";
import imgBike from "../../assets/Bike.png";
import imgAquafit from "../../assets/Aquafit.png";
import coachAlberto from "../../assets/alberto.png";

const misActividades = [
  {
    id: 1,
    name: "AQUAFIT",
    coach: "Maria Regueiro",
    description:
      "Mejora la resistencia natural del agua para fortalecer la musculatura.",
    image: imgAquafit,
    coachImage: coachMaria,
    contact: "+34 642 81 54",
  },
  {
    id: 2,
    name: "BIKE",
    coach: "Melissa Gómez",
    description:
      "Entrenamiento cardiovascular diseñado para fortalecer el tren inferior.",
    image: imgBike,
    coachImage: coachMelissa,
    contact: "+34 624 39 42 61",
  },

  {
    id: 3,
    name: "CIRCUIT",
    coach: "Alberto García",
    description:
      "Circuito de alta intensidad por estaciones para trabajo metabólico.",
    image: imgCircuit,
    coachImage: coachAlberto2,
    contact: "+34 600 00 00 00",
  },
  {
    id: 4,
    name: "CROSS TRAINING",
    coach: "Javier Galván",
    description: "Entrenamiento funcional variado ejecutado a alta intensidad.",
    image: imgCross,
    coachImage: coachJavier,
    contact: "+34 600 11 11 11",
  },
  {
    id: 5,
    name: "PILATES",
    coach: "Ana Morandeira",
    description:
      "Centrado en el control postural, la respiración y la flexibilidad.",
    image: imgPilates,
    coachImage: coachAna,
    contact: "+34 600 22 22 22",
  },
  {
    id: 6,
    name: "ZUMBA",
    coach: "Alberto García",
    description: "Disciplina fitness que combina baile con rutinas aeróbicas.",
    image: imgZumba,
    coachImage: coachAlberto,
    contact: "+34 600 33 33 33",
  },
];

function Activities() {
  const [nuevaActividad, setNuevaActividad] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    fecha: "",
    profesorId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaActividad({ ...nuevaActividad, [name]: value });
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] p-6 flex flex-col items-center overflow-x-hidden">
      <div className="max-w-[1100px] w-full">
        <h1 className="text-[#CCFF00] text-5xl font-black uppercase italic mb-16 border-l-8 border-[#CCFF00] pl-6">
          ACTIVIDADES
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="mb-8 w-12 h-12 flex items-center justify-center bg-[#CCFF00] hover:bg-[#b8e600] rounded-full text-black shadow-lg transition-transform active:scale-95"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {misActividades.map((act) => (
            <ActivityCard key={act.id} {...act} />
          ))}
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1A1A1A] p-8 rounded-sm w-full max-w-xl border border-zinc-800 shadow-2xl">
              <h2 className="text-[#CCFF00] font-bold text-xl mb-8 uppercase tracking-tight italic">
                Registrar Nueva Actividad
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[#CCFF00] text-[10px] font-bold uppercase">
                      Título *
                    </label>
                    <input
                      type="text"
                      className="bg-zinc-800/50 border border-[#CCFF00] p-3 text-white text-sm outline-none focus:ring-1 focus:ring-[#CCFF00] focus:border-[#CCFF00] transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#CCFF00] text-[10px] font-bold uppercase">
                      Título *
                    </label>
                    <input
                      type="text"
                      className="bg-zinc-800/50 border border-[#CCFF00] p-3 text-white text-sm outline-none focus:ring-1 focus:ring-[#CCFF00] transition rounded-md"
                      name="titulo"
                      placeholder="Título *"
                      value={nuevaActividad.titulo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[#CCFF00] text-[10px] font-bold uppercase">
                    Descripción
                  </label>
                  <textarea
                    className="bg-zinc-800/50 border border-zinc-700 p-3 text-white text-sm outline-none rounded-md"
                    name="descripcion" // CAMBIADO
                    value={nuevaActividad.descripcion} // CAMBIADO
                    onChange={handleChange}
                    rows="3"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[#CCFF00] text-[10px] font-bold uppercase">
                    Precio *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="bg-zinc-800/50 border border-[#CCFF00] p-3 text-white text-sm outline-none rounded-md"
                    name="precio"
                    placeholder="0.00"
                    value={nuevaActividad.precio}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[#CCFF00] text-[10px] font-bold uppercase">
                      Fecha y Hora *
                    </label>
                    <input
                      type="datetime-local"
                      className="bg-zinc-800/50 border border-zinc-700 p-3 text-white text-sm outline-none focus:border-[#CCFF00] transition [color-scheme:dark]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#CCFF00] text-[10px] font-bold uppercase">
                      Profesor *
                    </label>
                    <select
                      name="profesorId"
                      value={nuevaActividad.profesorId}
                      onChange={handleChange}
                      className="bg-zinc-800/50 border border-[#CCFF00] p-3 text-white text-sm outline-none rounded-md"
                      required
                    >
                      <option value="">Selecciona un profesor</option>
                      {/* Estos valores vendrán luego del GET /profesores */}
                      <option value="1">Profesor Ejemplo 1</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-8 pt-6">
                  <button
                    type="button"
                    className="bg-zinc-800 p-3 rounded hover:bg-zinc-700 transition"
                  >
                    <ArrowPathIcon className="w-6 h-6 text-[#CCFF00]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-zinc-800 p-3 rounded hover:bg-zinc-700 transition"
                  >
                    <XMarkIcon className="w-6 h-6 text-zinc-400" />
                  </button>

                  <button
                    type="submit"
                    className="bg-[#CCFF00] p-3 rounded hover:bg-white transition shadow-[0_0_10px_rgba(204,255,0,0.2)]"
                  >
                    <CheckIcon className="w-6 h-6 text-black stroke-[3]" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Activities;
