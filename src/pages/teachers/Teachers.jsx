import { useState, useEffect } from 'react';
import { teacherService } from '../../services/api';
import TeacherCard from '../../components/teachers/TeachersCard';
import Toast from '../../components/teachers/Toast';

const specialties = ['Aquafit', 'Bike', 'Circuit', 'CrossTraining', 'Pilates', 'Zumba'];

const Profesores = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        dni: '',
        year: new Date().getFullYear(),
        specialties: [],
        imageUrl: '',
    });
    const [editTeacher, setEditTeacher] = useState(null);
    const [scheduleTeacher, setScheduleTeacher] = useState(null);

    const showToast = (msg, type = 'success') => setToast({ msg, type });

    const load = async () => {
        setLoading(true);
        try {
            const res = await teacherService.getAll();
            setTeachers(res.data);
        } catch (e) {
            showToast(e.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const activeTeachers = teachers
        .filter(t => t.isActive !== false && t.active !== false)
        .filter(t => {
            const searchLower = searchTerm.toLowerCase();
            const nameMatches = t.name?.toLowerCase().includes(searchLower);
            const specialtyMatches = t.specialties?.some(s => s.toLowerCase().includes(searchLower));
            return nameMatches || specialtyMatches;
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.lastName || !formData.dni || formData.specialties.length === 0) {
            showToast('Por favor completa todos los campos', 'error');
            return;
        }
        try {
            const fullName = `${formData.name} ${formData.lastName}`;
            const res = await teacherService.create({
                name: fullName,
                lastName: formData.lastName,
                dni: formData.dni,
                hiringYear: formData.year,
                specialties: formData.specialties,
                activities: [],
                activityCount: 0,
                imageUrl: formData.imageUrl || `https://via.placeholder.com/150/FF6B35/FFFFFF?text=${formData.name[0]}${formData.lastName[0]}`,
                isActive: true,
            });
            setTeachers([...teachers, res.data]);
            showToast('Profesor creado exitosamente', 'success');
            resetForm();
            setShowModal(false);
        } catch (e) {
            showToast('Error al crear profesor', 'error');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            lastName: '',
            dni: '',
            year: new Date().getFullYear(),
            specialties: [],
            imageUrl: '',
        });
    };

    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    const toggleSpecialty = (specialty) => {
        setFormData(prev => ({
            ...prev,
            specialties: prev.specialties.includes(specialty)
                ? prev.specialties.filter(s => s !== specialty)
                : [...prev.specialties, specialty]
        }));
    };

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-extrabold text-white">
                        PROFESORES ACTIVOS
                    </h1>
                    <p className="text-zinc-400 text-sm">
                        Equipo de instructores del gimnasio
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#D4FF00] text-black px-4 py-2 rounded font-bold hover:bg-[#D4FF00]/80 transition"
                >
                    + NUEVO PROFESOR
                </button>
            </div>

            {/* Buscador */}
            <div className="mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por nombre o especialidad..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4FF00] transition"
                />
            </div>

            {/* Loading */}
            {loading ? (
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-40 bg-zinc-800 animate-pulse rounded" />
                    ))}
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-4">
                    {activeTeachers.length === 0 ? (
                        <div className="text-center col-span-full">
                            <p className="text-zinc-400 mb-4">
                                No hay profesores activos registrados.
                            </p>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-[#D4FF00] text-black px-4 py-2 rounded hover:bg-[#D4FF00]/80 transition"
                            >
                                Añadir primer profesor
                            </button>
                        </div>
                    ) : (
                        activeTeachers.map(t => (
                            <TeacherCard
                                key={t.id}
                                teacher={t}
                                onEdit={setEditTeacher}
                                onDelete={() => { }}
                                onSchedule={setScheduleTeacher}
                            />
                        ))
                    )}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 overflow-y-auto">
                    <div className="bg-zinc-900 rounded p-8 w-full max-w-2xl border border-zinc-700 my-8">
                        <h2 className="text-2xl font-extrabold text-[#D4FF00] mb-6 uppercase">Registrar Nuevo Profesor</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Nombre y Apellidos */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#D4FF00] text-sm font-bold mb-2">
                                        NOMBRE *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-zinc-800 border border-[#D4FF00] rounded px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:bg-zinc-700"
                                        placeholder="Ej: Carlos"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#D4FF00] text-sm font-bold mb-2">
                                        APELLIDOS *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full bg-zinc-800 border border-[#D4FF00] rounded px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:bg-zinc-700"
                                        placeholder="Ej: Ramírez García"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#D4FF00] text-sm font-bold mb-2">
                                        DNI *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.dni}
                                        onChange={(e) => setFormData({ ...formData, dni: e.target.value.toUpperCase() })}
                                        maxLength={9}
                                        className="w-full bg-zinc-800 border border-[#D4FF00] rounded px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:bg-zinc-700"
                                        placeholder="11111111A"
                                    />
                                    <p className="text-zinc-500 text-xs mt-1">Formato: 8 números seguidos de 1 letra mayúscula</p>
                                </div>

                                <div>
                                    <label className="block text-[#D4FF00] text-sm font-bold mb-2">
                                        AÑO DE CONTRATACIÓN *
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                        className="w-full bg-zinc-800 border border-[#D4FF00] rounded px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:bg-zinc-700"
                                        min={2000}
                                        max={new Date().getFullYear()}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#D4FF00] text-sm font-bold mb-3">
                                    ESPECIALIDADES * (SELECCIONA AL MENOS UNA)
                                </label>
                                <div className="grid grid-cols-5 gap-2">
                                    {specialties.map(specialty => (
                                        <button
                                            key={specialty}
                                            type="button"
                                            onClick={() => toggleSpecialty(specialty)}
                                            className={`px-3 py-2 rounded font-semibold text-sm transition ${
                                                formData.specialties.includes(specialty)
                                                    ? 'bg-[#D4FF00] text-black'
                                                    : 'bg-zinc-700 text-white hover:bg-zinc-600'
                                            }`}
                                        >
                                            {specialty}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#D4FF00] text-sm font-bold mb-2">
                                    URL DE IMAGEN (Opcional)
                                </label>
                                <input
                                    type="url"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    className="w-full bg-zinc-800 border border-[#D4FF00] rounded px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:bg-zinc-700"
                                    placeholder="https://res.cloudinary.com/..."
                                />
                            </div>

                            <div className="bg-red-500/10 border border-red-500 rounded p-4">
                                <div className="flex gap-3">
                                    <span className="text-red-400 font-bold">ℹ</span>
                                    <div className="text-red-400 text-sm">
                                        <p className="font-bold mb-2">Información del profesor</p>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>El profesor será creado con estado <strong>ACTIVO</strong></li>
                                            <li>Podrá ser asignado a actividades según sus especialidades</li>
                                            <li>Sus datos podrán ser editados posteriormente</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-zinc-700 text-[#D4FF00] px-4 py-3 rounded font-bold hover:bg-zinc-600 transition uppercase"
                                >
                                    Limpiar Formulario
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#D4FF00] text-black px-4 py-3 rounded font-bold hover:bg-[#C1E500] transition uppercase"
                                >
                                    Registrar Profesor
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="w-full bg-zinc-700 text-white px-4 py-2 rounded hover:bg-zinc-600 transition"
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {toast && (
                <Toast
                    message={toast.msg}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default Profesores;