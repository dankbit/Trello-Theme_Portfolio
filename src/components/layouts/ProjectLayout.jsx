import React from "react";
import { Zap, X, CheckCircle, ExternalLink, Github } from "lucide-react";
import { formatText } from "../../utils/textFormatter";

const ProjectLayout = ({ card }) => (
    <div className="flex flex-col min-h-full">
        <div className="space-y-8 flex-1 pb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#172b4d] tracking-tight">{card.title}</h2>
            <div className="text-[#172b4d] text-lg leading-relaxed bg-white p-5 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-blue-500">
                {formatText(card.description || "No description provided.")}
            </div>
            
            {/* Tech Stack */}
            {card.techStack && (
                <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wide">Built With</h4>
                    <div className="flex flex-wrap gap-2">
                        {card.techStack.map((tech, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold uppercase rounded-md border border-gray-200">{tech}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Challenges Section */}
            {card.challenges && (
                <div>
                    <h3 className="text-base font-bold text-gray-500 uppercase mb-4 flex items-center gap-2">
                        <Zap size={18} className="text-yellow-500" /> Key Challenges & Solutions
                    </h3>
                    <div className="grid gap-5">
                        {card.challenges.map((c, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                <div className="mb-3">
                                    <div className="flex items-center gap-2 text-red-600 font-bold text-sm mb-1"><X size={14} /> Problem</div>
                                    <h4 className="font-bold text-lg">{c.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{formatText(c.problem)}</p>
                                </div>
                                <div className="pl-3 border-l-4 border-green-300 ml-1 bg-white p-3 rounded-r-lg">
                                    <div className="flex items-center gap-2 text-green-600 font-bold text-sm"><CheckCircle size={14} /> Solution</div>
                                    <p className="text-gray-800 font-medium">{formatText(c.solution)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 -mx-10 px-10 py-6 bg-[#f4f5f7]/85 backdrop-blur-xl border-t border-gray-200/60 mt-auto z-10 flex gap-4">
            {card.liveLink && <a href={card.liveLink} target="_blank" rel="noreferrer" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex justify-center gap-2 transition-all"><ExternalLink size={18} /> Live Preview</a>}
            {card.repoLink && <a href={card.repoLink} target="_blank" rel="noreferrer" className="flex-1 bg-[#172b4d] hover:bg-[#091e42] text-white py-3 rounded-xl font-bold flex justify-center gap-2 transition-all"><Github size={18} /> View Code</a>}
        </div>
    </div>
);

export default ProjectLayout;