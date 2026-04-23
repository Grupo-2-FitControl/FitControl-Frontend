import React, {useState, useEffect} from "react";
import {PlusIcon, CheckIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {activityService} from "../../services/activityService";
import {teacherService} from "../../services/teacherService";
import {userService} from "../../services/userService";
import ActivityCard from "../../components/Activity/ActivityCard";
import imgCross from "../../assets/CrossTraining.jpg";

const misActividades = [
  {
    id: 1,
    name: "AQUAFIT",
    coach: "Maria Regueiro",
    description: "Mejora la resistencia natural del agua para fortalecer la musculatura.",
    image: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163268/aquafit5_oshqtk.jpg",
    coachImage: "https://res.cloudinary.com/dltofstl9/image/upload/v1776166672/Maria_z1drrf.png",
    contact: "+34 642 81 54",
  },
  {
    id: 2,
    name: "BIKE",
    coach: "Melissa Gómez",
    description: "Entrenamiento cardiovascular diseñado para fortalecer el tren inferior.",
    image: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163273/bike5_zgrkiy.jpg",
    coachImage: "https://res.cloudinary.com/dltofstl9/image/upload/v1776166674/Melissa_r6i9cr.png",
    contact: "+34 624 39 42 61",
  },
  {
    id: 3,
    name: "CIRCUIT",
    coach: "Alberto García",
    description: "Circuito de alta intensidad por estaciones para trabajo metabólico.",
    image: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163277/circuit3_th150p.jpg",
    coachImage: "https://res.cloudinary.com/dltofstl9/image/upload/v1776166675/Alberto_dtofxc.png",
    contact: "+34 600 00 00 00",
  },
  {
    id: 4,
    name: "CROSS TRAINING",
    coach: "Javier Galván",
    description: "Entrenamiento funcional variado ejecutado a alta intensidad.",
    image: imgCross,
    coachImage: "https://res.cloudinary.com/dltofstl9/image/upload/v1776166673/Javier_wx64jj.png",
    contact: "+34 600 11 11 11",
  },
  {
    id: 5,
    name: "PILATES",
    coach: "Ana Morandeira",
    description: "Centrado en el control postural, la respiración y la flexibilidad.",
    image: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163290/pilates4_r2khyu.jpg",
    coachImage: "https://res.cloudinary.com/dltofstl9/image/upload/v1776166671/Ana_tsudsq.png",
    contact: "+34 600 22 22 22",
  },
  {
    id: 6,
    name: "ZUMBA",
    coach: "Alberto García",
    description: "Disciplina fitness que combina baile con rutinas aeróbicas.",
    image: "https://res.cloudinary.com/dltofstl9/image/upload/v1776167754/Zumba4_ua4xue.jpg",
    coachImage: "https://res.cloudinary.com/dltofstl9/image/upload/v1776166675/Alberto_dtofxc.png",
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
    imagenUrl: "",
    horario: "",
    capacidad: "",
  });
  const [profesores, setProfesores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activities, setActivities] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userActivitiesMap, setUserActivitiesMap] = useState({});

  const cargarActividades = async () => {
    try {
      const [data, teachers, users] = await Promise.all([
        activityService.getAll(), 
        teacherService.getAll(),
        userService.getAll()
      ]);

      const userActsMap = {};
      for (const user of users) {
        try {
          const acts = await userService.getEnrolledActivities(user.id);
          userActsMap[user.id] = acts || [];
        } catch {
          userActsMap[user.id] = [];
        }
      }
      setUserActivitiesMap(userActsMap);

      const teachersMap = {};
      teachers.forEach((t) => {
        teachersMap[t.id] = t;
      });

      let alertMessage = "";

      const actividadesFormateadas = await Promise.all(
        data.map(async (act) => {
          const teacher = teachersMap[act.teacherId] || {};
          let enrolledUsers = [];
          try {
            enrolledUsers = await activityService.getEnrolledUsers(act.id) || [];
          } catch {
            console.warn("No se pudieron cargar usuarios inscritos para actividad", act.id);
          }
          
          if (act.teacherId && teacher.isActive === false) {
            alertMessage += `• "${act.title || act.name}" tenía asignado al profesor inactivo "${teacher.name}". Se ha desasignado.\n`;
            try {
              await activityService.update(act.id, { teacherId: null });
            } catch {}
            return {
              ...act,
              teacherId: null,
              name: act.title || act.name,
              image: act.imageUrl,
              coach: "Sin asignar",
              contact: "",
              coachImage: "",
              capacity: act.capacity || 20,
              enrolledCount: enrolledUsers.length,
              enrolledUsers: enrolledUsers,
              schedule: act.schedule || "",
              price: act.price || 0,
            };
          }
          
          return {
            ...act,
            name: act.title || act.name,
            image: act.imageUrl,
            coach: act.teacherName || teacher.name || "Sin asignar",
            contact: "",
            coachImage: teacher.imageUrl || "",
            capacity: act.capacity || 20,
            enrolledCount: enrolledUsers.length,
            enrolledUsers: enrolledUsers,
            schedule: act.schedule || "",
            price: act.price || 0,
          };
        })
      );
      setActivities(actividadesFormateadas);
      setProfesores(teachers);
      setAllUsers(users);
      
      if (alertMessage) {
        alert("ACTIVIDADES SIN PROFESOR:\n\n" + alertMessage + "\nAsigna un nuevo profesor activo a estas actividades.");
      }
    } catch (error) {
      console.error("Error al traer actividades:", error.message);
    }
  };

  useEffect(() => {
    cargarActividades();
  }, []);

  // --- LÓGICA DE FILTRADO CORREGIDA ---
  const filteredActivities = (activities.length > 0 ? activities : misActividades)
    .filter((act) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (act.title || act.name)?.toLowerCase().includes(term) || act.description?.toLowerCase().includes(term);
    })
    .sort((a, b) => (a.title || a.name || "").localeCompare(b.title || b.name || ""));

  const handleDeleteActivity = async (id) => {
    if (!window.confirm("¿Eliminar esta actividad?")) return;
    try {
      await activityService.delete(id);
      setActivities(activities.filter((a) => a.id !== id));
      alert("Actividad eliminada");
    } catch (error) {
      alert("Error al eliminar: " + error.message);
    }
  };

  const handleEditActivity = (id) => {
    const activity = activities.find((a) => a.id === id);
    if (activity) {
      setEditingId(id);
      setNuevaActividad({
        titulo: activity.title || activity.name || "",
        descripcion: activity.description || "",
        precio: activity.price?.toString() || "",
        fecha: activity.startDate || "",
        profesorId: activity.teacherId?.toString() || "",
        imagenUrl: activity.imageUrl || "",
        horario: activity.schedule || "",
        capacidad: activity.capacity?.toString() || "",
      });
      const teacher = profesores.find(p => p.id === activity.teacherId);
      if (teacher && teacher.isActive === false) {
        alert(`AVISO: El profesor "${teacher.name}" está inactivo. La actividad se quedará sin profesor asignado.`);
      }
      setShowModal(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const selectedTeacher = profesores.find(p => p.id === parseInt(nuevaActividad.profesorId));
    if (!selectedTeacher) {
      alert("Debes seleccionar un profesor");
      return;
    }
    if (selectedTeacher.isActive === false) {
      alert("No se puede asignar una actividad a un profesor inactivo");
      return;
    }
    if (editingId) {
      const originalActivity = activities.find(a => a.id === editingId);
      if (originalActivity?.teacherId !== parseInt(nuevaActividad.profesorId)) {
        const originalTeacher = profesores.find(p => p.id === originalActivity?.teacherId);
        if (originalTeacher && originalTeacher.isActive === false) {
          if (!window.confirm(`El profesor "${originalTeacher.name}" está inactivo. ¿Deseas dejar la actividad sin profesor?`)) {
            return;
          }
        }
      }
    }
    
    try {
      const payload = {
        title: nuevaActividad.titulo,
        name: nuevaActividad.titulo,
        description: nuevaActividad.descripcion,
        schedule: nuevaActividad.horario || "Horario por definir",
        price: parseFloat(nuevaActividad.precio) || 0,
        capacity: parseInt(nuevaActividad.capacidad) || 20,
        startDate: nuevaActividad.fecha,
        teacherId: parseInt(nuevaActividad.profesorId),
        imageUrl: nuevaActividad.imagenUrl,
        isActive: true,
      };

      if (editingId) {
        await activityService.update(editingId, payload);
        alert("¡Actividad actualizada!");
      } else {
        await activityService.create(payload);
        alert("¡Actividad guardada!");
      }
      setShowModal(false);
      setEditingId(null);
      setNuevaActividad({
        titulo: "",
        descripcion: "",
        precio: "",
        fecha: "",
        profesorId: "",
        imagenUrl: "",
        horario: "",
        capacidad: "",
      });
      cargarActividades();
    } catch (error) {
      alert("Fallo al guardar: " + error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] p-6 flex flex-col items-center overflow-x-hidden">
      <div className="max-w-[1100px] w-full">
        <h1 className="w-full text-[#CCFF00] text-5xl font-black uppercase italic mb-16 border-l-8 border-[#CCFF00] pl-6">
          ACTIVIDADES
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 w-full">
          <div className="relative w-full md:max-w-md group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 group-focus-within:text-[#CCFF00] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="BUSCAR ACTIVIDAD..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] outline-none transition-all placeholder:text-gray-600"
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="group relative flex items-center justify-center 
            bg-[#CCFF00] hover:bg-[#b8e600] text-black 
            w-12 h-12 rounded-xl transition-all 
            hover:scale-110 active:scale-95 
            shadow-[0_0_20px_rgba(204,255,0,0.2)] z-10"
          >
            <PlusIcon className="w-6 h-6" />
            <span
              className=" block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
            bg-gray-800 text-white text-xs px-2 py-1 rounded 
            opacity-0 group-hover:opacity-100 transition z-50 whitespace-nowrap"
            >
              Nueva Actividad
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((act) => (
              <ActivityCard
                key={act.id}
                id={act.id}
                name={act.title || act.name}
                {...act}
                allUsers={allUsers}
                userActivitiesMap={userActivitiesMap}
                onEdit={handleEditActivity}
                onDelete={handleDeleteActivity}
                onEnrollSuccess={cargarActividades}
              />
            ))
          ) : (
            <p className="text-white text-center col-span-full opacity-50">
              No se encontraron actividades que coincidan con "{searchTerm}"
            </p>
          )}
        </div>

        {/* MODAL (Se mantiene igual) */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#1A1A1A] p-8 rounded-xl w-full max-w-xl border-2 border-transparent transition-all duration-300 hover:border-[#CCFF00]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[#CCFF00] text-2xl font-bold uppercase tracking-wider">
                  {nuevaActividad.titulo ? "Editar Actividad" : "Nueva Actividad"}
</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-1 uppercase">Título</label>
                  <input
                    type="text"
                    required
                    value={nuevaActividad.titulo}
                    onChange={(e) => setNuevaActividad({...nuevaActividad, titulo: e.target.value})}
                    className="w-full bg-[#262626] border border-gray-800 rounded-lg p-2 text-white focus:border-[#CCFF00] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-1 uppercase">Descripción</label>
                  <textarea
                    value={nuevaActividad.descripcion}
                    onChange={(e) => setNuevaActividad({...nuevaActividad, descripcion: e.target.value})}
                    className="w-full bg-[#262626] border border-gray-800 rounded-lg p-2 text-white focus:border-[#CCFF00] outline-none h-20"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-1 uppercase">URL de Imagen *</label>
                  <input
                    type="url"
                    value={nuevaActividad.imagenUrl}
                    onChange={(e) => setNuevaActividad({...nuevaActividad, imagenUrl: e.target.value})}
                    placeholder="https://res.cloudinary.com/... (opcional)"
                    className="w-full bg-[#262626] border border-gray-800 rounded-lg p-2 text-white focus:border-[#CCFF00] outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-bold mb-1 uppercase">Precio</label>
                    <input
                      type="number"
                      required
                      value={nuevaActividad.precio}
                      onChange={(e) => setNuevaActividad({...nuevaActividad, precio: e.target.value})}
                      className="w-full bg-[#262626] border border-gray-800 rounded-lg p-2 text-white focus:border-[#CCFF00] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-bold mb-1 uppercase">Fecha</label>
                    <input
                      type="datetime-local"
                      required
                      value={nuevaActividad.fecha}
                      onChange={(e) => setNuevaActividad({...nuevaActividad, fecha: e.target.value})}
                      className="w-full bg-[#262626] border border-gray-800 rounded-lg p-2 text-white focus:border-[#CCFF00] outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-bold mb-1 uppercase">Horario</label>
                    <select
                      value={nuevaActividad.horario}
                      onChange={(e) => setNuevaActividad({...nuevaActividad, horario: e.target.value})}
                      className="w-full bg-[#262626] border border-gray-800 rounded-lg p-2 text-white focus:border-[#CCFF00] outline-none"
                    >
                      <option value="">Seleccionar horario</option>
                      <option value="Lunes 08:00">Lunes 08:00</option>
                      <option value="Lunes 09:30">Lunes 09:30</option>
                      <option value="Lunes 11:00">Lunes 11:00</option>
                      <option value="Lunes 12:30">Lunes 12:30</option>
                      <option value="Lunes 17:00">Lunes 17:00</option>
                      <option value="Lunes 18:30">Lunes 18:30</option>
                      <option value="Lunes 20:00">Lunes 20:00</option>
                      <option value="Martes 08:00">Martes 08:00</option>
                      <option value="Martes 09:30">Martes 09:30</option>
                      <option value="Martes 11:00">Martes 11:00</option>
                      <option value="Martes 12:30">Martes 12:30</option>
                      <option value="Martes 17:00">Martes 17:00</option>
                      <option value="Martes 18:30">Martes 18:30</option>
                      <option value="Martes 20:00">Martes 20:00</option>
                      <option value="Miércoles 08:00">Miércoles 08:00</option>
                      <option value="Miércoles 09:30">Miércoles 09:30</option>
                      <option value="Miércoles 11:00">Miércoles 11:00</option>
                      <option value="Miércoles 12:30">Miércoles 12:30</option>
                      <option value="Miércoles 17:00">Miércoles 17:00</option>
                      <option value="Miércoles 18:30">Miércoles 18:30</option>
                      <option value="Miércoles 20:00">Miércoles 20:00</option>
                      <option value="Jueves 08:00">Jueves 08:00</option>
                      <option value="Jueves 09:30">Jueves 09:30</option>
                      <option value="Jueves 11:00">Jueves 11:00</option>
                      <option value="Jueves 12:30">Jueves 12:30</option>
                      <option value="Jueves 17:00">Jueves 17:00</option>
                      <option value="Jueves 18:30">Jueves 18:30</option>
                      <option value="Jueves 20:00">Jueves 20:00</option>
                      <option value="Viernes 08:00">Viernes 08:00</option>
                      <option value="Viernes 09:30">Viernes 09:30</option>
                      <option value="Viernes 11:00">Viernes 11:00</option>
                      <option value="Viernes 12:30">Viernes 12:30</option>
                      <option value="Viernes 17:00">Viernes 17:00</option>
                      <option value="Viernes 18:30">Viernes 18:30</option>
                      <option value="Viernes 20:00">Viernes 20:00</option>
                      <option value="Sábado 09:00">Sábado 09:00</option>
                      <option value="Sábado 10:30">Sábado 10:30</option>
                      <option value="Sábado 12:00">Sábado 12:00</option>
                      <option value="Domingo 10:00">Domingo 10:00</option>
                      <option value="Domingo 12:00">Domingo 12:00</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-bold mb-1 uppercase">Capacidad</label>
                    <input
                      type="number"
                      value={nuevaActividad.capacidad}
                      onChange={(e) => setNuevaActividad({...nuevaActividad, capacidad: e.target.value})}
                      placeholder="20"
                      className="w-full bg-[#262626] border border-gray-800 rounded-lg p-2 text-white focus:border-[#CCFF00] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-1 uppercase">Profesor *</label>
                  <select
                    required
                    value={nuevaActividad.profesorId}
                    onChange={(e) => setNuevaActividad({...nuevaActividad, profesorId: e.target.value})}
                    className="w-full bg-[#262626] border border-gray-800 rounded-lg p-2 text-white focus:border-[#CCFF00] outline-none"
                  >
                    <option value="">Seleccionar profesor</option>
                    {profesores
                      .filter((p) => p.isActive !== false)
                      .sort((a, b) => (a.name || "").localeCompare(b.name || ""))
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                  </select>
                  {nuevaActividad.profesorId && !profesores.find(p => p.id === parseInt(nuevaActividad.profesorId) && p.isActive !== false) && (
                    <p className="text-red-500 text-xs mt-1">Este profesor está inactivo. Selecciona uno activo.</p>
                  )}
                </div>
                <div className="flex justify-end gap-6 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingId(null);
                      setNuevaActividad({
                        titulo: "",
                        descripcion: "",
                        precio: "",
                        fecha: "",
                        profesorId: "",
                        imagenUrl: "",
                        horario: "",
                        capacidad: "",
                      });
                    }}
                    className="group relative text-gray-500 hover:text-red-500"
                  >
                    <XMarkIcon className="w-8 h-8" />
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                      bg-black text-white text-xs px-3 py-1.5 rounded font-medium
                      opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                      Cancelar
                    </span>
                  </button>
                  <button type="submit" className="group relative text-gray-500 hover:text-[#CCFF00]">
                    <CheckIcon className="w-8 h-8" />
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                      bg-black text-white text-xs px-3 py-1.5 rounded font-medium
                      opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                      Guardar
                    </span>
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
