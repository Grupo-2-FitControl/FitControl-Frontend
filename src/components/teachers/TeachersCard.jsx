import { CalendarDaysIcon } from '@heroicons/react/24/outline';

const TeacherCard = ({ teacher, onEdit, onDelete, onSchedule }) => {
  const {
    nombre, dni, imagen, activities = [],
  } = teacher;

  const activeCount = activities?.length ?? teacher.activityCount ?? 0;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4 hover:border-[#D4FF00]/40 hover:-translate-y-1 transition">


      <div className="flex gap-4">
        <div>
          {imagen ? (
            <img src={imagen} className="w-16 h-16 rounded-full object-cover border-2 border-[#FF5722]" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-[#FF5722] font-bold text-xl">
              {nombre?.[0]?.toUpperCase() || '?'}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-extrabold text-white tracking-wide">
            {nombre?.toUpperCase()}
          </h3>
          <p className="text-xs text-zinc-400">{dni}</p>
          <span className="text-xs bg-[#D4FF00]/20 text-[#D4FF00] px-2 py-1 rounded">
            CONTRATADO
          </span>
        </div>
      </div>

      <div className="h-px bg-zinc-800" />

      <div>
        <p className="text-xs text-[#FF5722] font-bold tracking-widest">
          CLASES ASIGNADAS
        </p>
        <p className="text-lg font-extrabold text-[#FF5722]">
          {activeCount} ACTIVIDADES
        </p>
      </div>

      <div className="flex gap-2 items-center">
        <button
  onClick={() => onSchedule(teacher)}
  title="Ver horario"
  className="border-2 border-[#D4FF00] text-[#D4FF00] hover:bg-[#D4FF00] hover:text-black p-2 rounded transition"
>
  <CalendarDaysIcon className="w-5 h-5" />
</button>
        <button
          onClick={() => onEdit(teacher)}
          className="border-[#D4FF00] text-[#D4FF00] hover:bg-[#D4FF00] hover:text-black p-2 rounded transition"
        >
          ✎
        </button>
      </div>
    </div>
  );
};

export default TeacherCard;