import { CalendarDaysIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const TeacherCard = ({ teacher, onEdit, onDelete, onSchedule }) => {

  const {
    nombre = "",
    dni = "",
    imagen = "",
    activities = [],
    especialidades = []
  } = teacher;

  const activeCount = activities?.length ?? teacher.activityCount ?? 0;

  return (
    <div className="bg-mist-800 border border-mist-600 rounded-none p-6 flex flex-col gap-5 hover:border-[#D4FF00]/40 transition-all duration-300 group">
    
      <div className="flex gap-4">
        <div className="relative">
          {imagen ? (
            <img 
              src={imagen} 
              className="w-20 h-20 rounded-full object-cover border-2 border-[#FF5722]" 
              alt={nombre} 
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#262626] flex items-center justify-center text-[#FF5722] font-bold text-2xl border-2 border-[#FF5722]">
              {nombre && nombre.length > 0 ? nombre.toUpperCase() : '?'}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-black text-white tracking-tighter leading-tight">
            {nombre ? nombre.toUpperCase() : 'SIN NOMBRE'}
          </h3>
          <p className="text-xs text-zinc-500 mb-2">{dni}</p>
          <div className="flex">
            <span className="text-[10px] bg-[#D4FF00] text-black font-black px-2 py-0.5 tracking-tighter">
              CONTRATADO
            </span>
          </div>
        </div>
      </div>

      <div>
        <p className="text-[10px] text-[#FF5722] font-black tracking-[0.2em] mb-2">ESPECIALIDADES</p>
        <div className="flex gap-2 flex-wrap">
          {especialidades && especialidades.length > 0 ? (
            especialidades.map((esp, index) => (
              <span 
                key={index} 
                className="border border-[#FF5722] text-[#FF5722] text-[10px] font-bold px-2 py-1 hover:bg-[#FF5722] hover:text-white transition-colors cursor-default"
              >
                {esp.toUpperCase()}
              </span>
            ))
          ) : (
            <span className="text-zinc-600 text-[10px]">SIN ESPECIALIDADES</span>
          )}
        </div>
      </div>

      <div className="h-px bg-[#262626]" />

      <div>
        <p className="text-[10px] text-zinc-500 font-black tracking-[0.2em]">CLASES ASIGNADAS</p>
        <p className="text-2xl font-black text-[#FF5722] italic">
          {activeCount} ACTIVIDADES
        </p>
      </div>

      <div className="flex gap-2 items-center mt-auto">
        <button
          onClick={() => onSchedule(teacher)}
          className="flex-1 border-2 border-[#D4FF00] text-[#D4FF00] hover:bg-[#D4FF00] hover:text-black font-black py-2 px-4 flex items-center justify-center gap-2 transition-all uppercase italic text-sm"
        >
          <CalendarDaysIcon className="w-5 h-5" />
          Ver Horario
        </button>
        
        <button
          onClick={() => onEdit(teacher)}
          className="p-2 text-[#D4FF00] hover:scale-110 transition-transform"
          title="Editar profesor"
        >
          <PencilSquareIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default TeacherCard;