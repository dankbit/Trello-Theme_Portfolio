import React from 'react';
import { User, Briefcase, Code, Mail, Navigation } from 'lucide-react';

const PortfolioGuide = ({ onOpenCard }) => {
  

  const iconClass = "w-5 h-5 min-[1360px]:w-6 min-[1360px]:h-6 transition-all";

  const navItems = [
    { 
      label: 'Who is Utsav?', 
      icon: <User className={iconClass + " text-blue-300"} />, 
      cardId: 'about-me', 
      color: 'bg-blue-900/50' 
    },
    { 
      label: 'My Work History', 
      icon: <Briefcase className={iconClass + " text-green-400"} />, 
      cardId: 'exp-tatva-se', 
      color: 'bg-green-900/30'
    },
    { 
      label: 'Shipped Projects', 
      icon: <Code className={iconClass + " text-purple-400"} />, 
      cardId: 'proj-sudoku', 
      color: 'bg-purple-900/30'
    },
    { 
      label: 'Contact Me', 
      icon: <Mail className={iconClass + " text-pink-400"} />, 
      cardId: 'contact-info',   
      color: 'bg-pink-900/30'
    }
  ];

  return (
    <div className="hidden xl:block fixed bottom-8 min-[1360px]:bottom-10 right-8 min-[1360px]:right-16 min-[1440px]:right-24 z-50 transition-all duration-300 ease-in-out">
      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 shadow-2xl rounded-2xl 
                      w-72 min-[1360px]:w-80 min-[1440px]:w-96 
                      p-4 min-[1360px]:p-5 min-[1440px]:p-6 
                      transition-all duration-300 ease-in-out">
        
        {/* HEADER SECTION */}
        <div className="flex items-center gap-3 min-[1360px]:gap-4 mb-3 min-[1360px]:mb-5 pb-3 min-[1360px]:pb-4 border-b border-slate-700">
          <div className="p-2.5 min-[1360px]:p-3 bg-blue-600/20 rounded-xl">
            <Navigation className="w-5 h-5 min-[1360px]:w-6 min-[1360px]:h-6 text-blue-400 transition-all" />
          </div>
          <div>
            {/* Header Text */}
            <h3 className="font-bold text-white text-lg min-[1360px]:text-xl transition-all">
              Quick Navigate
            </h3>
            <p className="text-slate-400 text-xs min-[1360px]:text-sm transition-all">
              Click to open details
            </p>
          </div>
        </div>

        {/* NAVIGATION LIST */}
        <div className="space-y-2 min-[1360px]:space-y-4">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => onOpenCard(item.cardId)}
              className="w-full flex items-center gap-3 min-[1360px]:gap-4 
                         p-2 min-[1360px]:p-3 
                         rounded-xl hover:bg-slate-800 transition-all duration-200 group text-left"
            >
              {/* Icon Container */}
              <div className={`p-2 min-[1360px]:p-3 rounded-lg ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                {item.icon}
              </div>
              
             
              <span className="font-medium text-slate-200 group-hover:text-white 
                               text-base min-[1360px]:text-lg transition-all">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-4 min-[1360px]:mt-6 pt-3 min-[1360px]:pt-4 border-t border-slate-700 text-center">
          <p className="font-bold tracking-widest text-slate-500 uppercase 
                        text-[10px] min-[1360px]:text-xs transition-all">
            Tip: You can drag lists too!
          </p>
        </div>

      </div>
    </div>
  );
};

export default PortfolioGuide;