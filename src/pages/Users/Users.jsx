import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CalendarIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import {userService} from "../../services/userService";
import {activityService} from "../../services/activityService";

const Users = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(location.state?.openModal || false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [activities, setActivities] = useState([]);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [enrolledUsersByActivity, setEnrolledUsersByActivity] = useState({});
  const [userActivities, setUserActivities] = useState({});

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    apellidos: "",
    dni: "",
    registrationYear: new Date().getFullYear(),
    isActive: true,
    actividadIds: [],
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [usersData, activitiesData] = await Promise.all([
          userService.getAll(),
          activityService.getAll()
        ]);
        
        const activitiesSorted = [...activitiesData].sort((a, b) => 
          (a.title || a.name || "").localeCompare(b.title || b.name || "")
        );
        
        setUsuarios(usersData);
        setActivities(activitiesSorted);
        
        const enrolledMap = {};
        for (const act of activitiesData) {
          try {
            const users = await activityService.getEnrolledUsers(act.id);
            enrolledMap[act.id] = users || [];
          } catch {
            enrolledMap[act.id] = [];
          }
        }
        setEnrolledUsersByActivity(enrolledMap);

        const userActs = {};
        for (const user of usersData) {
          try {
            const acts = await userService.getEnrolledActivities(user.id);
            userActs[user.id] = acts || [];
          } catch {
            userActs[user.id] = [];
          }
        }
        setUserActivities(userActs);
      } catch (error) {
        console.error("Error conectando al backend:", error);
      }
    };
    cargarDatos();
  }, []);

  const handleInputChange = (e) => {
    setNuevoUsuario({...nuevoUsuario, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: nuevoUsuario.nombre,
        lastName: nuevoUsuario.apellidos,
        dni: nuevoUsuario.dni,
        registrationYear: parseInt(nuevoUsuario.registrationYear) || new Date().getFullYear(),
        isActive: nuevoUsuario.isActive ?? true,
        imageUrl: nuevoUsuario.imageUrl || "",
      };
      const res = await userService.create(payload);
      if (res) {
        setUsuarios([...usuarios, res]);
        
        if (nuevoUsuario.actividadIds && nuevoUsuario.actividadIds.length > 0) {
          for (const actId of nuevoUsuario.actividadIds) {
            try {
              await activityService.enrollUser(actId, res.id);
            } catch {
              console.warn("No se pudo inscribir en actividad", actId);
            }
          }
          const acts = await userService.getEnrolledActivities(res.id);
          setUserActivities(prev => ({...prev, [res.id]: acts || []}));
          for (const actId of nuevoUsuario.actividadIds) {
            const users = await activityService.getEnrolledUsers(actId);
            setEnrolledUsersByActivity(prev => ({...prev, [actId]: users || []}));
          }
          alert(`Usuario registrado e inscrito en ${nuevoUsuario.actividadIds.length} actividad(es)`);
        }
      }
      setShowModal(false);
      setNuevoUsuario({
        nombre: "",
        apellidos: "",
        dni: "",
        registrationYear: new Date().getFullYear(),
        isActive: true,
        actividadIds: [],
      });
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      const validationErrors = error.response?.data?.validationErrors;
      if (msg && msg.includes("Ya existe")) {
        alert(msg);
      } else if (validationErrors) {
        const errorMsg = Object.entries(validationErrors)
          .map(([field, msg]) => `${field}: ${msg}`)
          .join("\n");
        alert("Errores de validación:\n" + errorMsg);
      } else {
        alert("Error al guardar: " + msg);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este socio?")) {
      try {
        await userService.delete(id);
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
      } catch (error) {
        alert("Error al eliminar el usuario: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleEdit = async (user) => {
    setEditingUser(user);
    let userActIds = [];
    try {
      const acts = await userService.getEnrolledActivities(user.id);
      userActIds = (acts || []).map(a => a.id);
      setUserActivities(prev => ({...prev, [user.id]: acts || []}));
    } catch {
      console.warn("No se pudieron cargar actividades del usuario");
    }
    setNuevoUsuario({
      nombre: user.name || "",
      apellidos: user.lastName || "",
      dni: user.dni || "",
      registrationYear: user.registrationYear || new Date().getFullYear(),
      imageUrl: user.imageUrl || "",
      isActive: user.isActive ?? true,
      actividadIds: userActIds,
    });
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: nuevoUsuario.nombre,
        lastName: nuevoUsuario.apellidos,
        dni: nuevoUsuario.dni,
        registrationYear: parseInt(nuevoUsuario.registrationYear) || new Date().getFullYear(),
        isActive: nuevoUsuario.isActive ?? true,
        imageUrl: nuevoUsuario.imageUrl || "",
      };
      const res = await userService.update(editingUser.id, payload);
      if (res) {
        setUsuarios(usuarios.map((u) => (u.id === editingUser.id ? {...u, ...res} : u)));
        
        const oldActs = userActivities[editingUser.id] || [];
        const oldActIds = oldActs.map(a => a.id);
        const newActIds = nuevoUsuario.actividadIds || [];
        
        const toAdd = newActIds.filter(id => !oldActIds.includes(id));
        const toRemove = oldActIds.filter(id => !newActIds.includes(id));
        
        for (const actId of toAdd) {
          try { await activityService.enrollUser(actId, editingUser.id); } catch {}
        }
        for (const actId of toRemove) {
          try { await activityService.unenrollUser(actId, editingUser.id); } catch {}
        }
        const acts = await userService.getEnrolledActivities(editingUser.id);
        setUserActivities(prev => ({...prev, [editingUser.id]: acts || []}));
        for (const actId of [...toAdd, ...toRemove]) {
          const users = await activityService.getEnrolledUsers(actId);
          setEnrolledUsersByActivity(prev => ({...prev, [actId]: users || []}));
        }
      }
      setShowModal(false);
      setEditingUser(null);
      setNuevoUsuario({nombre: "", apellidos: "", dni: "", registrationYear: new Date().getFullYear(), isActive: true, actividadIds: []});
    } catch (error) {
      const validationErrors = error.response?.data?.validationErrors;
      if (validationErrors) {
        const errorMsg = Object.entries(validationErrors)
          .map(([field, msg]) => `${field}: ${msg}`)
          .join("\n");
        alert("Errores de validación:\n" + errorMsg);
      } else {
        alert("Error al actualizar: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleEnrollUser = async (userId, activityId) => {
    try {
      await activityService.enrollUser(activityId, userId);
      const users = await activityService.getEnrolledUsers(activityId);
      setEnrolledUsersByActivity(prev => ({...prev, [activityId]: users || []}));
      const acts = await userService.getEnrolledActivities(userId);
      setUserActivities(prev => ({...prev, [userId]: acts || []}));
      alert("Usuario inscrito correctamente");
    } catch (error) {
      alert("Error al inscribir: " + (error.response?.data?.message || error.message));
    }
  };

  const handleUnenrollUser = async (userId, activityId) => {
    if (!window.confirm("¿Desinscribir al usuario de esta actividad?")) return;
    try {
      await activityService.unenrollUser(activityId, userId);
      const users = await activityService.getEnrolledUsers(activityId);
      setEnrolledUsersByActivity(prev => ({...prev, [activityId]: users || []}));
      const acts = await userService.getEnrolledActivities(userId);
      setUserActivities(prev => ({...prev, [userId]: acts || []}));
      alert("Usuario desinscrito correctamente");
    } catch (error) {
      alert("Error al desinscribir: " + (error.response?.data?.message || error.message));
    }
  };

  const openEnrollModal = (user) => {
    setSelectedUser(user);
    setShowEnrollModal(true);
  };

  const resetForm = () => {
    setShowModal(false);
    setEditingUser(null);
    setNuevoUsuario({
      nombre: "",
      apellidos: "",
      dni: "",
      registrationYear: new Date().getFullYear(),
      isActive: true,
      actividadIds: [],
    });
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white font-sans">
      {/* HEADER */}
      <div className="flex flex-col flex-wrap md:flex-row justify-between items-center gap-6 mb-12">
        <h1 className="text-5xl text-[#CCFF00] border-l-8 pl-6 border-[#CCFF00] w-full font-black italic uppercase tracking-tighter">
          Usuarios
        </h1>

        <div className="flex items-center gap-4 w-full md:w-full justify-between">
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
              <th className="px-6 py-2">Nombre</th>
              <th className="px-6 py-2">Apellidos</th>
              <th className="px-6 py-2">DNI</th>
              <th className="px-6 py-2">Año Alta</th>
              <th className="px-6 py-2">Actividades</th>
              <th className="px-6 py-2 text-center">Estado</th>
              <th className="px-6 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios
              .filter(
                (u) =>
                  u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  u.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  u.dni?.includes(searchTerm),
              )
              .sort((a, b) => (a.lastName || "").localeCompare(b.lastName || ""))
              .map((user) => (
                <tr key={user.id} className="bg-[#0c0c0c] border border-gray-900 group hover:bg-[#111] transition-all">
                  <td className="px-6 py-4 rounded-l-2xl border-l border-y border-gray-900">
                    <span className="text-xs font-black uppercase tracking-tight">{user.name}</span>
                  </td>
                  <td className="px-6 py-4 border-y border-gray-900">
                    <span className="text-xs font-black uppercase tracking-tight">{user.lastName}</span>
                  </td>
                  <td className="px-6 py-4 border-y border-gray-900 font-mono text-[11px] text-gray-400">{user.dni}</td>
                  <td className="px-6 py-4 border-y border-gray-900 text-[11px] text-gray-400">
                    {user.registrationYear}
                  </td>
                  <td className="px-6 py-4 border-y border-gray-900">
                    <button
                      onClick={() => openEnrollModal(user)}
                      className="text-[10px] text-[#CCFF00] hover:underline flex items-center gap-1"
                    >
                      <CalendarIcon className="w-3 h-3" />
                      {(userActivities[user.id] || []).length > 0 
                        ? `${(userActivities[user.id] || []).length} inscrita(s)`
                        : "Inscribir"}
                    </button>
                  </td>
                  <td className="px-6 py-4 border-y border-gray-900 text-center">
                    <span
                      className={`text-[8px] font-black px-2 py-1 rounded ${user.isActive ? "bg-[#CCFF00] text-black" : "bg-red-600 text-white"}`}
                    >
                      {user.isActive ? "ACTIVO" : "INACTIVO"}
                    </span>
                  </td>
                  <td className="px-6 py-4 rounded-r-2xl border-r border-y border-gray-900 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <div className="relative group/btn">
                        <button
                          onClick={() => openEnrollModal(user)}
                          className="p-2 text-gray-600 hover:text-[#CCFF00] transition-colors"
                        >
                          <CalendarIcon className="w-4 h-4" />
                        </button>
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                          bg-black text-white text-xs px-3 py-1.5 rounded font-medium
                          opacity-0 group-hover/btn:opacity-100 transition whitespace-nowrap z-50 pointer-events-none">
                          Inscribir / Ver actividades
                        </span>
                      </div>
                      <div className="relative group/btn">
                        <PencilIcon
                          onClick={() => handleEdit(user)}
                          className="w-4 h-4 text-gray-600 hover:text-white cursor-pointer transition-colors"
                        />
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                          bg-black text-white text-xs px-3 py-1.5 rounded font-medium
                          opacity-0 group-hover/btn:opacity-100 transition whitespace-nowrap z-50 pointer-events-none">
                          Editar usuario
                        </span>
                      </div>
                      <div className="relative group/btn">
                        <TrashIcon
                          onClick={() => handleDelete(user.id)}
                          className="w-10 h-10 p-2 text-gray-600 hover:text-white hover:bg-red-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all rounded-lg"
                        />
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                          bg-black text-white text-xs px-3 py-1.5 rounded font-medium
                          opacity-0 group-hover/btn:opacity-100 transition whitespace-nowrap z-50 pointer-events-none">
                          Eliminar usuario
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* MODAL NUEVO/EDITAR USUARIO */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-[#111] border border-gray-800 w-full max-w-3xl rounded-2xl p-4 sm:p-6 relative transition-all duration-300 hover:border-[#CCFF00]">
            <button
              onClick={resetForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-white transition-colors z-10"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-[#CCFF00] font-black uppercase italic tracking-tighter text-xl sm:text-2xl mb-4 text-center pr-8">
              {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
            </h2>
            <form onSubmit={editingUser ? handleUpdate : handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-1 group-focus-within:text-[#CCFF00]">
                  Nombre
                </label>
                <input
                  name="nombre"
                  required
                  onChange={handleInputChange}
                  value={nuevoUsuario.nombre}
                  className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#CCFF00] focus:shadow-[0_0_15px_rgba(204,255,0,0.2)] uppercase"
                />
              </div>
              <div className="group">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-1 group-focus-within:text-[#CCFF00]">
                  Apellidos
                </label>
                <input
                  name="apellidos"
                  required
                  onChange={handleInputChange}
                  value={nuevoUsuario.apellidos}
                  className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#CCFF00] focus:shadow-[0_0_15px_rgba(204,255,0,0.2)] uppercase"
                />
              </div>
              <div className="group">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-1 group-focus-within:text-[#CCFF00]">
                  DNI
                </label>
                <input
                  name="dni"
                  required
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, dni: e.target.value.toUpperCase()})}
                  value={nuevoUsuario.dni}
                  className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#CCFF00] focus:shadow-[0_0_15px_rgba(204,255,0,0.2)] uppercase"
                  placeholder="12345678A"
                />
              </div>
              <div className="group">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-1 group-focus-within:text-[#CCFF00]">
                  Año de alta
                </label>
                <input
                  name="registrationYear"
                  type="number"
                  required
                  onChange={handleInputChange}
                  value={nuevoUsuario.registrationYear || new Date().getFullYear()}
                  className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#CCFF00] focus:shadow-[0_0_15px_rgba(204,255,0,0.2)]"
                />
              </div>
              <div className="group">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-1 group-focus-within:text-[#CCFF00]">
                  URL Imagen
                </label>
                <input
                  name="imageUrl"
                  onChange={handleInputChange}
                  value={nuevoUsuario.imageUrl || ""}
                  className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white outline-none transition-all duration-300 focus:border-[#CCFF00] focus:shadow-[0_0_15px_rgba(204,255,0,0.2)]"
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isActive"
                  id="isActive"
                  checked={nuevoUsuario.isActive ?? true}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, isActive: e.target.checked})}
                  className="w-4 h-4 accent-[#CCFF00]"
                />
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Activo</label>
              </div>
              
              {activities.length > 0 && (
                <div className="group md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-2 group-focus-within:text-[#CCFF00]">
                    {editingUser ? "Modificar Actividades (máx. 3)" : "Inscribir en Actividades (máx. 3)"}
                  </label>
                  <p className="text-[9px] text-gray-500 mb-2">
                    Seleccionadas: {nuevoUsuario.actividadIds?.length || 0}/3
                  </p>
                  <div className="space-y-2 max-h-40 overflow-y-auto bg-black border border-gray-800 rounded-lg p-2">
                    {activities.map((act) => {
                      const isSelected = nuevoUsuario.actividadIds?.includes(act.id);
                      return (
                        <label
                          key={act.id}
                          className={`flex items-center gap-2 cursor-pointer p-1 rounded ${isSelected ? 'bg-[#CCFF00]/20' : 'hover:bg-gray-800'}`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected || false}
                            disabled={!isSelected && (nuevoUsuario.actividadIds?.length || 0) >= 3}
                            onChange={(e) => {
                              const current = nuevoUsuario.actividadIds || [];
                              if (e.target.checked) {
                                if (current.length < 3) {
                                  setNuevoUsuario({
                                    ...nuevoUsuario,
                                    actividadIds: [...current, act.id],
                                  });
                                }
                              } else {
                                setNuevoUsuario({
                                  ...nuevoUsuario,
                                  actividadIds: current.filter((id) => id !== act.id),
                                });
                              }
                            }}
                            className="w-4 h-4 accent-[#CCFF00]"
                          />
                          <span className="text-white text-xs">{act.title || act.name}</span>
                          <span className="text-gray-500 text-[10px] ml-auto">{act.schedule}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-end gap-4 pt-2 md:col-span-2">
                <button
                  onClick={resetForm}
                  className="p-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-all"
                  title="Cancelar / Limpiar"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
                <button
                  type="submit"
                  className="p-3 rounded-lg bg-[#CCFF00] text-black hover:bg-[#b8e600] transition-all"
                  title={editingUser ? "Guardar Cambios" : "Registrar Socio"}
                >
                  <CheckIcon className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL INSCRIBIR ACTIVIDADES */}
      {showEnrollModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-[#111] border border-gray-800 w-full max-w-lg rounded-2xl p-6 relative transition-all duration-300 hover:border-[#CCFF00] my-8">
            <button
              onClick={() => {
                setShowEnrollModal(false);
                setSelectedUser(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-[#CCFF00] font-black uppercase italic text-xl mb-2">
              Actividades de {selectedUser.name} {selectedUser.lastName}
            </h2>
            <p className="text-gray-500 text-xs mb-6">DNI: {selectedUser.dni}</p>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {activities.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No hay actividades disponibles</p>
              ) : (
                activities.map((act) => {
                  const enrolledUsers = enrolledUsersByActivity[act.id] || [];
                  const isEnrolled = enrolledUsers.some(u => u.id === selectedUser.id);
                  const capacity = act.capacity || 20;
                  const spotsLeft = Math.max(0, capacity - enrolledUsers.length);
                  
                  return (
                    <div
                      key={act.id}
                      className={`p-3 rounded-lg border ${
                        isEnrolled 
                          ? "border-[#CCFF00] bg-[#CCFF00]/10" 
                          : "border-gray-800 bg-black/50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-white font-bold text-sm">{act.title || act.name}</h3>
                          <p className="text-gray-500 text-xs">
                            {enrolledUsers.length}/{capacity} inscritos
                            {spotsLeft > 0 
                              ? ` • ${spotsLeft} plazas libres` 
                              : spotsLeft === 0 && !isEnrolled 
                                ? " • COMPLETO" 
                                : ""}
                          </p>
                          {act.schedule && <p className="text-gray-400 text-[10px]">{act.schedule}</p>}
                        </div>
                        {isEnrolled ? (
                          <button
                            onClick={() => handleUnenrollUser(selectedUser.id, act.id)}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded font-bold"
                          >
                            Desinscribir
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEnrollUser(selectedUser.id, act.id)}
                            disabled={spotsLeft === 0}
                            className={`text-xs px-3 py-1.5 rounded font-bold ${
                              spotsLeft === 0
                                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                : "bg-[#CCFF00] hover:bg-[#b8e600] text-black"
                            }`}
                          >
                            Inscribir
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
