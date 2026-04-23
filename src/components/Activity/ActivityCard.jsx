import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon, UserIcon, ClockIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { activityService } from "../../services/activityService";

const ActivityCard = ({
  id,
  name,
  coach,
  description,
  image,
  coachImage,
  capacity = 20,
  enrolledCount = 0,
  enrolledUsers = [],
  schedule,
  price,
  onEdit,
  onDelete,
  onEnrollSuccess,
  allUsers = [],
}) => {
  const [showUsers, setShowUsers] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const freeSpots = Math.max(0, capacity - enrolledCount);  
  const navigate = useNavigate();

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(id);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(id);
  };

  const handleEnrollUser = async (userId) => {
    try {
      await activityService.enrollUser(id, userId);
      if (onEnrollSuccess) onEnrollSuccess();
      setShowEnrollModal(false);
      alert("Usuario inscrito correctamente");
    } catch (error) {
      alert("Error al inscribir: " + (error.response?.data?.message || error.message));
    }
  };

  const enrolledUserIds = enrolledUsers.map(u => u.id);
  const availableUsers = allUsers.filter(u => 
    u.isActive !== false && !enrolledUserIds.includes(u.id)
  );

  return (
    <>
    <div 
      className="relative bg-[#242526] border border-gray-800 rounded-2xl overflow-visible transition-all duration-300 hover:border-[#CCFF00] hover:shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:-translate-y-2 flex flex-col h-full group"
    >
      {price > 0 && (
        <div className="absolute top-0 right-0 bg-[#FF5722] text-white font-bold px-3 py-1 rounded-bl-lg z-10">
          {price}€
        </div>
      )}

      <div className="h-1/2 w-full overflow-hidden" onClick={() => navigate(`/activities/${id}`)}>
        <img src={image} className="w-full h-full object-cover" alt={name} />
      </div>

      <div className="h-1/2 p-5 flex flex-row gap-4" onClick={() => navigate(`/activities/${id}`)}>
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full border-2 border-[#CCFF00] overflow-hidden">
            <img
              src={coachImage}
              className="w-full h-full object-cover"
              alt={coach}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <h3 className="text-[#FF4500] text-2xl font-black italic uppercase leading-none mb-2 truncate">
              {name}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          <div className="border-t border-gray-800 pt-3 mt-auto space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    freeSpots === 0 ? 'bg-red-500' : 
                    freeSpots <= 3 ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`}
                  style={{ width: `${capacity > 0 ? Math.min(100, (enrolledCount / capacity) * 100) : 0}%` }}
                />
              </div>
              <span className={`text-[9px] font-bold min-w-[50px] text-right ${
                freeSpots === 0 ? 'text-red-500' : 
                freeSpots <= 3 ? 'text-yellow-500' : 
                'text-green-500'
              }`}>
                {freeSpots === 0 ? 'COMPLETO' : `${freeSpots} plazas`}
              </span>
            </div>
            <div className="flex items-center justify-between text-[9px]">
              <span className="text-gray-400">
                <span className="text-white font-semibold">{enrolledCount}</span>/{capacity}
              </span>
              <span className="text-gray-500">inscritos</span>
            </div>
            
            {schedule && (
              <div className="flex items-center gap-1 text-[9px] text-gray-400">
                <ClockIcon className="w-3 h-3" />
                <span className="text-white">{schedule}</span>
              </div>
            )}
            <p className="text-[#CCFF00] text-[9px] font-bold">
              COACH: <span className="text-white ml-1">{coach}</span>
            </p>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowUsers(!showUsers);
              }}
              className="relative group/btn flex items-center justify-center w-full py-1 mt-2 text-[10px] text-gray-400 hover:text-[#CCFF00] transition-colors"
            >
              {showUsers ? (
                <>
                  <ChevronUpIcon className="w-3 h-3 mr-1" />
                  Ocultar usuarios
                </>
              ) : (
                <>
                  <ChevronDownIcon className="w-3 h-3 mr-1" />
                  Ver usuarios inscritos ({enrolledUsers.length})
                </>
              )}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 
                bg-black text-white text-xs px-3 py-1.5 rounded font-medium
                opacity-0 group-hover/btn:opacity-100 transition whitespace-nowrap z-50 pointer-events-none">
                {showUsers ? 'Ocultar lista' : 'Ver lista de inscritos'}
              </span>
            </button>
            
            {showUsers && (
              <div className="mt-2 space-y-1 max-h-32 overflow-y-auto bg-black/30 rounded-lg p-2">
                {enrolledUsers.length === 0 ? (
                  <p className="text-gray-500 text-[9px] text-center">No hay usuarios inscritos</p>
                ) : (
                  enrolledUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-2 text-[9px]">
                      <UserIcon className="w-3 h-3 text-gray-500" />
                      <span className="text-white truncate">
                        {user.name} {user.lastName}
                      </span>
                      <span className="text-gray-500 ml-auto">{user.dni}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center p-4 border-t border-gray-800 bg-black/30 overflow-visible">
        <div className="relative group/btn">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowEnrollModal(true);
            }}
            disabled={freeSpots === 0}
            className={`p-2 rounded-lg transition-colors ${
              freeSpots === 0 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-green-500 hover:bg-green-500 hover:text-white'
            }`}
          >
            <UserPlusIcon className="w-6 h-6" />
          </button>
          <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 
            bg-black text-white text-xs px-3 py-1.5 rounded font-medium
            opacity-0 group-hover/btn:opacity-100 transition whitespace-nowrap z-50 pointer-events-none">
            Inscribir usuario
          </span>
        </div>
        
        <div className="flex gap-2">
          <div className="relative group/btn">
            <button
              onClick={handleEditClick}
              className="p-2 rounded-lg text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black transition-colors"
            >
              <PencilIcon className="w-6 h-6" />
            </button>
            <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 
              bg-black text-white text-xs px-3 py-1.5 rounded font-medium
              opacity-0 group-hover/btn:opacity-100 transition whitespace-nowrap z-50 pointer-events-none">
              Editar actividad
            </span>
          </div>
          <div className="relative group/btn">
            <button
              onClick={handleDeleteClick}
              className="p-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"
            >
<TrashIcon className="w-6 h-6" />
            </button>
            <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 
              bg-black text-white text-xs px-3 py-1.5 rounded font-medium
              opacity-0 group-hover/btn:opacity-100 transition whitespace-nowrap z-50 pointer-events-none">
              Eliminar actividad
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Modal de inscripción */}
    {showEnrollModal && (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-[#1A1A1A] border border-gray-700 rounded-2xl w-full max-w-md p-6 relative">
          <button
            onClick={() => setShowEnrollModal(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-white"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          
          <h3 className="text-[#CCFF00] font-black uppercase text-lg mb-1">Inscribir en {name}</h3>
          <p className="text-gray-500 text-xs mb-4">{freeSpots} plazas disponibles</p>
          
          <div className="max-h-72 overflow-y-auto space-y-2">
            {availableUsers.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Todos los usuarios ya están inscritos o no hay usuarios activos</p>
            ) : (
              availableUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-black/50 border border-gray-800 rounded-lg hover:border-[#CCFF00] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#CCFF00]/20 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-[#CCFF00]" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{user.name} {user.lastName}</p>
                      <p className="text-gray-500 text-xs">{user.dni}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEnrollUser(user.id)}
                    className="px-3 py-1.5 bg-[#CCFF00] text-black text-xs font-bold rounded-lg hover:bg-[#b8e600] transition-colors"
                  >
                    Inscribir
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default ActivityCard;