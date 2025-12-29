import React from "react";
import { GraduationCap } from "lucide-react";

const EducationLayout = ({ card }) => (
    <div className="space-y-8 pb-4">
        <h2 className="text-3xl font-bold text-[#172b4d] flex items-center gap-3">
            <GraduationCap size={32} className="text-blue-600" /> {card.title}
        </h2>
        <div className="space-y-4">
            {Array.isArray(card.fullDescription) && card.fullDescription.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-md">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#172b4d]">{item.institution}</h3>
                            <p className="text-sm font-bold text-blue-600 uppercase mt-1">{item.degree}</p>
                        </div>
                    </div>
                    <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold">{item.year}</div>
                </div>
            ))}
        </div>
    </div>
);

export default EducationLayout;