import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

import ProjectLayout from "./layouts/ProjectLayout";
import ExperienceLayout from "./layouts/ExperienceLayout";
import EducationLayout from "./layouts/EducationLayout";
import ContactLayout from "./layouts/ContactLayout";
import AboutLayout from "./layouts/AboutLayout";


const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
const modalVariants = { hidden: { opacity: 0, scale: 0.95, y: 20 }, visible: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 10 } };

// Mapping Strategy Pattern
const LAYOUT_COMPONENTS = {
    "project": ProjectLayout,
    "experience": ExperienceLayout,
    "education": EducationLayout,
    "contact-form": ContactLayout,
    "default": AboutLayout
};

const CardModal = ({ card, onClose }) => {
    if (!card) return null;

    useEffect(() => { 
        const handleEsc = (e) => e.key === "Escape" && onClose(); 
        window.addEventListener("keydown", handleEsc); 
        return () => window.removeEventListener("keydown", handleEsc); 
    }, [onClose]);

    // Determines which component to render based on card.type
    const ContentComponent = LAYOUT_COMPONENTS[card.type] || LAYOUT_COMPONENTS["default"];

    return (
        <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end md:items-center justify-center p-0 md:p-4 overflow-y-auto" 
            variants={backdropVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit" 
            onClick={onClose}
        >
            <motion.div 
                className="bg-[#f4f5f7] w-full md:w-full md:max-w-4xl rounded-t-2xl md:rounded-2xl shadow-2xl relative flex flex-col mt-16 md:my-8 max-h-[90vh] md:max-h-[90vh]" 
                variants={modalVariants} 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Image */}
                {card.coverImage && (
                    <div className="h-36 md:h-72 relative shrink-0 rounded-t-2xl overflow-hidden group">
                        <img src={card.coverImage} alt="Cover" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                    </div>
                )}

                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 md:top-5 md:right-5 p-1.5 md:p-2.5 bg-white/90 hover:bg-white text-gray-700 rounded-full transition-all shadow-md z-20 backdrop-blur-sm"
                >
                    <X size={20} className="md:w-6 md:h-6" />
                </button>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-5 md:p-10">
                    <ContentComponent card={card} />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CardModal;