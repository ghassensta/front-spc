import React, { useState, useRef, useContext, useEffect } from "react";
import { IoMdMenu, IoMdClose, IoMdLogIn, IoMdCart } from "react-icons/io";
import { FaRegHeart, FaUser } from "react-icons/fa";

import Logo from "../logo/logo";
import MenuPopover from "../menu/menu-popover";
import LanguageNav from "src/components/language-nav/language-nav";
import { Link } from "react-router-dom";
import { paths } from "../../router/paths";
import { CheckoutContext } from "../../sections/checkout/context/checkout-provider";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "src/context/translation-context";

import { useGetWishlist } from "src/actions/wishlists";
import GiftCardIcon from "../../assets/spa-icons/SPC-picto-menu-carte-cadeau.svg";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false); // pour gérer le style quand scroll
  const buttonRef = useRef(null);
  const { translateSync } = useTranslation();

  const { items } = useContext(CheckoutContext);
  const { user } = useAuthContext();

  const cartCount = items?.length || 0;
  const { wishlist } = useGetWishlist();
  const wishlistCount = wishlist?.length || 0;

  // detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${scrolled ? "shadow-md border-b border-gray-200 bg-white/90 backdrop-blur-md" : "bg-transparent border-none"}
        `}
      >
        <LanguageNav cartCount={cartCount} wishlistCount={wishlistCount} />

        <div className="w-full md:px-8 py-2 flex flex-col md:flex-row items-center justify-between relative gap-4">
          <div className="w-full md:w-auto flex items-center justify-between">
            <div className="flex items-center gap-2 px-4 md:px-0 relative z-20">
              <button
                ref={buttonRef}
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2.5 px-2 py-2 bg-black/5 rounded-lg text-[#33373d] font-medium text-sm hover:bg-black/10 transition"
              >
                {showMenu ? <IoMdClose size={26} /> : <IoMdMenu size={26} />}
                <span className="hidden sm:inline">
                  <TranslatedText text="Menu" />
                </span>
              </button>
            </div>
            <div className="flex-1 flex justify-center md:hidden absolute w-full">
              <Logo className="h-10 md:h-12" />
            </div>
          </div>

          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:transform-none">
            <Logo className="h-10 md:h-12" />
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link to={paths.cadeau} className="hover:opacity-70 transition">
              <img
                src={GiftCardIcon}
                alt={translateSync("Carte cadeau")}
                className="w-6 h-6"
              />
            </Link>

            <Link
              to={user ? paths.dashboard.wishlist : paths.auth.root}
              className="relative hover:text-gray-600 transition"
            >
              <FaRegHeart size={24} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {user ? (
              <Link to={paths.dashboard.root}>
                <FaUser size={24} className="text-black" />
              </Link>
            ) : (
              <Link to={paths.auth.root}>
                <IoMdLogIn size={24} className="text-black" />
              </Link>
            )}

            <Link
              to={paths.checkout}
              className="relative hover:text-gray-600 transition"
            >
              <IoMdCart size={28} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer pour ne pas cacher le contenu */}
      <div className="h-[80px] md:h-[64px]" />

      {/* Menu Popover */}
      <MenuPopover
        anchorRef={buttonRef}
        open={showMenu}
        onClose={() => setShowMenu(false)}
      />
    </>
  );
}
