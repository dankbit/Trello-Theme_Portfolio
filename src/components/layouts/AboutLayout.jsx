import React from "react";
import { formatText } from "../../utils/textFormatter";

const AboutLayout = ({ card }) => {
    const isBento = Array.isArray(card.fullDescription);
    return (
        <div className="space-y-8 pb-4">
            <h2 className="text-3xl font-bold text-[#172b4d]">{card.title}</h2>
            {isBento ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {card.fullDescription.map((item, i) => (
                        <div key={i} className={`${item.bg} ${item.span || 'md:col-span-1'} p-5 rounded-xl`}>
                            <h3 className={`font-bold text-lg mb-2 ${item.text}`}>{item.category}</h3>
                            <p className={`font-medium ${item.text} opacity-90`}>{formatText(item.items)}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-lg leading-relaxed whitespace-pre-wrap text-[#172b4d]">
                    {formatText(card.fullDescription || card.content)}
                </div>
            )}
        </div>
    );
};

export default AboutLayout;