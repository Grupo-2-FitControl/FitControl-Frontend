import React from "react";

const ActivityCard = ({ name, coach, description, contact, image, coachImage }) => {
  return (
    
    <div className="bg-[#121212] border border-gray-800 rounded-2xl overflow-hidden flex flex-col h-[400px] w-full shadow-2xl">
      
      
      <div className="h-1/2 w-full overflow-hidden">
        <img 
          src={image} 
          className="w-full h-full object-cover" 
          alt={name} 
        />
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
            <h3 className="text-[#CCFF00] text-2xl font-black italic uppercase leading-none mb-2 truncate">
              {name}
            </h3>
            <p className="text-gray-400 text-sm (14px) leading-tight line-clamp-3 font-medium">
              {description}
            </p>
          </div>

          <div className="border-t border-gray-800 pt-3">
            <p className="text-[#CCFF00] text-[9px] font-bold">COACH: <span className="text-white ml-1">{coach}</span></p>
            <p className="text-[#CCFF00] text-[9px] font-bold">CONTACTO: <span className="text-white ml-1">{contact}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;