import { useState } from 'react';
import { teacherService } from '../../services/teacherService';
import { CheckIcon, XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// Teacher DB fields: id | name | dni | hiring_year | is_active | image_url
const EditTeacherModal = ({ teacher, onClose, onSaved }) => {
    const [form, setForm] = useState({
        name: teacher?.name || teacher?.nombre || '',
        dni: teacher?.dni || '',
        hiring_year: teacher?.hiring_year || teacher?.hiringYear || new Date().getFullYear(),
        is_active: teacher?.is_active ?? teacher?.isActive ?? teacher?.contratado ?? true,
        image_url: teacher?.image_url || teacher?.imageUrl || teacher?.imagen || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async () => {
        if (!form.name.trim() || !form.dni.trim()) {
            setError('Nombre y DNI son obligatorios');
            return;
        }
        const dniRegex = /^\d{8}[A-Z]$/;
        if (!dniRegex.test(form.dni)) {
            setError('DNI inválido. Formato: 8 números + 1 letra mayúscula (ej: 12345678A)');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await teacherService.update(teacher.id, {
                ...form,
                hiring_year: parseInt(form.hiring_year),
            });
            onSaved(res.data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setForm({
            name: teacher?.name || teacher?.nombre || '',
            dni: teacher?.dni || '',
            hiring_year: teacher?.hiring_year || teacher?.hiringYear || new Date().getFullYear(),
            is_active: teacher?.is_active ?? teacher?.isActive ?? teacher?.contratado ?? true,
            image_url: teacher?.image_url || teacher?.imageUrl || teacher?.imagen || '',
        });
        setError(null);
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-lg border border-zinc-700">
                <h2 className="text-xl font-black text-[#FF5722] mb-5 uppercase tracking-widest">
                    Editar Profesor
                </h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 rounded p-3 text-red-400 text-sm mb-4">
                        {error}
                    </div>
                )}

                {/* Nombre */}
                <div className="mb-3">
                    <label className="text-[10px] text-[#FF5722] font-black tracking-widest uppercase block mb-1">
                        Nombre completo *
                    </label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Ej: Carlos Ramírez"
                        className="w-full p-2 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-[#FF5722] transition"
                    />
                </div>

                {/* DNI + Año */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <label className="text-[10px] text-[#FF5722] font-black tracking-widest uppercase block mb-1">
                            DNI *
                        </label>
                        <input
                            name="dni"
                            value={form.dni}
                            onChange={e => handleChange({ target: { name: 'dni', value: e.target.value.toUpperCase() } })}
                            placeholder="12345678A"
                            className="w-full p-2 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-[#FF5722] transition"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] text-[#FF5722] font-black tracking-widest uppercase block mb-1">
                            Año contratación
                        </label>
                        <input
                            type="number"
                            name="hiring_year"
                            value={form.hiring_year}
                            onChange={handleChange}
                            min="2000" max="2030"
                            className="w-full p-2 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-[#FF5722] transition"
                        />
                    </div>
                </div>

                {/* Imagen */}
                <div className="mb-3">
                    <label className="text-[10px] text-[#FF5722] font-black tracking-widest uppercase block mb-1">
                        URL Imagen (Cloudinary)
                    </label>
                    <input
                        name="image_url"
                        value={form.image_url}
                        onChange={handleChange}
                        placeholder="https://res.cloudinary.com/..."
                        className="w-full p-2 bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-[#FF5722] transition"
                    />
                </div>

                {/* Activo */}
                <div className="flex items-center gap-2 mb-5">
                    <input
                        type="checkbox"
                        name="is_active"
                        id="is_active_edit"
                        checked={form.is_active}
                        onChange={handleChange}
                        className="w-4 h-4 cursor-pointer accent-[#FF5722]"
                    />
                    <label htmlFor="is_active_edit" className="text-white text-sm cursor-pointer">
                        Profesor activo (contratado)
                    </label>
                </div>

                {/* Acciones */}
                <div className="flex gap-3 items-center">
                    <button
                        type="button"
                        onClick={reset}
                        title="Restaurar valores originales"
                        className="bg-zinc-700 text-[#D4FF00] p-3 rounded flex items-center justify-center hover:bg-zinc-600 transition"
                    >
                        <ArrowPathIcon className="w-5 h-5" />
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        title="Cancelar"
                        className="flex-1 border border-zinc-600 text-white p-3 rounded flex items-center justify-center hover:bg-zinc-800 transition"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        title="Guardar cambios"
                        className="flex-1 bg-[#FF5722] text-white p-3 rounded font-bold flex items-center justify-center hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="text-sm font-black tracking-widest">GUARDANDO...</span>
                        ) : (
                            <CheckIcon className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTeacherModal;
