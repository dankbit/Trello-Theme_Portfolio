import React from "react";
import { Globe, Calendar, MapPin, Trophy } from "lucide-react";
import { formatText } from "../../utils/textFormatter";

const ExperienceLayout = ({ card }) => (
    <div className="space-y-8 pb-4">
        {/* Header Card */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-purple-500" />
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                        {card.companyLogo && card.companyLogo.length > 3 ? (
                            <img src={card.companyLogo} alt={card.company} className="w-10 h-10 object-contain" />
                        ) : (
                            <span className="text-2xl font-black text-gray-300">EXP</span>
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-[#172b4d]">{card.company}</h2>
                        <h3 className="text-lg font-medium text-gray-500">{card.title}</h3>
                    </div>
                </div>
                {card.companyUrl && (
                    <a href={card.companyUrl} target="_blank" rel="noreferrer" className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold flex gap-2 items-center">
                        <Globe size={16} /> Visit
                    </a>
                )}
            </div>
            <div className="mt-5 flex flex-wrap gap-4 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 px-3 py-2 rounded-lg"><Calendar size={16} className="text-blue-500" /> {card.date}</div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 px-3 py-2 rounded-lg"><MapPin size={16} className="text-red-500" /> {card.location}</div>
            </div>
        </div>

        {/* Responsibilities */}
        <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase mb-4 flex items-center gap-2"><Trophy size={16} className="text-yellow-500" /> Impact & Contributions</h4>
            <div className="space-y-3">
                {card.responsibilities?.map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 rounded-xl transition-all">
                        <div className="shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</div>
                        <p className="text-[#172b4d] leading-relaxed">{formatText(item)}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ExperienceLayout;