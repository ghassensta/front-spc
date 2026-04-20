import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TranslatedText } from "src/components/translated-text/translated-text";

export default function LoyaltyBanner({ points }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md border mt-6 w-full">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
      >
        <h5 className="text-base font-semibold leading-snug">
          <TranslatedText text="Validez cette commande et gagnez jusqu'à" />{" "}
          <span className="text-yellow-600 font-bold">{points} points</span>
        </h5>
        <span className="text-gray-600">
          {open ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 text-sm text-gray-600">
          <TranslatedText text="Les points de fidélité vous permettent d'obtenir des récompenses lors de vos futurs achats. Le nombre final peut varier selon les remises." />
        </div>
      )}
    </div>
  );
}