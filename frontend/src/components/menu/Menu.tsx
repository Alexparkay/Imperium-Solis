import React from 'react';
import { menu } from './data';
import MenuItem from './MenuItem';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MdSolarPower } from 'react-icons/md';
import { RxEnterFullScreen, RxExitFullScreen } from 'react-icons/rx';
import ChangeThemes from '../ChangesThemes';

// Group the menu items as specified
const groupMenuItems = () => {
  const mainItems = menu.find(item => item.catalog === 'main')?.listItems || [];
  const workflowItems = menu.find(item => item.catalog === 'imperum solis workflow')?.listItems || [];
  
  // Create the groups
  const groups = [
    { name: 'main', items: mainItems },
    { name: 'facilities', items: workflowItems.slice(0, 2) },
    { name: 'energy', items: workflowItems.slice(2, 4) },
    { name: 'outreach', items: workflowItems.slice(4, 6) }
  ];
  
  return groups;
};

const Menu: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = React.useState(true);
  const element = document.getElementById('root');
  const navigate = useNavigate();
  const location = useLocation();
  const menuGroups = groupMenuItems();

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  React.useEffect(() => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      element?.requestFullscreen({ navigationUI: 'auto' });
    }
  }, [element, isFullScreen]);

  return (
    <div className="fixed left-0 top-0 h-screen flex flex-col justify-between py-6 px-4 bg-gradient-to-b from-[#28292b]/90 via-[#28292b]/60 to-[rgba(40,41,43,0.2)] backdrop-blur-xl rounded-r-2xl w-[110px] overflow-visible z-50 shadow-[0_0_25px_rgba(0,0,0,0.3)] border-r border-orange-500/20">
      {/* Enhanced orange gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-orange-600/20 opacity-30"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-orange-500/60 to-transparent rounded-full blur-3xl transform rotate-12 opacity-90"></div>
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tr from-amber-600/50 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-80"></div>
      <div className="absolute top-1/3 -right-12 w-32 h-32 bg-gradient-to-bl from-orange-500/40 to-transparent rounded-full blur-2xl transform rotate-45 opacity-70"></div>
      <div className="absolute bottom-1/4 -left-8 w-40 h-40 bg-gradient-to-tr from-amber-500/30 to-transparent rounded-full blur-2xl transform -rotate-45 opacity-70"></div>

      {/* Logo */}
      <div className="flex items-center justify-center mb-10 relative">
        <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-orange-500/60 via-amber-500/40 to-transparent rounded-full blur-xl transform rotate-12 pointer-events-none"></div>
        <Link to={'/'} className="flex flex-col items-center justify-center">
          <div className="relative bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20">
            <MdSolarPower className="text-white text-2xl" />
          </div>
          <span className="text-white/90 text-xs mt-2 font-semibold">WeaMify</span>
        </Link>
      </div>

      {/* Grouped Menu Items */}
      <div className="flex-grow flex flex-col items-center">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-8 last:mb-0 relative">
            {groupIndex > 0 && <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent absolute -top-4 left-1/2 transform -translate-x-1/2"></div>}
            <div className="space-y-1.5">
              {group.items.map((item, itemIndex) => (
                <MenuItem 
                  key={`${groupIndex}-${itemIndex}`}
                  item={item}
                  isActive={location.pathname === (item.url || '/')}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="mt-auto flex justify-center pt-8">
        <div className="dropdown dropdown-top w-full flex justify-center">
          <div
            tabIndex={0}
            role="button"
            className="relative cursor-pointer group w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-300 overflow-hidden border border-orange-500/20"
          >
            <span className="text-base">Q</span>
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none"></div>
          </div>
          
          <ul
            tabIndex={0}
            className="dropdown-content z-[9999] menu p-2 shadow-lg bg-gradient-to-b from-[#28292b]/90 via-[#28292b]/60 to-[rgba(40,41,43,0.2)] backdrop-blur-xl rounded-lg w-48 border border-orange-500/20"
            style={{ 
              position: 'fixed', 
              bottom: '7rem', 
              left: '110px',
            }}
          >
            {/* Enhanced gradient effect for dropdown */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-orange-600/20 opacity-30 rounded-lg pointer-events-none"></div>
            <Link to={'/profile'}>
              <li>
                <a className="text-white hover:bg-white/10 text-sm py-2">My Profile</a>
              </li>
            </Link>
            <Link to={'/pricing'}>
              <li>
                <a className="text-white hover:bg-white/10 text-sm py-2">Pricing</a>
              </li>
            </Link>
            <li>
              <div className="flex items-center justify-between hover:bg-white/10 p-2 text-white">
                <span className="text-sm">Theme</span>
                <ChangeThemes />
              </div>
            </li>
            <li onClick={toggleFullScreen}>
              <a className="justify-between text-white hover:bg-white/10 text-sm py-2">
                <span>Fullscreen</span>
                {isFullScreen ? (
                  <RxEnterFullScreen className="text-lg" />
                ) : (
                  <RxExitFullScreen className="text-lg" />
                )}
              </a>
            </li>
            <li onClick={() => navigate('/login')}>
              <a className="text-white hover:bg-white/10 text-sm py-2">Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
