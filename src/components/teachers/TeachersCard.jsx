const SPECIALTY_MAP = {
  aquafit: 'text-[#00E5FF] border-[#00E5FF]',
  bike: 'text-[#2979FF] border-[#2979FF]',
  circuit: 'text-[#FF9100] border-[#FF9100]',
  crosstraining: 'text-[#7C4DFF] border-[#7C4DFF]',
  pilates: 'text-[#00C853] border-[#00C853]',
  zumba: 'text-[#FF3D7F] border-[#FF3D7F]',
};

const getSpecialtyClass = (s) => {
  const lower = s?.toLowerCase() || '';
  for (const key of Object.keys(SPECIALTY_MAP)) {
    if (lower.includes(key)) return SPECIALTY_MAP[key];
  }
  return 'border-[#FFA500] text-[#FFA500]'; // default style
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
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4 hover:border-[#D4FF00]/40 hover:-translate-y-1 transition">

      {/* Header */}
      <div className="flex gap-4">
        <div>
          {imageUrl ? (
            <img src={imageUrl} className="w-16 h-16 rounded-full object-cover border-2 border-[#FF5722]" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-[#FF5722] font-bold text-xl">
              {name?.[0]?.toUpperCase() || '?'}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-extrabold text-white tracking-wide">
            {name?.toUpperCase()}
          </h3>
          <p className="text-xs text-zinc-400">{dni}</p>
          <span className="text-xs bg-[#D4FF00]/20 text-[#D4FF00] px-2 py-1 rounded">
            ACTIVO DESDE {activeSince}
          </span>
        </div>
      </div>

      <div className="h-px bg-zinc-800" />

      {/* Especialidades */}
      <div>
        <p className="text-xs text-[#FF5722] font-bold tracking-widest mb-2">
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
        <p className="text-xs text-[#FF5722] font-bold tracking-widest">
          CLASES ASIGNADAS
        </p>
        <p className="text-lg font-extrabold text-[#FF5722]">
          {activeCount} ACTIVIDADES
        </p>
      </div>

      {/* Botón horario */}
      <div className="flex gap-2 items-center">
        <button
          onClick={() => onSchedule(teacher)}
          className="flex-1 border-2 border-[#D4FF00] text-[#D4FF00] hover:bg-[#D4FF00] hover:text-black text-sm py-2 rounded font-bold transition"
        >
          VER HORARIO
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