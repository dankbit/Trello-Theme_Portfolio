import React from "react";

export const formatText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

    return parts.map((part, index) => {
        // CASE 1: Bold Text (**...**)
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={index} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
        }

        // CASE 2: Links ([...](...))
        if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
            // Extract label and url using regex
            const match = part.match(/\[(.*?)\]\((.*?)\)/);
            if (match) {
                const [_, label, url] = match;
                return (
                    <a 
                        key={index} 
                        href={url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline font-bold"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {label}
                    </a>
                );
            }
        }

        // CASE 3: Standard Text
        return part;
    });
};