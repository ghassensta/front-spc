import React, { useState } from "react";
import { Star } from "lucide-react";

export default function StarRatingInput({ value, onChange }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = hovered !== null ? star <= hovered : star <= value;
        return (
          <Star
            key={star}
            className="cursor-pointer transition"
            size={24}
            fill={isFilled ? "#facc15" : "none"}
            stroke="#facc15"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange(star)}
          />
        );
      })}
    </div>
  );
}
