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
        <div className="w-full min-h-screen bg-[#0A0A0A] p-6 flex flex-col items-center">
            <div className="max-w-[1100px] w-full">

                {/* HEADER */}
                <h1 className="text-[#CCFF00] text-5xl font-black uppercase italic mb-12 border-l-8 border-[#CCFF00] pl-6">
                    PROFESORES
                </h1>

                {/* SEARCH + ADD */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 w-full">

                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="BUSCAR PROFESOR..."
                        className="w-full md:max-w-md bg-[#111] border border-gray-800 text-white text-[10px] font-bold tracking-widest rounded-xl py-4 px-4 outline-none focus:border-[#CCFF00]"
                    />

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="group relative flex items-center justify-center 
            bg-[#CCFF00] hover:bg-[#b8e600] text-black 
            w-12 h-12 rounded-xl transition-all 
            hover:scale-110 active:scale-95 
            shadow-[0_0_20px_rgba(204,255,0,0.2)] z-10"
                    >
                        <PlusIcon className="w-6 h-6" />

                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
            bg-black text-white text-xs px-2 py-1 rounded 
            opacity-0 group-hover:opacity-100 transition z-50 whitespace-nowrap">
                            Nuevo profesor
                        </span>
                    </button>

                </div>

                {/* LIST */}
                {isLoading ? (
                    <p className="text-white">Loading...</p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
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

                {/* MODAL CREATE */}
                {isCreateModalOpen && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">

                        <div className="bg-[#1A1A1A] p-8 rounded-xl w-full max-w-xl border-2 border-transparent hover:border-[#CCFF00]">

                            {/* HEADER */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-[#CCFF00] text-2xl font-bold uppercase">
                                    Nuevo Profesor
                                </h2>

                                <button
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="group relative"
                                >
                                    <XMarkIcon className="w-6 h-6 text-gray-400 hover:text-white" />
                                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                  bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                                        Cerrar
                                    </span>
                                </button>
                            </div>

                            {/* FORM COMPLETO ORIGINAL */}
                            <form onSubmit={handleSubmit} className="space-y-4">

                                {/* NAME */}
                                <div>
                                    <label className="text-gray-400 text-sm uppercase">Nombre y apellidos</label>
                                    <input
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="w-full bg-[#262626] p-2 rounded text-white border border-gray-800 focus:border-[#CCFF00]"
                                    />
                                </div>

                                {/* DNI + YEAR */}
                                <div className="grid grid-cols-2 gap-4">

                                    <input
                                        value={formData.dni}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                dni: e.target.value.toUpperCase(),
                                            })
                                        }
                                        placeholder="DNI"
                                        className="bg-[#262626] p-2 rounded text-white border border-gray-800 focus:border-[#CCFF00]"
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
                                        className="bg-[#262626] p-2 rounded text-white border border-gray-800 focus:border-[#CCFF00]"
                                    />
                                </div>

                                {/* ACTIVE */}
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
                                        className="accent-[#CCFF00]"
                                    />
                                    <label className="text-gray-300 uppercase text-sm">
                                        Activo
                                    </label>
                                </div>

                                {/* IMAGE */}
                                <input
                                    value={formData.image_url}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            image_url: e.target.value,
                                        })
                                    }
                                    placeholder="Imagen URL"
                                    className="w-full bg-[#262626] p-2 rounded text-white border border-gray-800 focus:border-[#CCFF00]"
                                />

                                {/* BUTTONS */}
                                <div className="flex justify-end gap-6 mt-6">

                                    <button type="button" onClick={resetForm} className="group relative">
                                        <ArrowPathIcon className="w-6 h-6 text-gray-400 hover:text-white" />
                                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition z-50">
                                            Reiniciar
                                        </span>
                                    </button>

                                    <button type="button" onClick={() => setIsCreateModalOpen(false)} className="group relative">
                                        <XMarkIcon className="w-6 h-6 text-red-400" />
                                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition z-50">
                                            Cancelar
                                        </span>
                                    </button>

                                    <button type="submit" className="group relative">
                                        <CheckIcon className="w-6 h-6 text-[#CCFF00]" />
                                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition z-50">
                                            Guardar
                                        </span>
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                )}

                {/* EDIT MODAL */}
                {editingTeacher && (
                    <EditTeacherModal
                        teacher={editingTeacher}
                        onClose={() => setEditingTeacher(null)}
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
        </div>
    );
};

export default Teachers;