import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useAuthContext } from "src/auth/hooks/use-auth-context";

export default function LoyaltyBanner({ points = 0 }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();

  return (
    <div className="bg-white rounded-lg shadow-md border mt-6 w-full">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
      >
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-800">
              <TranslatedText text="Points fidélité estimés :" />
            </span>

            <span className="text-yellow-600 font-bold">
              {points}
            </span>
          </div>

          {!user && (
            <span className="text-xs text-red-500 mt-1">
              <TranslatedText text="Les points sont crédités uniquement avec un compte client" />
            </span>
          )}
        </div>

        <span className="text-gray-600">
          {open ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 text-sm text-gray-600">
          <TranslatedText text="Les points de fidélité vous permettent d'obtenir des récompenses lors de vos futurs achats." />
        </div>
      )}
    </div>
  );
}