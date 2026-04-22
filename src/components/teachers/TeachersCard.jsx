import { PencilSquareIcon, XMarkIcon, CheckIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const activityColors = {
  zumba: { bg: 'bg-[#FF5722]/20', text: 'text-[#FF5722]', border: 'border-[#FF5722]/50' },
  bike: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' },
  circuit: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/50' },
  cross: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' },
  pilates: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/50' },
  yoga: { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-500/50' },
  boxing: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/50' },
  stretching: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/50' },
  aquafit: { bg: 'bg-[#CCFF00]/20', text: 'text-[#CCFF00]', border: 'border-[#CCFF00]/50' },
  natacion: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/50' },
  default: { bg: 'bg-zinc-500/20', text: 'text-zinc-400', border: 'border-zinc-500/50' },
};

const getActivityStyle = (activityName) => {
  const name = (activityName || '').toLowerCase();
  if (name.includes('zumba')) return activityColors.zumba;
  if (name.includes('bike')) return activityColors.bike;
  if (name.includes('circuit')) return activityColors.circuit;
  if (name.includes('cross')) return activityColors.cross;
  if (name.includes('pilates')) return activityColors.pilates;
  if (name.includes('yoga')) return activityColors.yoga;
  if (name.includes('box')) return activityColors.boxing;
  if (name.includes('stretch')) return activityColors.stretching;
  if (name.includes('aqua')) return activityColors.aquafit;
  if (name.includes('natac') || name.includes('swim')) return activityColors.natacion;
  return activityColors.default;
};

const TeacherCard = ({ teacher, onEdit, onDelete, onSchedule }) => {
  const {
    name = "",
    dni = "",
    imageUrl = "",
    hiringYear = "—",
    isActive = true,
    activities = [],
  } = teacher;

  const activeCount = activities?.length ?? 0;

  return (
    <div className={`relative bg-zinc-900 border rounded-2xl p-6 flex flex-col gap-5 hover:shadow-[0_0_25px_rgba(204,255,0,0.2)] hover:-translate-y-1 transition-all duration-300 group min-h-[280px] ${isActive ? 'border-zinc-700 hover:border-[#CCFF00]' : 'border-red-500/50 hover:border-red-500'}`}>
      
      {!isActive && (
        <div className="absolute inset-0 bg-zinc-900/50 rounded-2xl pointer-events-none z-10" />
      )}

      <div className="flex gap-4 items-start relative flex-wrap">
        <div className="flex-shrink-0 relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              className={`w-20 h-20 rounded-full object-cover border-2 ${isActive ? 'border-[#FF5722] group-hover:border-[#CCFF00]' : 'border-red-500'} transition-colors`}
              alt={name}
            />
          ) : (
            <div className={`w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-2xl border-2 ${isActive ? 'border-[#FF5722] group-hover:border-[#CCFF00]' : 'border-red-500'} transition-colors ${isActive ? 'text-[#FF5722]' : 'text-red-500'}`}>
              {name ? name[0].toUpperCase() : '?'}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center gap-2 flex-1 min-w-0">
          <h3 className="text-2xl font-black text-white leading-tight break-words">
            {name ? name.toUpperCase() : 'SIN NOMBRE'}
          </h3>
          <p className="text-base text-zinc-500 tracking-widest font-mono break-all">{dni}</p>
<div className="flex items-center gap-2 mt-2 group/status">
          <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded font-medium">
              {hiringYear}
            </span>
          <div className="relative">
            {isActive ? (
              <CheckCircleIcon className="w-6 h-6 text-[#CCFF00]" />
            ) : (
              <XCircleIcon className="w-6 h-6 text-red-500" />
            )}
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
              bg-black text-white text-xs px-3 py-1.5 rounded font-medium
              opacity-0 group-hover/status:opacity-100 transition whitespace-nowrap z-20 pointer-events-none">
              {isActive ? 'Profesor activo' : 'Profesor inactivo'}
            </span>
          </div>
        </div>
        </div>
      </div>

      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <AcademicCapIcon className="w-5 h-5 text-[#FF5722]" />
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
            Clases asignadas
          </p>
          <span className="text-xs bg-[#FF5722] text-white px-2 py-0.5 rounded font-black">
            {activeCount}
          </span>
        </div>
        
        {activities && activities.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {activities.slice(0, 3).map((act) => {
              const style = getActivityStyle(act.title || act.name);
              return (
                <span 
                  key={act.id} 
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold uppercase tracking-wide ${style.bg} ${style.text} border ${style.border}`}
                >
                  {act.title || act.name}
                </span>
              );
            })}
            {activities.length > 3 && (
              <span className="text-xs text-zinc-500 font-medium self-center">
                +{activities.length - 3}
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-zinc-500 bg-zinc-800/50 rounded-lg p-3">
            <span className="text-sm">Sin clases asignadas</span>
          </div>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-zinc-800 flex justify-between items-center">

        <div className="group/btn relative">
          <button
            onClick={() => onEdit(teacher)}
            className="text-[#CCFF00] hover:text-white transition-all duration-200 hover:scale-125 p-2"
          >
            <PencilSquareIcon className="w-7 h-7" />
          </button>
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
            bg-black text-white text-xs px-3 py-1.5 rounded font-medium
            opacity-0 group-hover/btn:opacity-100 transition whitespace-nowrap z-10">
            Editar
          </span>
        </div>

        <div className="group/btn relative">
          <button
            onClick={() => onDelete(teacher.id)}
            className="text-red-500 hover:text-white transition-all duration-200 hover:scale-125 p-2"
          >
            <XMarkIcon className="w-7 h-7" />
          </button>
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
            bg-black text-white text-xs px-3 py-1.5 rounded font-medium
            opacity-0 group-hover/btn:opacity-100 transition whitespace-nowrap z-10">
            Eliminar
          </span>
        </div>

        <div className="group/btn relative">
          <button
            onClick={() => onSchedule(teacher)}
            className="text-[#FF5722] hover:text-[#CCFF00] transition-all duration-200 hover:scale-125 p-2"
          >
            <CheckIcon className="w-7 h-7" />
          </button>
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
            bg-black text-white text-xs px-3 py-1.5 rounded font-medium
            opacity-0 group-hover/btn:opacity-100 transition whitespace-nowrap z-10">
            Ver horario
          </span>
        </div>

      </div>

    </div>
  );
};

export default TeacherCard;