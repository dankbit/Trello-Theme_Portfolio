import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { ThumbsUp, ThumbsDown, Send } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TrelloCard = ({ card, onClick }) => {
  const [feedbackState, setFeedbackState] = useState("idle");
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id, data: { ...card } });
  const style = { transform: CSS.Translate.toString(transform), transition, opacity: isDragging ? 0.3 : 1 };

  const handleLike = (e) => { e.stopPropagation(); setFeedbackState("yes"); confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); };
  const handleDislike = (e) => { e.stopPropagation(); setFeedbackState("no"); };
  const handleSubmitFeedback = (e) => { e.preventDefault(); setFeedbackState("submitted"); };

  if (card.type === "feedback") {
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <motion.div layoutId={`card-${card.id}`} className="bg-white rounded-lg p-5  shadow-sm mb-3 border-b-4 border-blue-500 relative overflow-hidden cursor-grab active:cursor-grabbing">
             {feedbackState === "idle" && (
                <>
                    <h3 className="text-gray-800 font-bold text-base mb-3">Did you like my portfolio?</h3>
                    <div className="flex gap-3">
                        <button onPointerDown={(e) => e.stopPropagation()} onClick={handleLike} className="flex-1 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-md font-bold text-sm flex items-center justify-center gap-2 transition-colors"><ThumbsUp size={16} /> YES</button>
                        <button onPointerDown={(e) => e.stopPropagation()} onClick={handleDislike} className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-md font-bold text-sm flex items-center justify-center gap-2 transition-colors"><ThumbsDown size={16} /> NO</button>
                    </div>
                </>
             )}
             
             {feedbackState === "yes" && <div className="text-center py-4"><div className="text-4xl mb-2">🎉</div><h3 className="font-bold text-gray-800">Thank You!</h3></div>}
             {feedbackState === "no" && <form onSubmit={handleSubmitFeedback}><textarea className="w-full text-xs p-2 border border-gray-300 rounded mb-2" rows={3} placeholder="Feedback..." onPointerDown={(e) => e.stopPropagation()} /><button type="submit" className="w-full py-2 bg-blue-600 text-white rounded text-xs font-bold" onPointerDown={(e) => e.stopPropagation()}>Send</button></form>}
             {feedbackState === "submitted" && <div className="text-center py-4"><div className="text-4xl mb-2">📬</div><h3 className="font-bold text-gray-800">Sent</h3></div>}
          </motion.div>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <motion.div 
            layoutId={`card-${card.id}`} onClick={() => onClick(card)}
            className="bg-white rounded-lg p-4 shadow-sm mb-3 cursor-grab active:cursor-grabbing border border-transparent hover:border-blue-500 relative group overflow-hidden"
            whileHover={{ y: -2 }}
        >
            {card.coverImage && <div className="h-32 -mx-4 -mt-4 mb-4 rounded-t-lg overflow-hidden bg-gray-100 relative"><img src={card.coverImage} alt="Cover" className="w-full h-full object-cover pointer-events-none" /></div>}
            
            {card.labels && <div className="flex flex-wrap gap-1.5 mb-2.5">{card.labels.map((label, idx) => (<span key={idx} className={`px-2 py-1 rounded text-xs font-bold text-white flex items-center ${label.color}`}>{label.text}</span>))}</div>}
            
            <h3 className="text-[#172b4d] font-semibold text-base leading-tight mb-1.5">{card.title}</h3>
            
            {card.content && <p className="text-[#5e6c84] text-sm leading-snug line-clamp-2 mb-3">{card.content}</p>}
            
            <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-1 text-gray-400"><div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center text-xs">≡</div></div>
                
               
                <div className="flex gap-1">
                    {card.members && card.members.map((Icon, idx) => (
                        <div key={idx} className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 shadow-sm">
                            <Icon size={14} />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default TrelloCard;