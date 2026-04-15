import { useState } from "react";

const specialtiesList = ['Aquafit', 'Bike', 'Circuit', 'CrossTraining', 'Pilates', 'Zumba'];

const EditTeacherModal = ({ teacher, onClose, onSave }) => {
    const [form, setForm] = useState({
        name: teacher?.name?.split(" ")[0] || "",
        lastName: teacher?.lastName || "",
        dni: teacher?.dni || "",
        year: teacher?.hiringYear || new Date().getFullYear(),
        specialties: teacher?.specialties || [],
        imageUrl: teacher?.imageUrl || "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const toggleSpecialty = (specialty) => {
        setForm(prev => ({
            ...prev,
            specialties: prev.specialties.includes(specialty)
                ? prev.specialties.filter(s => s !== specialty)
                : [...prev.specialties, specialty]
        }));
    };

    const handleSubmit = () => {
        const fullName = `${form.name} ${form.lastName}`;

        onSave({
            ...form,
            name: fullName,
            hiringYear: form.year,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-lg border border-zinc-700">

                <h2 className="text-xl font-bold text-[#FF5722] mb-4">
                    EDITAR PROFESOR
                </h2>

                {/* Nombre y Apellidos */}
                <div className="grid grid-cols-2 gap-2">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nombre"
                        className="p-2 bg-zinc-800 text-white rounded"
                    />
                    <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Apellidos"
                        className="p-2 bg-zinc-800 text-white rounded"
                    />
                </div>

                {/* DNI */}
                <input
                    name="dni"
                    value={form.dni}
                    onChange={handleChange}
                    placeholder="DNI"
                    className="w-full mt-2 p-2 bg-zinc-800 text-white rounded"
                />

                {/* Año */}
                <input
                    type="number"
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 bg-zinc-800 text-white rounded"
                />

                {/* Especialidades */}
                <div className="mt-3">
                    <p className="text-[#FF5722] text-sm mb-2">ESPECIALIDADES</p>
                    <div className="flex flex-wrap gap-2">
                        {specialtiesList.map(s => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => toggleSpecialty(s)}
                                className={`px-2 py-1 text-xs rounded ${
                                    form.specialties.includes(s)
                                        ? 'bg-[#D4FF00] text-black'
                                        : 'bg-zinc-700 text-white'
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Imagen */}
                <input
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="URL Imagen"
                    className="w-full mt-3 p-2 bg-zinc-800 text-white rounded"
                />

                {/* Botones */}
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-[#FF5722] text-black py-2 rounded font-bold"
                    >
                        Guardar
                    </button>

                    <button
                        onClick={onClose}
                        className="flex-1 border border-zinc-600 text-white py-2 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTeacherModal;