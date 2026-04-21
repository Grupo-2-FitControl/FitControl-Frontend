import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PencilIcon, TrashIcon, UserPlusIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { userService } from '../../services/userService';
const Users = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(location.state?.openModal || false);
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "", apellidos: "", dni: "", telefono: "", email: ""
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await userService.getAll();
        setUsuarios(data);
      } catch (error) {
        console.error("Error conectando al backend:", error);
      }
    };
    cargarDatos();
  }, []);

  useEffect(() => {
    if (location.state?.openModal) {
      setShowModal(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleInputChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: `${nuevoUsuario.nombre} ${nuevoUsuario.apellidos}`,
        dni: nuevoUsuario.dni,
        email: nuevoUsuario.email,
        phone: nuevoUsuario.telefono,
        isActive: true
      };
      const res = await userService.create(payload);
      setUsuarios([...usuarios, res]);
      setShowModal(false);
      setNuevoUsuario({ nombre: "", apellidos: "", dni: "", telefono: "", email: "" });
    } catch (error) {
      alert("Error al guardar: Revisa si el backend 8080 está encendido");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este socio?")) {
      try {
        await userService.delete(id);
        setUsuarios(usuarios.filter(u => u.id !== id));
      } catch (error) {
        alert("Error al eliminar el usuario");
      }
    }
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">
          Gestión de <span className="text-[#CCFF00]">Usuarios</span>
        </h1>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative group w-full md:w-80">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#CCFF00]" />
            <input 
              type="text"
              placeholder="BUSCAR SOCIO..."
              className="w-full bg-[#111] border border-gray-800 py-3 pl-12 pr-4 rounded-xl text-[10px] font-bold tracking-widest outline-none focus:border-[#CCFF00] focus:shadow-[0_0_15px_rgba(204,255,0,0.1)] transition-all uppercase"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#CCFF00] text-black p-3 rounded-xl hover:scale-110 transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)] active:scale-95"
          >
            <UserPlusIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[#CCFF00] text-[10px] uppercase tracking-[2px] font-black">
              <th className="px-6 py-2">Socio</th>
              <th className="px-6 py-2">DNI</th>
              <th className="px-6 py-2">Contacto</th>
              <th className="px-6 py-2 text-center">Estado</th>
              <th className="px-6 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios
              .filter(u => u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || u.dni?.includes(searchTerm))
              .map((user) => (
                <tr key={user.id} className="bg-[#0c0c0c] border border-gray-900 group hover:bg-[#111] transition-all">
                  <td className="px-6 py-4 rounded-l-2xl border-l border-y border-gray-900">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center font-black text-[10px] text-gray-500 uppercase">
                        {user.name ? user.name[0] : 'U'}
                      </div>
                      <span className="text-xs font-black uppercase tracking-tight">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-y border-gray-900 font-mono text-[11px] text-gray-400">{user.dni}</td>
                  <td className="px-6 py-4 border-y border-gray-900 text-[11px]">
                    <div className="flex flex-col">
                      <span className="font-bold">{user.phone || 'Sin teléfono'}</span>
                      <span className="text-[9px] text-gray-500 lowercase">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-y border-gray-900 text-center">
                    <span className={`text-[8px] font-black px-2 py-1 rounded ${user.isActive ? 'bg-[#CCFF00] text-black' : 'bg-red-600 text-white'}`}>
                      {user.isActive ? 'ACTIVO' : 'INACTIVO'}
                    </span>
                  </td>
                  <td className="px-6 py-4 rounded-r-2xl border-r border-y border-gray-900 text-center">
                    <div className="flex justify-center gap-3">
                      <PencilIcon className="w-4 h-4 text-gray-600 hover:text-white cursor-pointer transition-colors" />
                      <TrashIcon 
                        onClick={() => handleDelete(user.id)}
                        className="w-4 h-4 text-gray-600 hover:text-red-500 cursor-pointer transition-colors" 
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-gray-800 w-full max-w-md rounded-2xl p-8 relative transition-all duration-300 hover:border-[#CCFF00] hover:shadow-[0_0_30px_rgba(204,255,0,0.15)]">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-[#CCFF00] font-black uppercase italic tracking-tighter text-2xl mb-6 text-center">Nuevo Usuario</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-1 group-focus-within:text-[#CCFF00]">Nombre</label>
                <input name="nombre" required onChange={handleInputChange} className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#CCFF00] focus:shadow-[0_0_15px_rgba(204,255,0,0.2)] uppercase" />
              </div>
              <div className="group">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-1 group-focus-within:text-[#CCFF00]">Apellidos</label>
                <input name="apellidos" required onChange={handleInputChange} className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#CCFF00] focus:shadow-[0_0_15px_rgba(204,255,0,0.2)] uppercase" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-1 group-focus-within:text-[#CCFF00]">DNI</label>
                  <input name="dni" required onChange={handleInputChange} className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#CCFF00] focus:shadow-[0_0_15px_rgba(204,255,0,0.2)] uppercase" />
                </div>
                <div className="group">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-1 group-focus-within:text-[#CCFF00]">Teléfono</label>
                  <input name="telefono" required onChange={handleInputChange} className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#CCFF00] focus:shadow-[0_0_15px_rgba(204,255,0,0.2)]" />
                </div>
              </div>
              <div className="group">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-1 group-focus-within:text-[#CCFF00]">Email</label>
                <input name="email" type="email" required onChange={handleInputChange} className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#CCFF00] focus:shadow-[0_0_15px_rgba(204,255,0,0.2)] lowercase" />
              </div>
              <button type="submit" className="w-full bg-[#CCFF00] text-black font-black py-4 rounded-xl mt-4 hover:bg-[#b8e600] hover:scale-[1.02] transition-all duration-300 uppercase tracking-widest text-[10px] shadow-[0_10px_20px_rgba(204,255,0,0.15)] active:scale-95">
                Registrar Socio
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;