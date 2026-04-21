import React from "react";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";

const ActivityCard = ({
  id,
  name,
  coach,
  description,
  contact,
  image,
  coachImage,
  onEdit,
  onDelete,
}) => {  
  const navigate = useNavigate();

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(id);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(id);
  };

  return (
    <div 
      className="relative bg-[#242526] border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#CCFF00] hover:shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:-translate-y-2 flex flex-col h-full group"
    >
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

          <div className="border-t border-gray-800 pt-3 mt-auto">
            <p className="text-[#CCFF00] text-[9px] font-bold">
              COACH: <span className="text-white ml-1">{coach}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center p-4 border-t border-gray-800 bg-black/30">
        <div className="relative group">
          <button
            onClick={handleEditClick}
            className="p-2 rounded-lg text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black transition-colors"
          >
            <PencilSquareIcon className="w-6 h-6" />
          </button>
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
            bg-black text-white text-xs px-3 py-1.5 rounded font-medium
            opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20 pointer-events-none">
            Editar actividad
          </span>
        </div>
        <div className="relative group">
          <button
            onClick={handleDeleteClick}
            className="p-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
            bg-black text-white text-xs px-3 py-1.5 rounded font-medium
            opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20 pointer-events-none">
            Eliminar actividad
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
