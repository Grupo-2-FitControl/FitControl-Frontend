import { CalendarDaysIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const TeacherCard = ({ teacher, onEdit, onDelete, onSchedule }) => {

  const {
    nombre = "",
    dni = "",
    imagen = "",
    activities = [],
  } = teacher;

  const activeCount = activities?.length ?? teacher.activityCount ?? 0;

  return (
    <div className="relative bg-mist-800 border border-mist-600 rounded-none p-6 pb-16 flex flex-col gap-5 hover:border-[#D4FF00]/40 transition-all duration-300">

      {/* CONTENIDO */}
      <div className="flex gap-4">
        <div>
          {imagen ? (
            <img 
              src={imagen} 
              className="w-20 h-20 rounded-full object-cover border-2 border-[#FF5722]" 
              alt={nombre} 
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#262626] flex items-center justify-center text-[#FF5722] font-bold text-2xl border-2 border-[#FF5722]">
              {nombre ? nombre[0].toUpperCase() : '?'}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-black text-white">
            {nombre ? nombre.toUpperCase() : 'SIN NOMBRE'}
          </h3>
          <p className="text-xs text-zinc-500">{dni}</p>
          <span className="mt-1 text-[10px] bg-[#D4FF00] text-black font-black px-2 py-0.5 w-fit">
            CONTRATADO
          </span>
        </div>
      </div>

      <div className="h-px bg-[#262626]" />

      <div>
        <p className="text-[10px] text-zinc-500 font-black tracking-widest">
          CLASES ASIGNADAS
        </p>
        <p className="text-2xl font-black text-[#FF5722] italic">
          {activeCount} ACTIVIDADES
        </p>
      </div>

      {/* BOTÓN HORARIO - IZQUIERDA */}
      <div className="absolute bottom-4 left-4 group z-10">
        <button
          onClick={() => onSchedule(teacher)}
          className="bg-[#D4FF00] text-black p-3 hover:scale-110 transition"
        >
          <CalendarDaysIcon className="w-5 h-5" />
        </button>

        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Ver horario
        </span>
      </div>

      {/* BOTÓN EDITAR - DERECHA */}
      <div className="absolute bottom-4 right-4 group z-10">
        <button
          onClick={() => onEdit(teacher)}
          className="bg-[#FF5722] text-white p-3 hover:scale-110 transition"
        >
          <PencilSquareIcon className="w-5 h-5" />
        </button>

        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Editar profesor
        </span>
      </div>

    </div>
  );
};

export default TeacherCard;