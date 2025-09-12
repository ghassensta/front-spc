// GlossaireItem.jsx
import React from "react";

export default function GlossaireItem({ letter, data = [], isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-300">
      {/* Accordion Header */}
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-3 px-4 text-left font-bold text-lg hover:bg-gray-100 transition"
      >
        {letter}
        <span className="text-gray-500">{isOpen ? "−" : "+"}</span>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="px-4 pb-4 text-sm space-y-2">
          {data.length > 0 ? (
            <ul className="list-none space-y-2">
              {data.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.keyword}:</strong> {item.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Aucun terme disponible.</p>
          )}
        </div>
      )}
    </div>
  );
}