import { useState, useEffect } from 'react';
import { teacherService } from '../../services/teacherService';
import { XMarkIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

// Muestra las actividades reales del profesor desde GET /teachers/:id/activities
// Activity fields: id | title | description | price | start_date | image_url | teacher_id
const ScheduleModal = ({ teacher, onClose }) => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!teacher?.id) return;
        setLoading(true);
        setError(null);
        teacherService
            .getActivities(teacher.id)
            .then(r => setActivities(r.data))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [teacher?.id]);

    if (!teacher) return null;

    const teacherName = teacher.name || teacher.nombre || '—';

    return (
        <div
            className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4"
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-zinc-900 border border-zinc-700 rounded-lg w-full max-w-lg max-h-[85vh] flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                        <CalendarDaysIcon className="w-6 h-6 text-[#D4FF00]" />
                        <div>
                            <h2 className="text-lg font-black text-[#D4FF00] uppercase tracking-widest">
                                Horario
                            </h2>
                            <p className="text-sm text-zinc-400 font-bold">{teacherName.toUpperCase()}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto flex-1 p-6 space-y-3">
                    {loading && (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-16 bg-zinc-800 animate-pulse rounded" />
                            ))}
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-500/10 border border-red-500 rounded p-4 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {!loading && !error && activities.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-zinc-500 text-sm">Este profesor no tiene actividades asignadas.</p>
                        </div>
                    )}

                    {!loading && activities.map(act => {
                        const date = act.startDate || act.start_date;
                        const isPast = date && new Date(date) < new Date();
                        return (
                            <div
                                key={act.id}
                                className={`bg-zinc-800 border rounded p-4 flex justify-between items-center gap-4 ${isPast ? 'opacity-50 border-zinc-700' : 'border-zinc-600'}`}
                            >
                                <div>
                                    <p className="font-black text-white text-sm uppercase tracking-wide">
                                        {act.title}
                                    </p>
                                    <p className="text-zinc-400 text-xs mt-1">
                                        {date
                                            ? new Date(date).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' })
                                            : '—'}
                                    </p>
                                    {act.description && (
                                        <p className="text-zinc-500 text-xs mt-1 line-clamp-1">{act.description}</p>
                                    )}
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-[#D4FF00] font-black text-sm">
                                        {act.price != null ? `${act.price}€` : '—'}
                                    </p>
                                    {isPast && (
                                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Pasada</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-zinc-800">
                    <button
                        onClick={onClose}
                        className="w-full border border-[#D4FF00] text-[#D4FF00] py-2 rounded font-bold uppercase text-sm tracking-widest hover:bg-[#D4FF00] hover:text-black transition"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScheduleModal;