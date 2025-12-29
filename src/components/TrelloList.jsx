import TrelloCard from "./TrelloCard";
import { MoreHorizontal, Plus } from "lucide-react";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";

const TrelloList = ({ list, onCardClick }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: list.id,
    data: { type: "Column", list },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const cardIds = useMemo(() => list.cards.map((c) => c.id), [list.cards]);

  return (
    <div 
        ref={setNodeRef} 
        style={style} 
        {...attributes} 
        id={list.id}
        className="w-[85vw] md:w-80 flex-shrink-0 flex flex-col max-h-full snap-center"
    >
      <div className="bg-[#f1f2f4] rounded-xl px-3 py-4 flex flex-col max-h-full shadow-lg relative">
        
        <div 
            {...listeners} 
            className="flex justify-between items-center mb-4 px-2 cursor-grab active:cursor-grabbing"
        >
          <h2 className="text-[#172b4d] font-bold text-base">{list.title}</h2>
          <button className="p-1.5 hover:bg-gray-200 rounded text-[#44546f]">
            <MoreHorizontal size={18} />
          </button>
        </div>

        
        <div className="overflow-y-auto px-1 custom-scrollbar min-h-[50px] max-h-[calc(100vh-220px)]">
            <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
                {list.cards.map((card) => (
                    <TrelloCard key={card.id} card={card} onClick={onCardClick} />
                ))}
            </SortableContext>
        </div>

        <div className="mt-2 px-1">
            <button className="w-full flex items-center gap-2 p-2.5 hover:bg-gray-200 rounded-lg text-[#44546f] text-sm font-medium text-left transition-colors">
                <Plus size={18} /><span>Add a card</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default TrelloList;