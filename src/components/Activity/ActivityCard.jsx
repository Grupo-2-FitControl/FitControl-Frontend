import React from "react";
import { useNavigate } from "react-router-dom";
const ActivityCard = ({
  id,
  name,
  coach,
  description,
  contact,
  image,
  coachImage,
}) => {  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(`/activities/${id}`)}
      className="bg-[#242526] border border-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#CCFF00] hover:shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:-translate-y-2 flex flex-col h-full"
    >
      <div className="h-1/2 w-full overflow-hidden">
        <img src={image} className="w-full h-full object-cover" alt={name} />
        
      </div>

      <div className="h-1/2 p-5 flex flex-row gap-4">
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
            <p className="text-gray-300 text-lg leading-relaxed">
              {description}
            </p>
          </div>

          <div className="border-t border-gray-800 pt-3">
            <p className="text-[#CCFF00] text-[9px] font-bold">
              COACH: <span className="text-white ml-1">{coach}</span>
            </p>
            <p className="text-[#CCFF00] text-[9px] font-bold">
              CONTACTO: <span className="text-white ml-1">{contact}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
