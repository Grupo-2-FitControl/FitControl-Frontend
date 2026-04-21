import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  PencilIcon, 
  TrashIcon, 
  UserPlusIcon, 
  MagnifyingGlassIcon, 
  XMarkIcon, 
  UserIcon, 
  PlusIcon,
  CheckIcon 
} from '@heroicons/react/24/outline';
import { userService } from '../../services/userService';

const Users = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(location.state?.openModal || false);
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  
  const [editandoId, setEditandoId] = useState(null);
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

  const handleInputChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const prepararEdicion = (user) => {
    const nombres = user.name.split(" ");
    const nombre = nombres[0];
    const apellidos = nombres.slice(1).join(" ");
    
    setNuevoUsuario({
      nombre: nombre,
      apellidos: apellidos,
      dni: user.dni,
      telefono: user.phone || "",
      email: user.email
    });
    setEditandoId(user.id);
    setShowModal(true);
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

      if (editandoId) {
        await userService.update(editandoId, payload);
      } else {
        await userService.create(payload);
      }
      
      cerrarModal();
      const data = await userService.getAll();
      setUsuarios(data);
    } catch (error) {
      alert("Error en la operación.");
    }
  };

  const cerrarModal = () => {
    setShowModal(false);
    setEditandoId(null);
    setNuevoUsuario({ nombre: "", apellidos: "", dni: "", telefono: "", email: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este socio?")) {
      try {
        await userService.delete(id);
        setUsuarios(usuarios.filter(u => u.id !== id));
      } catch (error) {
        alert("Error al eliminar");
      }
    }
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">
          GESTIÓN DE <span className="text-[#CCFF00]">SOCIOS</span>
        </h1>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative group w-full md:w-80">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#CCFF00]" />
            <input 
              type="text"
              placeholder="BUSCAR SOCIO..."
              className="w-full bg-[#111] border border-gray-800 py-3 pl-12 pr-4 rounded-xl text-[10px] font-bold outline-none focus:border-[#CCFF00] transition-all uppercase"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#CCFF00] text-black p-3 rounded-xl hover:scale-110 transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)]"
          >
            <UserPlusIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* TABLA */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[#CCFF00] text-[10px] uppercase tracking-[2px] font-black">
              <th className="px-6 py-2">Socio</th>
              <th className="px-6 py-2">DNI</th>
              <th className="px-6 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios
              .filter(u => u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || u.dni?.includes(searchTerm))
              .map((user) => (
                <tr key={user.id} className="bg-[#0c0c0c] border border-gray-900 group hover:bg-[#111] transition-all">
                  <td className="px-6 py-4 rounded-l-2xl border-l border-y border-gray-900 text-xs font-black uppercase">{user.name}</td>
                  <td className="px-6 py-4 border-y border-gray-900 text-[11px] text-gray-400">{user.dni}</td>
                  <td className="px-6 py-4 rounded-r-2xl border-r border-y border-gray-900 text-center">
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => prepararEdicion(user)}
                        title="Editar"
                        className="p-2 text-gray-600 hover:text-black hover:bg-[#CCFF00] hover:shadow-[0_0_15px_rgba(204,255,0,0.5)] transition-all rounded-lg"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        title="Eliminar"
                        className="p-2 text-gray-600 hover:text-white hover:bg-red-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all rounded-lg"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* MODAL CON NEÓN AL PASAR EL RATÓN (HOVER) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border-2 border-gray-800 w-full max-w-md rounded-2xl p-8 relative transition-all duration-500 
                          hover:border-[#CCFF00] hover:shadow-[0_0_30px_rgba(204,255,0,0.2)]">
            <button onClick={cerrarModal} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-[#CCFF00] font-black uppercase italic text-2xl mb-6 text-center">
              {editandoId ? 'Actualizar Socio' : 'Nuevo Socio'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="nombre" value={nuevoUsuario.nombre} placeholder="NOMBRE" required onChange={handleInputChange} className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white focus:border-[#CCFF00] outline-none uppercase transition-all" />
              <input name="apellidos" value={nuevoUsuario.apellidos} placeholder="APELLIDOS" required onChange={handleInputChange} className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white focus:border-[#CCFF00] outline-none uppercase transition-all" />
              <input name="dni" value={nuevoUsuario.dni} placeholder="DNI" required onChange={handleInputChange} className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white focus:border-[#CCFF00] outline-none uppercase transition-all" />
              <input name="telefono" value={nuevoUsuario.telefono} placeholder="TELÉFONO" onChange={handleInputChange} className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white focus:border-[#CCFF00] outline-none transition-all" />
              <input name="email" value={nuevoUsuario.email} type="email" placeholder="EMAIL" required onChange={handleInputChange} className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white focus:border-[#CCFF00] outline-none lowercase transition-all" />

              <div className="flex justify-center pt-4">
                <button type="submit" className="bg-[#111] border-2 border-gray-800 text-gray-500 w-16 h-16 rounded-full transition-all duration-300 
                                               hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] 
                                               flex items-center justify-center group">
                  <CheckIcon className="w-8 h-8 stroke-2 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;