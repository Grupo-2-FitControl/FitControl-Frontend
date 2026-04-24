import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { XMarkIcon, UserPlusIcon, CheckIcon, UserIcon } from "@heroicons/react/24/outline";
import { userService } from "../../services/userService";
import { activityService } from "../../services/activityService";

const DATOS_BENEFICIOS = {
  1: [
    {
      id: "a1",
      titulo: "Resistencia",
      desc: "Mejora tu capacidad cardiovascular bajo el agua.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163262/aquafit1_f9vtjs.jpg",
    },
    {
      id: "a2",
      titulo: "Tonificación",
      desc: "Define músculos sin impacto en las articulaciones.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163263/aquafit2_cx2bmm.jpg",
    },
    {
      id: "a3",
      titulo: "Bajo Impacto",
      desc: "Ideal para proteger huesos y rodillas.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163266/aquafit4_ynyagb.jpg",
    },
    {
      id: "a4",
      titulo: "Quema Calórica",
      desc: "Alto gasto energético por la resistencia del agua.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163264/aquafit3_rpgzes.jpg",
    },
    {
      id: "a5",
      titulo: "Salud Mental",
      desc: "El medio acuático reduce el estrés y la ansiedad.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163269/aquafit6_wau1xt.jpg",
    },
  ],
  2: [
    {
      id: "b1",
      titulo: "Potencia de Piernas",
      desc: "Fortalece cuádriceps, glúteos y pantorrillas.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163270/bike1_cdsgsw.jpg",
    },
    {
      id: "b2",
      titulo: "Cardio Intenso",
      desc: "Quema grasa de forma masiva en cada sesión.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163271/bike2_mxz8nx.jpg",
    },
    {
      id: "b3",
      titulo: "Resistencia",
      desc: "Aumenta tu estamina y aguante físico.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163272/bike3_sebpzs.jpg",
    },
    {
      id: "b4",
      titulo: "Salud Cardíaca",
      desc: "Mantiene tu corazón fuerte y saludable.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163274/bike6_nanzbz.jpg",
    },
    {
      id: "b5",
      titulo: "Energía Pura",
      desc: "Libera endorfinas con música a tope de motivación.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163272/bike4_dbpcle.jpg",
    },
  ],
  3: [
    {
      id: "ci1",
      titulo: "Variedad",
      desc: "Diferentes estaciones para un entreno completo.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163275/circuit1_czng8w.jpg",
    },
    {
      id: "ci2",
      titulo: "Eficiencia",
      desc: "Mucho trabajo muscular en muy poco tiempo.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163276/circuit2_yvjaye.jpg",
    },
    {
      id: "ci3",
      titulo: "Fuerza y Cardio",
      desc: "Combina lo mejor de ambos mundos en una sesión.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163281/circuit6_sq2ftk.jpg",
    },
    {
      id: "ci4",
      titulo: "Dinámico",
      desc: "Mejora tu ritmo de trabajo sin pausas largas.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163280/circuit5_bbvbqo.jpg",
    },
    {
      id: "ci5",
      titulo: "Adaptable",
      desc: "Perfecto para todos los niveles de condición física.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163279/circuit4_zbfwyy.jpg",
    },
  ],
  4: [
    {
      id: "ct1",
      titulo: "Fuerza Funcional",
      desc: "Entrena movimientos útiles para tu vida diaria.",
      img: "URL",
    },
    {
      id: "ct2",
      titulo: "Alta Intensidad",
      desc: "Aumenta tu metabolismo basal rápidamente.",
      img: "URL",
    },
    {
      id: "ct3",
      titulo: "Cuerpo Completo",
      desc: "No dejes ni un solo músculo sin trabajar.",
      img: "URL",
    },
    {
      id: "ct4",
      titulo: "Agilidad",
      desc: "Mejora tu coordinación y rapidez de reacción.",
      img: "URL",
    },
    {
      id: "ct5",
      titulo: "Superación",
      desc: "Rétate a ti misma en cada entrenamiento (WOD).",
      img: "URL",
    },
  ],
  5: [
    {
      id: "p1",
      titulo: "Core de Hierro",
      desc: "Fortalece tu zona abdominal y lumbar profundamente.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163288/pilates2_ynh6sg.jpg",
    },
    {
      id: "p2",
      titulo: "Postura",
      desc: "Aprende a alinear tu cuerpo y evitar dolores.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163287/pilates1_fna4to.jpg",
    },
    {
      id: "p3",
      titulo: "Flexibilidad",
      desc: "Estira tus músculos de forma consciente y segura.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163289/pilates3_bjgb9q.jpg",
    },
    {
      id: "p4",
      titulo: "Control Mental",
      desc: "Precisión total en cada uno de tus movimientos.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163291/pilates5_e93otu.jpg",
    },
    {
      id: "p5",
      titulo: "Prevención",
      desc: "Evita lesiones futuras fortaleciendo estabilizadores.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776163292/pilates6_dt4lob.jpg",
    },
  ],
  6: [
    {
      id: "z1",
      titulo: "Quema Bailando",
      desc: "Pierde calorías mientras te diviertes al máximo.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776167762/Zumba1_rxa1ll.png",
    },
    {
      id: "z2",
      titulo: "Coordinación",
      desc: "Mejora tu ritmo y agilidad corporal con música.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776167760/Zumba2_jibxc8.webp",
    },
    {
      id: "z3",
      titulo: "Felicidad",
      desc: "Libera tensiones y mejora tu estado de ánimo.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776167755/Zumba5_uklin4.avif",
    },
    {
      id: "z4",
      titulo: "Social",
      desc: "Entrena en un ambiente de comunidad y alegría.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776167757/zumba6_smwfvy.jpg",
    },
    {
      id: "z5",
      titulo: "Cuerpo Activo",
      desc: "Activa la circulación y tonifica todo el cuerpo.",
      img: "https://res.cloudinary.com/dltofstl9/image/upload/v1776167765/Zumba3_t46yjt.png",
    },
  ],
};
const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const gestionInfo = {
    1: { profe: "Maria Regueiro", cupo: "20/25", hora: "08:00 - 10:00" },
    2: { profe: "Melissa Gomez", cupo: "15/20", hora: "09:00 - 11:00" },
    3: { profe: "Alberto Garcia", cupo: "12/25", hora: "18:00 - 20:00" },
    4: { profe: "Javier Galvan ", cupo: "30/30", hora: "19:00 - 21:00" },
    5: { profe: "Ana Morandeira", cupo: "10/15", hora: "17:00 - 18:30" },
    6: { profe: "Alberto García", cupo: "18/25", hora: "07:00 - 09:00" },
  };

  const infoActual = gestionInfo[id] || gestionInfo["1"];
  const beneficios = DATOS_BENEFICIOS[id] || [];

  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosInscritos, setUsuariosInscritos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [usersData, enrolledData] = await Promise.all([
          userService.getAll(),
          activityService.getEnrolledUsers(id)
        ]);
        setUsuarios(usersData || []);
        setUsuariosInscritos(enrolledData || []);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    cargarDatos();
  }, [id]);

  const handleEnrollUser = async (userId) => {
    try {
      await activityService.enrollUser(id, userId);
      const updatedEnrolled = await activityService.getEnrolledUsers(id);
      setUsuariosInscritos(updatedEnrolled || []);
      alert("Usuario inscrito correctamente");
    } catch (error) {
      alert("Error al inscribir: " + (error.response?.data?.message || error.message));
    }
  };

  const handleUnenrollUser = async (userId) => {
    if (!window.confirm("¿Desinscribir al usuario?")) return;
    try {
      await activityService.unenrollUser(id, userId);
      const updatedEnrolled = await activityService.getEnrolledUsers(id);
      setUsuariosInscritos(updatedEnrolled || []);
      alert("Usuario desinscrito correctamente");
    } catch (error) {
      alert("Error al desinscribir: " + (error.response?.data?.message || error.message));
    }
  };

  const usuariosNoInscritos = usuarios.filter(
    (u) => !usuariosInscritos.some((ui) => ui.id === u.id)
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      <button
        onClick={() => navigate(-1)}
        className="text-[#CCFF00] font-bold mb-8 hover:underline flex items-center gap-2"
      >
        ← VOLVER
      </button>

      <h1 className="text-4xl font-black italic uppercase mb-10">
        Beneficios de la <span className="text-[#CCFF00]">Actividad</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {beneficios.map((item) => (
            <div
              key={item.id}
              className="bg-[#242526] border-2 border-transparent rounded-xl overflow-hidden hover:border-[#CCFF00] transition-all"
            >
              <img
                src={item.img}
                className="w-full h-40 object-cover"
                alt={item.titulo}
              />
              <div className="p-4">
                <h3 className="text-red-600 font-bold text-sm uppercase mb-2">
                  {item.titulo}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-black border-2 border-[#CCFF00] rounded-2xl p-6 h-fit sticky top-4">
          <h2 className="text-[#CCFF00] font-black uppercase italic mb-6 border-b border-[#CCFF00]/30 pb-2">
            Control Recepción
          </h2>

          <div className="space-y-4">
            <div className="bg-[#1a1a1a] p-3 rounded-lg border border-gray-800">
              <p className="text-[10px] text-gray-500 uppercase font-bold">
                Instructor
              </p>
              <p className="font-bold text-[#CCFF00]">{infoActual.profe}</p>
            </div>

            <div className="bg-[#1a1a1a] p-3 rounded-lg border border-gray-800">
              <p className="text-[10px] text-gray-500 uppercase font-bold">
                Disponibilidad
              </p>
              <p className="font-bold">
                {usuariosInscritos.length}/{infoActual.cupo.split("/")[1] || 20}
                <span className="text-[10px] text-gray-400">Cupos</span>
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-3 rounded-lg border border-gray-800">
              <p className="text-[10px] text-gray-500 uppercase font-bold">
                Horario
              </p>
              <p className="font-bold">{infoActual.hora}</p>
            </div>

            {usuariosInscritos.length > 0 && (
              <div className="bg-[#1a1a1a] p-3 rounded-lg border border-gray-800">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">
                  Usuarios Inscritos
                </p>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {usuariosInscritos.map((user) => (
                    <div key={user.id} className="flex items-center justify-between text-xs">
                      <span className="text-white truncate">
                        {user.name} {user.lastName}
                      </span>
                      <button
                        onClick={() => handleUnenrollUser(user.id)}
                        className="text-red-500 hover:text-red-400 ml-2"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        <button 
          onClick={() => setShowEnrollModal(true)}
          className="w-full mt-6 py-2.5 border-2 border-[#CCFF00] text-[#CCFF00] font-bold uppercase text-[11px] rounded-lg flex items-center justify-center gap-2"
        >
          <UserPlusIcon className="w-4 h-4" />
          Inscribir Usuario
        </button>
        </div>
      </div>

      {showEnrollModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111] border border-gray-800 w-full max-w-md rounded-2xl p-6 relative">
            <button
              onClick={() => setShowEnrollModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-[#CCFF00] font-black uppercase italic mb-4">
              Inscribir Usuario
            </h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="BUSCAR USUARIO..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white text-sm outline-none focus:border-[#CCFF00]"
              />
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {usuariosNoInscritos
                .filter(
                  (u) =>
                    !searchTerm ||
                    `${u.name} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    u.dni?.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between bg-[#1a1a1a] p-3 rounded-lg border border-gray-800"
                  >
                    <div>
                      <p className="text-white text-sm font-bold">
                        {user.name} {user.lastName}
                      </p>
                      <p className="text-gray-500 text-xs">{user.dni}</p>
                    </div>
                    <button
                      onClick={() => handleEnrollUser(user.id)}
                      className="bg-[#CCFF00] text-black p-2 rounded-lg hover:bg-[#b8e600]"
                    >
                      <CheckIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              {usuariosNoInscritos.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No hay usuarios disponibles para inscrire
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityDetail;
