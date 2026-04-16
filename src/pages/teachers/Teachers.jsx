import { useState, useEffect } from 'react';
import { teacherService } from '../../services/api';
import TeacherCard from '../../components/teachers/TeachersCard';
import Toast from '../../components/teachers/Toast';
import ScheduleModal from '../../components/teachers/ScheduleModal';
import EditTeacherModal from '../../components/teachers/EditTeacherModal';

import { PlusIcon } from '@heroicons/react/24/outline';
import {
    CheckIcon,
    XMarkIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

const Profesores = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        nombre: '',
        dni: '',
        email: '',
        contratado: true,
        imagen: '',
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
        .filter(t => t.contratado !== false)
        .filter(t => {
            const searchLower = searchTerm.toLowerCase();
            return t.nombre?.toLowerCase().includes(searchLower);
        });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de campos requeridos
        if (!formData.nombre || !formData.dni || !formData.email) {
            showToast('Por favor completa todos los campos obligatorios', 'error');
            return;
        }

        // Validar formato DNI (8 números + 1 letra mayúscula)
        const dniRegex = /^\d{8}[A-Z]$/;
        if (!dniRegex.test(formData.dni)) {
            showToast('DNI inválido. Formato: 8 números + 1 letra mayúscula (ej: 12345678A)', 'error');
            return;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showToast('Email inválido', 'error');
            return;
        }

        try {
            const res = await teacherService.create({
                nombre: formData.nombre,
                dni: formData.dni,
                email: formData.email,
                contratado: formData.contratado,
                imagen: formData.imagen || 'https://via.placeholder.com/150/FF6B35/FFFFFF?text=PROF',
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
            nombre: '',
            dni: '',
            email: '',
            contratado: true,
            imagen: '',
        });
    };

    const onClose = () => {
        setShowModal(false);
        resetForm();
    };

    return (
        <div className="p-6">

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
                    title="Crear nuevo profesor"
                    aria-label="Crear nuevo profesor"
                    className="bg-[#D4FF00] text-black p-3 rounded font-bold hover:bg-[#D4FF00]/80 transition flex items-center justify-center"
                >
                    <PlusIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar profesor por nombre..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4FF00] transition"
                />
            </div>

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
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 p-4 overflow-y-auto">
                    <div className="bg-zinc-900 rounded p-8 w-full max-w-2xl border border-zinc-700 max-h-[90vh] overflow-y-auto">

                        <h2 className="text-2xl font-extrabold text-[#D4FF00] mb-6 uppercase">
                            Registrar Nuevo Profesor
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <input
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                placeholder="Nombre completo"
                                className="w-full bg-zinc-800 border border-[#D4FF00] rounded px-3 py-2 text-white"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    value={formData.dni}
                                    onChange={(e) => setFormData({ ...formData, dni: e.target.value.toUpperCase() })}
                                    placeholder="DNI (ej: 12345678A)"
                                    className="bg-zinc-800 border border-[#D4FF00] rounded px-3 py-2 text-white"
                                />

                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Email"
                                    className="bg-zinc-800 border border-[#D4FF00] rounded px-3 py-2 text-white"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.contratado}
                                    onChange={(e) => setFormData({ ...formData, contratado: e.target.checked })}
                                    className="w-5 h-5 cursor-pointer"
                                    id="contratado"
                                />
                                <label htmlFor="contratado" className="text-white cursor-pointer">
                                    Contratado
                                </label>
                            </div>

                            <input
                                value={formData.imagen}
                                onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                                placeholder="URL imagen (opcional)"
                                className="w-full bg-zinc-800 border border-[#D4FF00] rounded px-3 py-2 text-white"
                            />

                            <div className="flex justify-between items-center pt-4 gap-3">

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    title="Limpiar formulario"
                                    className="bg-zinc-700 text-[#D4FF00] p-3 rounded flex items-center justify-center"
                                >
                                    <ArrowPathIcon className="w-5 h-5" />
                                </button>

                                <button
                                    type="button"
                                    onClick={onClose}
                                    title="Cancelar"
                                    className="border border-zinc-600 text-white p-3 rounded flex items-center justify-center"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>

                                <button
                                    type="submit"
                                    title="Guardar profesor"
                                    className="bg-[#D4FF00] text-black p-3 rounded flex items-center justify-center"
                                >
                                    <CheckIcon className="w-5 h-5" />
                                </button>

                            </div>

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

            {scheduleTeacher && (
                <ScheduleModal
                    teacher={scheduleTeacher}
                    onClose={() => setScheduleTeacher(null)}
                />
            )}

            {editTeacher && (
                <EditTeacherModal
                    teacher={editTeacher}
                    onClose={() => setEditTeacher(null)}
                    onSave={(data) => {
                        console.log("Actualizar backend:", data);
                        setEditTeacher(null);
                    }}
                />
            )}
        </div>
    );
};

export default Profesores;