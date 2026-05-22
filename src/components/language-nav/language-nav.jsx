import React, { useEffect } from "react";
import { FaRegHeart, FaUser,FaRegUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { useTranslation } from "src/context/translation-context";
import { paths } from "src/router/paths";

const languages = [
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
];

export default function LanguageNav({ cartCount = 0, wishlistCount = 0 }) {
  const { currentLanguage, setLanguage } = useTranslation();
  const { user } = useAuthContext();

  return (
    <div className="bg-[#F6F5E9] px-4 py-3 flex justify-between">
      <div className="flex items-end gap-1 w-full md:justify-end sm:justify-end">
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
      <div className="flex items-center gap-1 md:hidden relative">
        

        {/* Wishlist */}
        <Link
          to={user ? paths.auth.root : paths.dashboard.wishlist}
          className="relative w-8 h-8 flex items-center justify-center"
        >
          <FaRegHeart size={24} className="text-black" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* User / Login */}
        {user ? (
          <Link
            to={paths.dashboard.root}
            className="relative w-8 h-8 flex items-center justify-center"
          >
            <FaUser size={24} className="text-black" />
          </Link>
        ) : (
          <Link
            to={paths.auth.root}
            className="relative w-8 h-8 flex items-center justify-center"
          >
            <FaRegUserCircle size={24} className="text-black" />
          </Link>
        )}

        {/* Cart */}
        <Link
          to={paths.checkout}
          className="relative w-8 h-8 flex items-center justify-center"
        >
          <IoMdCart size={26} className="text-black" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
