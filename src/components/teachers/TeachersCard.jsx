import { PencilSquareIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';

const TeacherCard = ({ teacher, onEdit, onDelete, onSchedule }) => {
  const {
    name = "",
    dni = "",
    imageUrl = teacher.image_url || "",
    hiringYear = teacher.hiring_year || "—",
    activities = [],
  } = teacher;

  const activeCount = activities?.length ?? teacher.activityCount ?? 0;

  return (
    <div className="relative bg-zinc-900 border border-zinc-700 rounded p-6 pb-16 flex flex-col gap-5 hover:border-[#D4FF00]/40 transition-all duration-300">

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

      <div>
        <p className="text-[10px] text-zinc-500 font-black tracking-widest uppercase">
          Clases asignadas
        </p>
        <p className="text-2xl font-black text-[#FF5722] italic">
          {activeCount} ACTIVIDADES
        </p>
      </div>

      {/* ===== ICONOS ===== */}

      {/* EDIT (VERDE) */}
      <div className="absolute bottom-4 left-4 group">
        <button
          onClick={() => onEdit(teacher)}
          className="text-[#D4FF00] hover:text-white transition-all duration-200 hover:scale-110"
        >
          <PencilSquareIcon className="w-6 h-6" />
        </button>

        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
          bg-black text-white text-xs px-2 py-1 rounded 
          opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
          Editar profesor
        </span>
      </div>

      {/* DELETE (ROJO PALETA) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 group">
        <button
          onClick={() => onDelete(teacher.id)}
          className="text-[#FF5722] hover:text-white transition-all duration-200 hover:scale-110"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
          bg-black text-white text-xs px-2 py-1 rounded 
          opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
          Eliminar profesor
        </span>
      </div>

      {/* CHECK (NARANJA ACCIÓN) */}
      <div className="absolute bottom-4 right-4 group">
        <button
          onClick={() => onSchedule(teacher)}
          className="text-[#FF5722] hover:text-[#D4FF00] transition-all duration-200 hover:scale-110"
        >
          <CheckIcon className="w-6 h-6" />
        </button>

        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
          bg-black text-white text-xs px-2 py-1 rounded 
          opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
          Confirmar acción
        </span>
      </div>

    </div>
  );
};

export default TeacherCard;