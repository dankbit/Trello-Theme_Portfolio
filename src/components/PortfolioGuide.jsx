import React, { useState, useEffect, useRef } from 'react';
import { User, Briefcase, Code, Mail, Navigation, Grip } from 'lucide-react';

const PortfolioGuide = ({ onOpenCard }) => {
  // Default dimensions
  const [width, setWidth] = useState(320);
  const [height, setHeight] = useState('auto'); // Start as auto to fit content
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);

  const iconClass = "w-5 h-5 min-[1360px]:w-6 min-[1360px]:h-6 transition-all";

  const navItems = [
    { label: 'Who is Utsav?', icon: <User className={iconClass + " text-blue-300"} />, cardId: 'about-me', color: 'bg-blue-900/50' },
    { label: 'My Work History', icon: <Briefcase className={iconClass + " text-green-400"} />, cardId: 'exp-tatva-se', color: 'bg-green-900/30' },
    { label: 'Shipped Projects', icon: <Code className={iconClass + " text-purple-400"} />, cardId: 'proj-sudoku', color: 'bg-purple-900/30' },
    { label: 'Contact Me', icon: <Mail className={iconClass + " text-pink-400"} />, cardId: 'contact-info', color: 'bg-pink-900/30' }
  ];

  const startResizing = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const resize = (e) => {
    if (isResizing && sidebarRef.current) {
      const rect = sidebarRef.current.getBoundingClientRect();

      // 1. Calculate New Width (Distance from Mouse X to Right Edge)
      const newWidth = rect.right - e.clientX;
      
      // 2. Calculate New Height (Distance from Mouse Y to Bottom Edge)
      const newHeight = rect.bottom - e.clientY;

      // Apply Width Constraints (Min 280px, Max 600px)
      if (newWidth > 280 && newWidth < 600) {
        setWidth(newWidth);
      }

      // Apply Height Constraints (Min 200px, Max 800px)
      if (newHeight > 200 && newHeight < 800) {
        setHeight(newHeight);
      }
    }
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  return (
    <div 
      ref={sidebarRef}
      // Fixed at bottom-right. 
      // We set height/width via inline styles to update instantly.
      className="hidden xl:flex flex-col fixed bottom-8 min-[1360px]:bottom-10 right-8 min-[1360px]:right-16 min-[1440px]:right-24 z-50 bg-slate-900/95 backdrop-blur-sm border border-slate-700 shadow-2xl rounded-2xl overflow-hidden transition-shadow"
      style={{ 
        width: `${width}px`, 
        height: height === 'auto' ? 'auto' : `${height}px` 
      }}
    >
      
      {/* --- CORNER RESIZE HANDLE (Top-Left) --- */}
      <div
        onMouseDown={startResizing}
        className={`
          absolute top-0 left-0 w-8 h-8 cursor-nw-resize z-50 
          flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 rounded-br-xl transition-all
          ${isResizing ? 'bg-blue-500 text-white' : ''}
        `}
      >
        <Grip size={16} />
      </div>

      {/* --- CONTENT --- */}
      {/* overflow-y-auto ensures scrolling if user shrinks height too much */}
      <div className="flex flex-col h-full w-full overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="p-5 pl-10 border-b border-slate-700 flex items-center gap-3 shrink-0">
          <div className="p-2.5 bg-blue-600/20 rounded-xl shrink-0">
            <Navigation className="w-5 h-5 text-blue-400" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-white text-lg truncate">Quick Navigate</h3>
            <p className="text-slate-400 text-xs truncate">Resize via corner</p>
          </div>
        </div>

        {/* List Items */}
        <div className="p-5 space-y-2 flex-1">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => onOpenCard(item.cardId)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition-all duration-200 group text-left shrink-0"
            >
              <div className={`p-2 rounded-lg ${item.color} group-hover:scale-110 transition-transform shrink-0`}>
                {item.icon}
              </div>
              <span className="font-medium text-slate-200 group-hover:text-white truncate text-base">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 text-center shrink-0">
          <p className="font-bold tracking-widest text-slate-500 uppercase text-[10px] truncate">
            Tip: Drag lists & Resize me!
          </p>
        </div>

      </div>
    </div>
  );
};

export default PortfolioGuide;