import React, { useEffect } from "react";
import { FaRegHeart, FaUser } from "react-icons/fa";
import { IoMdCart, IoMdLogIn } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { useTranslation } from "src/context/translation-context";
import { paths } from "src/router/paths";

const languages = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'it', flag: '🇮🇹', label: 'Italiano' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
];

export default function LanguageNav({ cartCount = 0, wishlistCount = 0 }) {
  const { currentLanguage, setLanguage } = useTranslation();
  const { user } =useAuthContext()

  return (
    <div className="bg-[#F6F5E9] px-4 py-3 flex justify-between">
    <div className="flex items-end gap-1   w-full md:justify-end sm:justify-end">
    
      <button
        className="text-lg font-tahoma text-[#33373D]"
        onClick={() => setLanguage("en")}
      >
        <span className="fi fi-gb"></span>
      </button>
      <button
        className="text-lg font-tahoma text-[#33373D]"
        onClick={() => setLanguage("fr")}
      >
        <span className="fi fi-fr"></span>
      </button>
      <button
        className="text-lg font-tahoma text-[#33373D]"
        onClick={() => setLanguage("de")}
      >
        <span className="fi fi-de"></span>
      </button>
      <button
        className="text-lg font-tahoma text-[#33373D]"
        onClick={() => setLanguage("it")}
      >
        <span className="fi fi-it"></span>
      </button>
      <button
        className="text-lg font-tahoma text-[#33373D]"
        onClick={() => setLanguage("es")}
      >
        <span className="fi fi-es"></span>
      </button>
    </div>
      <div className="flex items-center gap-5 md:hidden">
            {user && (
              <Link to="/dashboard/wishlist" className="relative">
                <FaRegHeart size={24} className="text-gray-700" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <Link to={paths.dashboard.root}>
                <FaUser size={24} className="text-gray-700" />
              </Link>
            ) : (
              <Link to={paths.auth.root}>
                <IoMdLogIn size={24} className="text-gray-700" />
              </Link>
            )}

            <Link to={paths.checkout} className="relative">
              <IoMdCart size={26} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
    </div>
  );
}