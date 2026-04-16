import { useState } from "react";
import {
    CheckIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const EditTeacherModal = ({ teacher, onClose, onSave }) => {
    const [form, setForm] = useState({
        nombre: teacher?.nombre || "",
        dni: teacher?.dni || "",
        email: teacher?.email || "",
        contratado: teacher?.contratado !== false,
        imagen: teacher?.imagen || "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = () => {
        if (!form.nombre || !form.dni || !form.email) return;

        onSave({
            ...form,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-lg border border-zinc-700">

                <h2 className="text-xl font-bold text-[#FF5722] mb-4">
                    EDITAR PROFESOR
                </h2>

                <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Nombre completo"
                    className="w-full p-2 bg-zinc-800 text-white rounded mb-2"
                />

                <div className="grid grid-cols-2 gap-2 mb-2">
                    <input
                        name="dni"
                        value={form.dni}
                        onChange={handleChange}
                        placeholder="DNI (ej: 12345678A)"
                        className="p-2 bg-zinc-800 text-white rounded"
                    />

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="p-2 bg-zinc-800 text-white rounded"
                    />
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <input
                        type="checkbox"
                        name="contratado"
                        checked={form.contratado}
                        onChange={handleChange}
                        className="w-4 h-4 cursor-pointer"
                        id="contratado-edit"
                    />
                    <label htmlFor="contratado-edit" className="text-white text-sm cursor-pointer">
                        Contratado
                    </label>
                </div>

                <input
                    name="imagen"
                    value={form.imagen}
                    onChange={handleChange}
                    placeholder="URL Imagen (opcional)"
                    className="w-full p-2 bg-zinc-800 text-white rounded mb-4"
                />

                <div className="flex gap-3 mt-4 justify-between items-center">

                    <button
                        type="button"
                        onClick={handleSubmit}
                        title="Guardar cambios"
                        aria-label="Guardar cambios"
                        className="flex-1 bg-[#FF5722] text-black p-3 rounded font-bold hover:opacity-90 transition flex items-center justify-center"
                    >
                        <CheckIcon className="w-5 h-5" />
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        title="Cancelar edición"
                        aria-label="Cancelar edición"
                        className="flex-1 border border-zinc-600 text-white p-3 rounded hover:bg-zinc-700 transition flex items-center justify-center"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>

                </div>
            </div>
        </div>
    );
};

export default EditTeacherModal;
