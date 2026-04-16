import { useState, useEffect } from 'react';
import { teacherService } from '../../services/teacherService';
import TeacherCard from '../../components/teachers/TeachersCard';
import Toast from '../../components/teachers/Toast';
import ScheduleModal from '../../components/teachers/ScheduleModal';
import EditTeacherModal from '../../components/teachers/EditTeacherModal';

import {
    PlusIcon,
    CheckIcon,
    XMarkIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline';

const Profesores = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [toast, setToast] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [editTeacher, setEditTeacher] = useState(null);
    const [scheduleTeacher, setScheduleTeacher] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        dni: '',
        hiring_year: new Date().getFullYear(),
        is_active: true,
        image_url: '',
    });

    // ✅ TOAST CORRECTO
    const showToast = (message, type = 'success') =>
        setToast({ message, type });

    const load = async () => {
        setLoading(true);
        try {
            const res = await teacherService.getAll();
            setTeachers(res.data);
        } catch (e) {
            showToast(e.message || 'Error al cargar', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    // SOLO ACTIVOS + BUSCADOR
    const activeTeachers = teachers
        .filter(t => t.is_active !== false && t.isActive !== false)
        .filter(t =>
            t.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );

    // ── CREAR ─────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.dni.trim()) {
            showToast('Nombre y DNI son obligatorios', 'error');
            return;
        }

        const dniRegex = /^\d{8}[A-Z]$/;
        if (!dniRegex.test(formData.dni)) {
            showToast('DNI inválido', 'error');
            return;
        }

        try {
            const res = await teacherService.create({
                ...formData,
                hiring_year: parseInt(formData.hiring_year),
                image_url: formData.image_url || '',
            });

            setTeachers(prev => [...prev, res.data]);
            showToast('Profesor creado correctamente');

            resetForm();
            setShowModal(false);
        } catch (e) {
            showToast(e.message || 'Error al crear', 'error');
        }
    };

    // ── ELIMINAR ───────────────────────────
    const handleDelete = async (id) => {
        if (!confirm('¿Eliminar este profesor?')) return;

        try {
            await teacherService.delete(id);
            setTeachers(prev => prev.filter(t => t.id !== id));
            showToast('Profesor eliminado');
        } catch (e) {
            showToast(e.message || 'Error al eliminar', 'error');
        }
    };

    // ── GUARDAR EDICIÓN ────────────────────
    const handleSaved = (updated) => {
        setTeachers(prev =>
            prev.map(t => (t.id === updated.id ? updated : t))
        );
        showToast('Profesor actualizado');
        setEditTeacher(null);
    };

    // ── HORARIO (SOLO TOAST, SIN MODAL NI NAVEGACIÓN)
    const handleSchedule = (teacher) => {
        setToast({
            message: `El horario de ${teacher.name} estará disponible próximamente`,
            type: 'info',
        });
    };

    const resetForm = () =>
        setFormData({
            name: '',
            dni: '',
            hiring_year: new Date().getFullYear(),
            is_active: true,
            image_url: '',
        });

    const onClose = () => {
        setShowModal(false);
        resetForm();
    };

    return (
        <div className="p-6 bg-black min-h-screen text-white">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-extrabold uppercase">
                        Profesores Activos
                    </h1>
                    <p className="text-zinc-400 text-sm">
                        Equipo de instructores del gimnasio
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#D4FF00] text-black p-3 rounded font-bold"
                >
                    <PlusIcon className="w-6 h-6" />
                </button>
            </div>

            {/* BUSCADOR */}
            <input
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar profesor..."
                className="w-full bg-zinc-800 p-3 rounded mb-6"
            />

            {/* GRID */}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-4">
                    {activeTeachers.map(t => (
                        <TeacherCard
                            key={t.id}
                            teacher={t}
                            onEdit={setEditTeacher}
                            onDelete={handleDelete}
                            onSchedule={handleSchedule}
                        />
                    ))}
                </div>
            )}

            {/* MODAL CREAR */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-zinc-900 p-6 rounded w-[400px]"
                    >
                        <input
                            value={formData.name}
                            onChange={e =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Nombre"
                            className="w-full p-2 mb-2"
                        />

                        <input
                            value={formData.dni}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    dni: e.target.value.toUpperCase(),
                                })
                            }
                            placeholder="DNI"
                            className="w-full p-2 mb-2"
                        />

                        <div className="flex justify-between mt-4">
                            <button type="button" onClick={onClose}>
                                Cancelar
                            </button>

                            <button type="submit">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* EDIT MODAL */}
            {editTeacher && (
                <EditTeacherModal
                    teacher={editTeacher}
                    onClose={() => setEditTeacher(null)}
                    onSaved={handleSaved}
                />
            )}

            {/* TOAST */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default Profesores;