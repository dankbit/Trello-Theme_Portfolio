import { useState, useMemo } from "react";
import { BOARD_DATA } from "./data"; 
import TrelloList from "./components/TrelloList";
import TrelloCard from "./components/TrelloCard";
import CardModal from "./components/CardModal";
import PortfolioGuide from "./components/PortfolioGuide";
import { AnimatePresence, motion } from "framer-motion";

import { 
    DndContext, 
    DragOverlay, 
    closestCorners, 
    // IMPORT SPECIFIC SENSORS
    MouseSensor,
    TouchSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
    defaultDropAnimationSideEffects 
} from "@dnd-kit/core";
import { 
    arrayMove, 
    sortableKeyboardCoordinates, 
    horizontalListSortingStrategy, 
    SortableContext 
} from "@dnd-kit/sortable";
import { Hand, MousePointer2, Download, Linkedin } from "lucide-react";

// --- CUSTOM X (Twitter) LOGO ---
const XLogo = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// --- REUSABLE IDENTITY PILL ---
const IdentityPill = ({ isMobile }) => (
    <motion.div 
        initial={{ y: -20, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
        className={`
            relative overflow-hidden flex items-center gap-3 bg-black/30 backdrop-blur-xl border border-white/20 
            rounded-2xl shadow-2xl transition-all hover:scale-105 group
            ${isMobile ? 'py-1.5 px-3 mx-auto' : 'py-1.5 px-5'} 
        `}
    >
        <motion.div
            className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
            initial={{ x: '-150%' }}
            animate={{ x: '150%' }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 0.5 }}
        />
        <div className="relative z-10 flex items-center gap-3">
            <span className={`text-white font-black tracking-wide drop-shadow-lg whitespace-nowrap ${isMobile ? 'text-sm' : 'text-lg'}`}>
                Utsav Dodiya
            </span>
            <div className="w-px h-5 bg-white/20"></div>
            <div className="flex items-center gap-1.5">
                <a href="https://www.linkedin.com/in/utsavdodiya" target="_blank" rel="noreferrer"
                   className="p-1.5 bg-white/10 hover:bg-[#0077b5] text-white rounded-lg transition-all shadow-sm flex items-center justify-center hover:scale-110">
                    <Linkedin size={isMobile ? 16 : 18} />
                </a>
                <a href="https://x.com/Utsavvvd" target="_blank" rel="noreferrer"
                   className="p-1.5 bg-white/10 hover:bg-black text-white rounded-lg transition-all shadow-sm flex items-center justify-center hover:scale-110">
                    <XLogo className={isMobile ? "w-4 h-4" : "w-[18px] h-[18px]"} />
                </a>
            </div>
            <a href="https://drive.google.com/file/d/1X2k1QqRWVzc6WqGN_t5Ft3hl-5TMPBXT/view?usp=drive_link" target="_blank" rel="noreferrer"
               className={`flex items-center gap-2 bg-white hover:bg-blue-50 text-[#172b4d] rounded-xl font-extrabold transition-all shadow-md hover:shadow-lg active:scale-95 ${isMobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}>
                <Download size={isMobile ? 14 : 16} className="text-blue-600" />
                <span>Resume</span>
            </a>
        </div>
    </motion.div>
);

const BACKGROUNDS = [
    { id: "blue", value: "bg-[#0079bf]" },
    { id: "orange", value: "bg-gradient-to-r from-orange-400 to-rose-400" },
    { id: "green", value: "bg-gradient-to-br from-emerald-500 to-teal-700" },
    { id: "purple", value: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" },
    { id: "dark", value: "bg-gray-900" },
];

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [lists, setLists] = useState(BOARD_DATA);
  const [activeCard, setActiveCard] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);
  const [currentBg, setCurrentBg] = useState(BACKGROUNDS[0]);

  const columnsId = useMemo(() => lists.map((col) => col.id), [lists]);

  // --- SENSOR CONFIGURATION (Fixes Mobile Scrolling) ---
  const sensors = useSensors(
    // Mouse: Drags instantly after 5px movement
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    // Touch: Waits 250ms before dragging. This allows scrolling!
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, 
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: "0.5" } } }),
  };

  const findContainer = (id) => {
    if (lists.find((list) => list.id === id)) return id;
    return lists.find((list) => list.cards.some((c) => c.id === id))?.id;
  };

  const handleQuickNavigate = (cardId) => {
    const allCards = lists.flatMap(list => list.cards);
    const targetCard = allCards.find(card => card.id === cardId);

    if (targetCard) {
      if (cardId === 'contact-info') {
          const formCard = { ...targetCard, type: "contact-form", title: "Send Me a Message" };
          setSelectedCard(formCard);
      } else {
          setSelectedCard(targetCard);
      }
    } else {
      console.warn(`Card with ID ${cardId} not found.`);
    }
  };

  const handleDragStart = (event) => {
      if (event.active.data.current?.type === "Column") {
          setActiveColumn(event.active.data.current.list);
          return;
      }
      const card = lists.flatMap(l => l.cards).find(c => c.id === event.active.id);
      setActiveCard(card);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.data.current?.type === "Column") return;
    const activeId = active.id;
    const overId = over.id;
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);
    if (!activeContainer || !overContainer || activeContainer === overContainer) return;
    setLists((prev) => {
      const activeList = prev.find((l) => l.id === activeContainer);
      const overList = prev.find((l) => l.id === overContainer);
      const activeIndex = activeList.cards.findIndex((c) => c.id === activeId);
      const overIndex = overList.cards.findIndex((c) => c.id === overId);
      let newIndex;
      if (lists.find((l) => l.id === overId)) {
        newIndex = overList.cards.length + 1;
      } else {
        const isBelowOverItem = over && active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overList.cards.length + 1;
      }
      return prev.map((l) => {
        if (l.id === activeContainer) return { ...l, cards: l.cards.filter((c) => c.id !== activeId) };
        if (l.id === overContainer) {
            const newCards = [...l.cards];
            newCards.splice(newIndex, 0, activeList.cards[activeIndex]);
            return { ...l, cards: newCards };
        }
        return l;
      });
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveCard(null);
    setActiveColumn(null);
    if (!over) return;
    if (active.data.current?.type === "Column") {
        if (active.id !== over.id) {
            setLists((lists) => {
                const activeIndex = lists.findIndex((l) => l.id === active.id);
                const overIndex = lists.findIndex((l) => l.id === over.id);
                return arrayMove(lists, activeIndex, overIndex);
            });
        }
        return;
    }
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);
    if (activeContainer && overContainer && activeContainer === overContainer) {
      const listIndex = lists.findIndex((l) => l.id === activeContainer);
      const list = lists[listIndex];
      const oldIndex = list.cards.findIndex((c) => c.id === active.id);
      const newIndex = list.cards.findIndex((c) => c.id === over.id);
      if (oldIndex !== newIndex) {
        setLists((prev) => {
           const newLists = [...prev];
           newLists[listIndex] = { ...list, cards: arrayMove(list.cards, oldIndex, newIndex) };
           return newLists;
        });
      }
    }
  };

  return (
    <DndContext 
        sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}
    >
        {/* --- MAIN WRAPPER: Use h-[100dvh] to fix mobile browser bar overlapping --- */}
        <div className={`h-[100dvh] w-full flex flex-col overflow-hidden relative selection:bg-blue-300 ${currentBg.value} transition-colors duration-500`}>
            
            <nav className="bg-black/20 backdrop-blur-sm flex flex-col shrink-0 z-30 sticky top-0 shadow-sm border-b border-white/10 relative">
                <div className="h-16 flex items-center justify-between px-4 w-full relative">
                    <div className="flex items-center gap-4">
                        <div className="font-bold tracking-tight flex items-center gap-2 opacity-90 hover:opacity-100 cursor-pointer text-lg text-white">
                            <div className="w-5 h-5 bg-white rounded-[3px] shadow-sm flex items-center justify-center">
                                <div className="w-3 h-3 bg-[#0079bf] rounded-[1px]" />
                            </div>
                            <span className="hidden md:block">Trello Portfolio</span>
                            <span className="md:hidden">Portfolio</span>
                        </div>
                    </div>
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <IdentityPill isMobile={false} />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-black/20 p-1.5 rounded-full backdrop-blur-md border border-white/10">
                            {BACKGROUNDS.map((bg) => (
                                <button 
                                    key={bg.id}
                                    onClick={() => setCurrentBg(bg)}
                                    className={`w-5 h-5 rounded-full cursor-pointer transition-transform hover:scale-110 ${bg.value} ${currentBg.id === bg.id ? 'ring-2 ring-white scale-110' : 'opacity-80 hover:opacity-100'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="md:hidden w-full pb-3 px-2 flex justify-center">
                    <IdentityPill isMobile={true} />
                </div>
            </nav>

            {/* --- SCROLL CONTAINER --- */}
            <main className="flex-1 w-full overflow-x-auto overflow-y-hidden scroll-smooth custom-scrollbar relative">
                
                {/* --- CONTENT CONTAINER --- */}
                {/* h-[calc(100%-40px)]: Forces lists to stop 40px short of the container bottom. */}
                <div className="flex h-[calc(100%-40px)] items-start gap-4 px-4 pt-4 min-w-max">
                    <SortableContext items={columnsId} strategy={horizontalListSortingStrategy}>
                        {lists.map((list) => (
                            <TrelloList key={list.id} list={list} onCardClick={setSelectedCard} />
                        ))}
                    </SortableContext>
                    
                    <div className="w-[85vw] md:w-80 flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity">
                        <button className="w-full bg-white/20 text-white font-medium py-3 px-4 rounded-xl text-left backdrop-blur-sm flex items-center gap-2 hover:bg-white/30 border border-white/10">
                            <span className="text-xl">+</span> Add another list
                        </button>
                    </div>
                </div>
            </main>

            <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 w-[95%] md:w-auto pointer-events-none"
            >
                <div className="bg-black/75 backdrop-blur-xl border border-white/10 text-white py-3 px-5 rounded-full shadow-2xl flex items-center justify-between gap-4 pointer-events-auto">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white/10 rounded-full animate-pulse">
                            <Hand size={16} className="text-yellow-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold">Try Dragging!</span>
                            <span className="text-[14px] text-white/70">Move cards & lists around.</span>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-white/20 hidden md:block"></div>
                    <div className="hidden md:flex items-center gap-2 text-xs text-white/60">
                        <MousePointer2 size={14} />
                        <span>Interactive Portfolio</span>
                    </div>
                </div>
            </motion.div>

            <DragOverlay dropAnimation={dropAnimation}>
                {activeCard ? (
                    <div className="transform rotate-3 scale-105 cursor-grabbing opacity-90">
                       <TrelloCard card={activeCard} onClick={() => {}} />
                    </div>
                ) : null}
                {activeColumn ? (
                    <div className="w-80 opacity-80 rotate-2 cursor-grabbing">
                        <TrelloList list={activeColumn} onCardClick={() => {}} />
                    </div>
                ) : null}
            </DragOverlay>

            <AnimatePresence>
                {selectedCard && (
                <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
                )}
            </AnimatePresence>
            
            <PortfolioGuide onOpenCard={handleQuickNavigate} />
        </div>
    </DndContext>
  )
}

export default App;