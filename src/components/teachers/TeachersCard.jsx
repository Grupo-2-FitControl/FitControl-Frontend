const SPECIALTY_MAP = {
  crossfit: 'border-red-500 text-red-500',
  spinning: 'border-orange-500 text-orange-500',
  yoga: 'border-green-500 text-green-500',
  pilates: 'border-purple-500 text-purple-500',
  boxeo: 'border-orange-600 text-orange-600',
  hiit: 'border-red-500 text-red-500',
  zumba: 'border-yellow-500 text-yellow-500',
  natacion: 'border-blue-500 text-blue-500',
};

const getSpecialtyClass = (s) => {
  const lower = s?.toLowerCase() || '';
  for (const key of Object.keys(SPECIALTY_MAP)) {
    if (lower.includes(key)) return SPECIALTY_MAP[key];
  }
  return 'border-orange-500 text-orange-500';
};

const TeacherCard = ({ teacher, onEdit, onDelete, onSchedule }) => {
  const {
    name, dni, hiringYear, imageUrl,
    specialties = [], activities = [],
  } = teacher;

  const activeSince = hiringYear || teacher.hiring_year || '—';
  const activeCount = activities?.length ?? teacher.activityCount ?? 0;

  const specialtyList = Array.isArray(specialties)
    ? specialties
    : typeof specialties === 'string' && specialties
    ? specialties.split(',').map(s => s.trim())
    : [];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4 hover:border-lime-400/40 hover:-translate-y-1 transition">

      {/* Header */}
      <div className="flex gap-4">
        <div>
          {imageUrl ? (
            <img src={imageUrl} className="w-16 h-16 rounded-full object-cover border-2 border-orange-500" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-orange-500 font-bold text-xl">
              {name?.[0]?.toUpperCase() || '?'}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-extrabold text-white tracking-wide">
            {name?.toUpperCase()}
          </h3>
          <p className="text-xs text-zinc-400">{dni}</p>
          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
            ACTIVO DESDE {activeSince}
          </span>
        </div>
      </div>

      <div className="h-px bg-zinc-800" />

      {/* Especialidades */}
      <div>
        <p className="text-xs text-orange-500 font-bold tracking-widest mb-2">
          ESPECIALIDADES
        </p>

        <div className="flex flex-wrap gap-2">
          {specialtyList.length > 0 ? (
            specialtyList.map((s, i) => (
              <span
                key={i}
                className={`px-2 py-1 text-xs font-semibold border rounded ${getSpecialtyClass(s)}`}
              >
                {s}
              </span>
            ))
          ) : (
            <span className="text-xs text-zinc-500 italic">
              Sin especialidades
            </span>
          )}
        </div>
      </div>

      <div className="h-px bg-zinc-800" />

      {/* Actividades */}
      <div>
        <p className="text-xs text-orange-500 font-bold tracking-widest">
          CLASES ASIGNADAS
        </p>
        <p className="text-lg font-extrabold text-orange-500">
          {activeCount} ACTIVIDADES
        </p>
      </div>

      {/* Botón horario */}
      <div className="flex gap-2 items-center">
        <button
          onClick={() => onSchedule(teacher)}
          className="flex-1 border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black text-sm py-2 rounded font-bold transition"
        >
          VER HORARIO
        </button>
        <button
          onClick={() => onEdit(teacher)}
          className="border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black p-2 rounded transition"
        >
          ✎
        </button>
      </div>
    </div>
  );
};

export default TeacherCard;