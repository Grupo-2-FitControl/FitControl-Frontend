import { CalendarDaysIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

// Teacher fields from DB: id | name | dni | hiring_year | is_active | image_url
const TeacherCard = ({ teacher, onEdit, onDelete, onSchedule }) => {
  const {
    name      = "",
    dni       = "",
    imageUrl  = teacher.image_url || "",
    hiringYear = teacher.hiring_year || "—",
    activities = [],
  } = teacher;

  const activeCount = activities?.length ?? teacher.activityCount ?? 0;

  return (
    <div className="relative bg-zinc-900 border border-zinc-700 rounded p-6 pb-16 flex flex-col gap-5 hover:border-[#D4FF00]/40 transition-all duration-300">

      {/* HEADER: avatar + datos */}
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#FF5722]"
              alt={name}
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-[#FF5722] font-bold text-2xl border-2 border-[#FF5722]">
              {name ? name[0].toUpperCase() : '?'}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center gap-1">
          <h3 className="text-xl font-black text-white leading-tight">
            {name ? name.toUpperCase() : 'SIN NOMBRE'}
          </h3>
          <p className="text-xs text-zinc-500 tracking-widest">{dni}</p>
          <span className="text-[10px] bg-[#D4FF00] text-black font-black px-2 py-0.5 w-fit">
            ACTIVO DESDE {hiringYear}
          </span>
        </div>
      </div>

      <div className="h-px bg-zinc-800" />

      {/* CLASES */}
      <div>
        <p className="text-[10px] text-zinc-500 font-black tracking-widest uppercase">Clases asignadas</p>
        <p className="text-2xl font-black text-[#FF5722] italic">{activeCount} ACTIVIDADES</p>
      </div>

      {/* BOTÓN HORARIO — izquierda */}
      <div className="absolute bottom-4 left-4 group z-10">
        <button
          onClick={() => onSchedule(teacher)}
          title="Ver horario"
          className="bg-[#D4FF00] text-black p-3 hover:scale-110 transition"
        >
          <CalendarDaysIcon className="w-5 h-5" />
        </button>
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
          Ver horario
        </span>
      </div>

      {/* BOTÓN EDITAR — centro-derecha */}
      <div className="absolute bottom-4 right-14 group z-10">
        <button
          onClick={() => onEdit(teacher)}
          title="Editar profesor"
          className="bg-[#FF5722] text-white p-3 hover:scale-110 transition"
        >
          <PencilSquareIcon className="w-5 h-5" />
        </button>
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
          Editar
        </span>
      </div>

      {/* BOTÓN ELIMINAR — derecha */}
      <div className="absolute bottom-4 right-4 group z-10">
        <button
          onClick={() => onDelete(teacher.id)}
          title="Eliminar profesor"
          className="bg-red-700 text-white p-3 hover:scale-110 transition"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
          Eliminar
        </span>
      </div>
    </div>
  );
};

export default TeacherCard;
