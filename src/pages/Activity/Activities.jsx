import React, { useState, useEffect } from "react";
import { CheckIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { activityService } from "../../services/activityService";
import ActivityCard from "../../components/Activity/ActivityCard";
import imgCross from "../../assets/CrossTraining.jpg";
const misActividades = [
  {
    id: 1,
    name: "AQUAFIT",
    coach: "Maria Regueiro",
    description:
      "Mejora la resistencia natural del agua para fortalecer la musculatura.",
    image:
      "https://res.cloudinary.com/dltofstl9/image/upload/v1776163268/aquafit5_oshqtk.jpg",
    coachImage:
      "https://res.cloudinary.com/dltofstl9/image/upload/v1776166672/Maria_z1drrf.png",
    contact: "+34 642 81 54",
  },
  {
    id: 2,
    name: "BIKE",
    coach: "Melissa Gómez",
    description:
      "Entrenamiento cardiovascular diseñado para fortalecer el tren inferior.",
    image:
      "https://res.cloudinary.com/dltofstl9/image/upload/v1776163273/bike5_zgrkiy.jpg",
    coachImage:
      "https://res.cloudinary.com/dltofstl9/image/upload/v1776166674/Melissa_r6i9cr.png",
    contact: "+34 624 39 42 61",
  },
  {
    id: 3,
    name: "CIRCUIT",
    coach: "Alberto García",
    description:
      "Circuito de alta intensidad por estaciones para trabajo metabólico.",
    image:
      "https://res.cloudinary.com/dltofstl9/image/upload/v1776163277/circuit3_th150p.jpg",
    coachImage:
      "https://res.cloudinary.com/dltofstl9/image/upload/v1776166675/Alberto_dtofxc.png",
    contact: "+34 600 00 00 00",
  },
  {
    id: 4,
    name: "CROSS TRAINING",
    coach: "Javier Galván",
    description: "Entrenamiento funcional variado ejecutado a alta intensidad.",
    image: imgCross,
    coachImage:
      "https://res.cloudinary.com/dltofstl9/image/upload/v1776166673/Javier_wx64jj.png",
    contact: "+34 600 11 11 11",
  },
  {
    id: 5,
    name: "PILATES",
    coach: "Ana Morandeira",
    description:
      "Centrado en el control postural, la respiración y la flexibilidad.",
    image:
      "https://res.cloudinary.com/dltofstl9/image/upload/v1776163290/pilates4_r2khyu.jpg",
    coachImage:
      "https://res.cloudinary.com/dltofstl9/image/upload/v1776166671/Ana_tsudsq.png",
    contact: "+34 600 22 22 22",
  },
  {
    id: 6,
    name: "ZUMBA",
    coach: "Alberto García",
    description: "Disciplina fitness que combina baile con rutinas aeróbicas.",
    image:
      "https://res.cloudinary.com/dltofstl9/image/upload/v1776167754/Zumba4_ua4xue.jpg",
    coachImage:
      "https://res.cloudinary.com/dltofstl9/image/upload/v1776166675/Alberto_dtofxc.png",
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
  const [profesores, setProfesores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // --- LÓGICA DE SERVICIO ---
  const [activities, setActivities] = useState([]);

  const cargarActividades = async () => {
    try {
      const data = await activityService.getAll();
      setActivities(data);
    } catch (error) {
      console.error("Error al traer actividades:", error.message);
    }
  };

  useEffect(() => {
    cargarActividades();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: nuevaActividad.titulo,
        description: nuevaActividad.descripcion,
        schedule: "Horario por definir", // Puedes añadir un input para esto luego
        capacity: parseInt(nuevaActividad.precio) || 0,
        startDate: nuevaActividad.fecha,
        teacherId: parseInt(nuevaActividad.profesorId),
        isActive: true,
      };

      await activityService.create(payload);

      alert("¡Actividad guardada!");
      setShowModal(false);
      cargarActividades(); // Refrescamos la lista
    } catch (error) {
      alert("Fallo al guardar: " + error.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaActividad({ ...nuevaActividad, [name]: value });
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] p-6 flex flex-col items-center overflow-x-hidden">
      <div className="max-w-[1100px] w-full">
        <h1 className="text-[#CCFF00] text-5xl font-black uppercase italic mb-16 border-l-8 border-[#CCFF00] pl-6">
          ACTIVIDADES
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 w-full">
  <div className="relative w-full md:max-w-md group">
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
      <svg className="w-5 h-5 text-gray-500 group-focus-within:text-[#CCFF00] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      placeholder="BUSCAR ACTIVIDAD..."
      className="w-full bg-[#111] border border-gray-800 text-white text-[10px] font-bold tracking-widest rounded-xl py-4 pl-12 pr-4 outline-none focus:border-[#CCFF00] focus:shadow-[0_0_15px_rgba(204,255,0,0.1)] transition-all uppercase"
      onChange={(e) => setSearchTerm(e.target.value)} 
    />
  </div>

  <button 
    onClick={() => setShowModal(true)}
    className="flex items-center justify-center bg-[#CCFF00] hover:bg-[#b8e600] text-black w-12 h-12 rounded-xl transition-all hover:scale-110 shadow-[0_0_20px_rgba(204,255,0,0.2)] active:scale-95"
  >
    <PlusIcon className="w-6 h-6" />
  </button>
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {misActividades.map((act) => (
            <ActivityCard key={act.id} id={act.id} {...act} />
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#1A1A1A] p-8 rounded-xl w-full max-w-xl border-2 border-transparent transition-all duration-300 hover:border-[#CCFF00] hover:shadow-[0_0_30px_rgba(204,255,0,0.3)]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[#CCFF00] text-2xl font-bold uppercase tracking-wider">
                  Nueva Actividad
                </h2>

                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-1 uppercase">
                    Título
                  </label>
                  <input
                    type="text"
                    required
                    value={nuevaActividad.titulo}
                    onChange={(e) =>
                      setNuevaActividad({
                        ...nuevaActividad,
                        titulo: e.target.value,
                      })
                    }
                    className="w-full bg-[#262626] border border-gray-800 rounded-lg p-2 text-white focus:border-[#CCFF00] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-1 uppercase">
                    Descripción
                  </label>
                  <textarea
                    value={nuevaActividad.descripcion}
                    onChange={(e) =>
                      setNuevaActividad({
                        ...nuevaActividad,
                        descripcion: e.target.value,
                      })
                    }
                    className="w-full bg-[#262626] border border-gray-800 rounded-lg p-2 text-white focus:border-[#CCFF00] outline-none h-20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-bold mb-1 uppercase">
                      Precio
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={nuevaActividad.precio}
                      onChange={(e) =>
                        setNuevaActividad({
                          ...nuevaActividad,
                          precio: e.target.value,
                        })
                      }
                      className="w-full bg-[#262626] border border-gray-800 rounded-lg p-2 text-white focus:border-[#CCFF00] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-bold mb-1 uppercase">
                      Fecha y Hora
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={nuevaActividad.fecha}
                      onChange={(e) =>
                        setNuevaActividad({
                          ...nuevaActividad,
                          fecha: e.target.value,
                        })
                      }
                      className="w-full bg-[#262626] border border-gray-800 rounded-lg p-2 text-white focus:border-[#CCFF00] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-1 uppercase">
                    Profesor
                  </label>
                  <select
                    required
                    value={nuevaActividad.profesorId}
                    onChange={(e) =>
                      setNuevaActividad({
                        ...nuevaActividad,
                        profesorId: e.target.value,
                      })
                    }
                    className="w-full bg-[#262626] border border-gray-800 rounded-lg p-2 text-white focus:border-[#CCFF00] outline-none"
                  >
                    <option value="">Selecciona un profesor</option>
                    {profesores.map((prof) => (
                      <option key={prof.id} value={prof.id}>
                        {prof.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end items-center gap-6 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-red-500 transition-all duration-300 transform hover:scale-125 p-2"
                    title="Cancelar"
                  >
                    <span className="text-3xl font-light">&times;</span>
                  </button>

                  <button
                    type="submit"
                    className="text-gray-500 hover:text-[#CCFF00] transition-all duration-300 transform hover:scale-125 p-2"
                  >
                    <CheckIcon className="w-8 h-8" />
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
