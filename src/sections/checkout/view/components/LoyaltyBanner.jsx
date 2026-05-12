import { useState } from "react";
import { FaGift, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTranslation } from "src/context/translation-context";
import { useAuthContext } from "src/auth/hooks/use-auth-context";

const GOLD = "#b8955a";
const BG_CIRCLE = "#F3EBDD";
const FONT = "";

export default function LoyaltyBanner({ points = 0 }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();
  const { translateSync } = useTranslation();

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 w-full overflow-hidden mt-3"
      style={{ fontFamily: FONT }}
    >
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start gap-4 text-left">
          {/* Cercle avec icône - Même style que TrustBar */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: BG_CIRCLE }}
          >
            <FaGift 
              style={{ color: GOLD }} 
              className="text-3xl" 
            />
          </div>

          {/* Contenu principal */}
          <div className="flex-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-sm md:text-base font-medium text-gray-700">
                {translateSync("Points fidélité estimés :")}
              </span>
              <span 
                className="text-xl md:text-xl font-bold"
                style={{ color: GOLD }}
              >
                {points}
              </span>
            </div>

            {!user && (
              <p className="text-xs text-red-600 mt-1.5">
                {translateSync("Les points sont crédités uniquement avec un compte client")}
              </p>
            )}
          </div>
        </div>

        {/* Chevron */}
        <div className="text-gray-500">
          {open ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </div>
      </button>

      {/* Contenu déroulant */}
      {open && (
        <div className="px-5 pb-5 pt-1 text-sm text-gray-600 border-t border-gray-100">
          <p>
            {translateSync(
              "Les points de fidélité vous permettent d'obtenir des récompenses lors de vos futurs achats."
            )}
          </p>
        </div>
      )}
    </div>
  );
}