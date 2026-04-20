import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PencilIcon, TrashIcon, UserCircleIcon, UserPlusIcon, CheckIcon } from '@heroicons/react/24/outline';

const Users = () => {
  const location = useLocation();
  
  // 1. Estados iniciales
  const [showModal, setShowModal] = useState(location.state?.openModal || false);
  const claseVinculada = location.state?.nombreClase || "";

  // 2. Efecto para detectar si venimos de "Asignar Cupo"
  useEffect(() => {
    if (location.state?.openModal) {
      setShowModal(true);
      // Limpiamos el estado para que no se abra solo al recargar
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      
      {/* CABECERA Y BUSCADOR */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">
            Gestión de <span className="text-[#CCFF00]">Usuarios</span>
          </h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[3px]">Panel de Recepción</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 group transition-all duration-300"
        >
          <div className="relative p-2 border border-gray-800 rounded-full group-hover:border-[#CCFF00] group-hover:shadow-[0_0_10px_#CCFF00] transition-all">
            <UserPlusIcon className="w-6 h-6 text-gray-500 group-hover:text-[#CCFF00]" />
          </div>
          <span className="text-xs font-bold text-gray-500 group-hover:text-white tracking-widest transition-all">
            AÑADIR
          </span>
        </button>
      </div>

      {/* GRID DE USUARIOS (Ejemplo) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 hover:border-[#CCFF00]/50 transition-all group relative overflow-hidden">
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#CCFF00] shadow-[0_0_8px_#CCFF00]"></div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-4 border border-gray-800 group-hover:border-[#CCFF00]/30 transition-all">
              <UserCircleIcon className="w-12 h-12 text-gray-600" />
            </div>
            <h2 className="text-lg font-bold uppercase tracking-tight">Usuario Ejemplo</h2>
            <p className="text-[#CCFF00] text-[10px] font-mono mb-6 tracking-widest italic">ID: #00000</p>
            
            <div className="flex gap-8 justify-center w-full pt-4 border-t border-gray-800/50">
              <button className="text-gray-600 hover:text-white transition-all transform hover:scale-125">
                <PencilIcon className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-red-500 transition-all transform hover:scale-125">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL NEÓN: REGISTRAR PERFIL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex justify-center items-center z-50 p-4">
          <div className="bg-[#0a0a0a] border-2 border-[#CCFF00] p-8 rounded-3xl w-full max-w-md shadow-[0_0_40px_rgba(204,255,0,0.2)]">
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-[#CCFF00] rounded-full shadow-[0_0_10px_#CCFF00]"></div>
              <h2 className="text-2xl font-black tracking-tighter uppercase italic">Registrar <span className="text-[#CCFF00]">Perfil</span></h2>
            </div>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              
              {/* CAMPO DE ACTIVIDAD AUTOMÁTICO */}
              <div className="space-y-1">
                <label className="text-[9px] text-[#CCFF00] font-bold ml-1 uppercase tracking-[2px]">Actividad Vinculada</label>
                <input 
                  type="text" 
                  defaultValue={claseVinculada} 
                  placeholder="REGISTRO GENERAL"
                  readOnly={!!claseVinculada}
                  className="w-full bg-[#111] border border-[#CCFF00]/30 text-[#CCFF00] p-3 rounded-xl text-xs font-black outline-none shadow-[inset_0_0_10px_rgba(204,255,0,0.05)]" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-gray-500 font-bold ml-1 uppercase tracking-[2px]">Datos Personales</label>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="NOMBRE" className="bg-[#161616] border border-gray-800 text-white p-3 rounded-xl text-xs outline-none focus:border-[#CCFF00] focus:shadow-[0_0_10px_rgba(204,255,0,0.2)] transition-all" />
                  <input type="text" placeholder="APELLIDOS" className="bg-[#161616] border border-gray-800 text-white p-3 rounded-xl text-xs outline-none focus:border-[#CCFF00] focus:shadow-[0_0_10px_rgba(204,255,0,0.2)] transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-gray-500 font-bold ml-1 uppercase tracking-[2px]">Contacto</label>
                <input type="tel" placeholder="TELÉFONO" className="w-full bg-[#161616] border border-gray-800 text-white p-3 rounded-xl text-xs outline-none focus:border-[#CCFF00] transition-all mb-2" />
                <input type="text" placeholder="URL FOTO PERFIL" className="w-full bg-[#161616] border border-gray-800 text-white p-3 rounded-xl text-xs outline-none focus:border-[#CCFF00] transition-all" />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#111] rounded-xl border border-gray-800 hover:border-gray-600 transition-all">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Estado Activo</span>
                <input type="checkbox" className="w-5 h-5 accent-[#CCFF00] cursor-pointer shadow-[0_0_10px_rgba(204,255,0,0.3)]" defaultChecked />
              </div>

              <div className="flex justify-end items-center gap-8 mt-10 pt-4 border-t border-gray-900">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 hover:text-red-500 transition-all transform hover:scale-125"
                >
                  <span className="text-4xl font-light">&times;</span>
                </button>
                <button 
                  type="submit" 
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 hover:text-[#CCFF00] transition-all transform hover:scale-125"
                >
                  <CheckIcon className="w-10 h-10 shadow-[0_0_15px_rgba(204,255,0,0.2)]" />
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