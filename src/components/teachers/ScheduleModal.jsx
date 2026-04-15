const ScheduleModal = ({ teacher, onClose }) => {
    if (!teacher) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-md border border-zinc-700">

                <h2 className="text-xl font-bold text-[#D4FF00] mb-4">
                    HORARIO
                </h2>

                <p className="text-white font-bold mb-2">
                    {teacher.name}
                </p>

                <p className="text-zinc-400 text-sm mb-4">
                    Aquí se mostrará el horario cuando conectes el backend
                </p>

                {/* FUTURO: render de clases */}
                <div className="bg-zinc-800 p-3 rounded text-zinc-400 text-sm">
                    Sin datos de horario
                </div>

                <button
                    onClick={onClose}
                    className="mt-4 w-full border border-[#D4FF00] text-[#D4FF00] py-2 rounded hover:bg-[#D4FF00] hover:text-black transition"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default ScheduleModal;