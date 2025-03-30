import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';

interface MenuItemProps {
  item: {
    isLink: boolean;
    url?: string;
    icon: IconType;
    label: string;
    onClick?: () => void;
  };
  isActive: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  if (item.isLink) {
    return (
      <div 
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <NavLink
          to={item.url || '/'}
          className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isActive
              ? 'text-white'
              : 'text-white/60 hover:text-white/90'
          }`}
        >
          {/* Active state indicator */}
          {isActive && (
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-r-full shadow-[0_0_10px_rgba(249,115,22,0.4)]" />
          )}
          
          {/* Icon container */}
          <div className={`w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-300 ${
            isActive 
              ? 'text-white bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-orange-600/10 shadow-inner shadow-orange-500/20 border border-orange-500/20' 
              : 'text-white/80 hover:text-white hover:bg-gradient-to-br hover:from-orange-500/10 hover:via-amber-500/5 hover:to-orange-600/10 border border-transparent hover:border-orange-500/20'
          }`}>
            <div className="relative w-full h-full flex items-center justify-center">
              {isActive && (
                <>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-orange-500/40 to-transparent rounded-full blur-lg transform rotate-12"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-tr from-amber-500/30 to-transparent rounded-full blur-lg transform -rotate-12"></div>
                </>
              )}
              {React.createElement(item.icon, { 
                className: `text-2xl relative z-10 ${isActive ? 'text-white' : 'group-hover:text-white'}`
              })}
            </div>
          </div>
        </NavLink>
        
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gradient-to-br from-[#28292b]/90 via-[#28292b]/60 to-[rgba(40,41,43,0.2)] backdrop-blur-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[120px] z-[9999] shadow-lg shadow-black/20 border border-orange-500/20">
            {/* Enhanced orange gradient effects for tooltip */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-orange-600/20 opacity-30 rounded-lg"></div>
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-orange-500/60 to-transparent rounded-full blur-xl transform rotate-12"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-tr from-amber-600/50 to-transparent rounded-full blur-lg transform -rotate-12"></div>
            
            {/* Arrow */}
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-orange-600/20 transform rotate-45 border-l border-t border-orange-500/20"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <p className="text-white/90 text-sm whitespace-nowrap">{item.label}</p>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={item.onClick}
          className="block relative"
        >
          <div className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 
            text-slate-400 hover:text-white hover:bg-orange-500/5 border border-transparent hover:border-orange-500/5
          `}>
            <item.icon className="text-2xl hover:text-orange-400" />
          </div>
        </button>
        
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-[#28292b]/90 via-[#28292b]/60 to-[rgba(40,41,43,0.4)] text-white text-sm px-3 py-2 rounded-lg z-50 whitespace-nowrap pointer-events-none border border-orange-500/20 shadow-lg backdrop-blur-xl">
            {/* Enhanced gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-purple-500/10 to-blue-500/20 opacity-30 rounded-lg"></div>
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-orange-500/40 to-transparent rounded-full blur-xl transform rotate-12 opacity-90"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-tr from-blue-500/30 to-transparent rounded-full blur-lg transform -rotate-12 opacity-80"></div>
            <span className="relative z-10">{item.label.replace('\n', ' ')}</span>
          </div>
        )}
      </div>
    );
  }
};

export default MenuItem;
