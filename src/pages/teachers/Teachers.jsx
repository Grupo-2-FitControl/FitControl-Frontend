import { useState, useEffect } from 'react';
import { teacherService } from '../../services/teacherService';
import TeacherCard from '../../components/teachers/TeachersCard';
import Toast from '../../components/teachers/Toast';
import EditTeacherModal from '../../components/teachers/EditTeacherModal';

import {
    PlusIcon,
    CheckIcon,
    XMarkIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [toast, setToast] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingTeacher, setEditingTeacher] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        dni: '',
        hiring_year: new Date().getFullYear(),
        is_active: true,
        image_url: '',
    });

    const showToast = (message, type = 'success') =>
        setToast({ message, type });

    const loadTeachers = async () => {
        setIsLoading(true);
        try {
            const res = await teacherService.getAll();
            setTeachers(res.data);
        } catch (e) {
            showToast(e.message || 'Error loading teachers', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTeachers();
    }, []);

    const filteredTeachers = teachers
        .filter(t => t.is_active !== false)
        .filter(t =>
            t.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.dni.trim()) {
            showToast('Name and DNI are required', 'error');
            return;
        }

        const dniRegex = /^\d{8}[A-Z]$/;
        if (!dniRegex.test(formData.dni)) {
            showToast('Invalid DNI format (12345678A)', 'error');
            return;
        }

        try {
            const res = await teacherService.create({
                ...formData,
                hiring_year: Number(formData.hiring_year),
            });

            setTeachers(prev => [...prev, res.data]);
            showToast('Teacher created successfully');

            resetForm();
            setIsCreateModalOpen(false);
        } catch (e) {
            showToast(e.message || 'Error creating teacher', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this teacher?')) return;

        try {
            await teacherService.delete(id);
            setTeachers(prev => prev.filter(t => t.id !== id));
            showToast('Teacher deleted');
        } catch (e) {
            showToast(e.message || 'Error deleting teacher', 'error');
        }
    };

    const handleSaved = (updatedTeacher) => {
        setTeachers(prev =>
            prev.map(t => (t.id === updatedTeacher.id ? updatedTeacher : t))
        );
        showToast('Teacher updated');
        setEditingTeacher(null);
    };

    const handleSchedule = (teacher) => {
        showToast(`Schedule for ${teacher.name} coming soon`, 'info');
    };

    const resetForm = () =>
        setFormData({
            name: '',
            dni: '',
            hiring_year: new Date().getFullYear(),
            is_active: true,
            image_url: '',
        });

    return (
        <div className="p-6 bg-black min-h-screen text-white">

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold uppercase">
                        Profesores
                    </h1>
                    <p className="text-zinc-400 text-sm">
                        Gestión de profesores
                    </p>
                </div>

                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-[#D4FF00] text-black p-3 rounded flex items-center justify-center"
                >
                    <PlusIcon className="w-6 h-6" />
                </button>
            </div>

            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar profesor..."
                className="w-full bg-zinc-800 p-3 rounded mb-6"
            />

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-4">
                    {filteredTeachers.map(t => (
                        <TeacherCard
                            key={t.id}
                            teacher={t}
                            onEdit={setEditingTeacher}
                            onDelete={handleDelete}
                            onSchedule={handleSchedule}
                        />
                    ))}
                </div>
            )}

            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 p-4 overflow-y-auto">
                    <div className="bg-zinc-900 rounded p-8 w-full max-w-2xl border border-zinc-700 max-h-[90vh] overflow-y-auto">

                        <h2 className="text-2xl font-extrabold text-[#D4FF00] mb-6 uppercase">
                            Nuevo Profesor
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <input
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                placeholder="Nombre y apellidos"
                                className="w-full bg-zinc-800 border border-[#D4FF00] rounded px-3 py-2 text-white"
                            />

                            <div className="grid grid-cols-2 gap-4">

                                <input
                                    value={formData.dni}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            dni: e.target.value.toUpperCase(),
                                        })
                                    }
                                    placeholder="DNI (12345678A)"
                                    className="bg-zinc-800 border border-[#D4FF00] rounded px-3 py-2 text-white"
                                />

                                <input
                                    type="number"
                                    value={formData.hiring_year}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            hiring_year: e.target.value,
                                        })
                                    }
                                    placeholder="Hiring year"
                                    className="bg-zinc-800 border border-[#D4FF00] rounded px-3 py-2 text-white"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.is_active}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            is_active: e.target.checked,
                                        })
                                    }
                                    className="w-5 h-5 cursor-pointer"
                                />
                                <label className="text-white">
                                    Activo
                                </label>
                            </div>

                            <input
                                value={formData.image_url}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        image_url: e.target.value,
                                    })
                                }
                                placeholder="Imagen URL (opcional)"
                                className="w-full bg-zinc-800 border border-[#D4FF00] rounded px-3 py-2 text-white"
                            />

                            <div className="flex justify-between items-center pt-4 gap-3">

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="group bg-zinc-700 text-[#D4FF00] p-3 rounded relative"
                                >
                                    <ArrowPathIcon className="w-5 h-5" />

                                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                                        Reiniciar formulario
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="group border border-zinc-600 text-white p-3 rounded relative"
                                >
                                    <XMarkIcon className="w-5 h-5" />

                                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                                        Cerrar
                                    </span>
                                </button>

                                <button
                                    type="submit"
                                    className="group bg-[#D4FF00] text-black p-3 rounded relative"
                                >
                                    <CheckIcon className="w-5 h-5" />

                                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                                        Guardar
                                    </span>
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}

            {editingTeacher && (
                <EditTeacherModal
                    teacher={editingTeacher}
                    onClose={() => setEditingTeacher(null)}
                    onSaved={handleSaved}
                />
            )}

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

export default Teachers;