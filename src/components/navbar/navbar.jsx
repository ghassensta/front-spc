import React, { useState, useRef, useContext } from "react";
import { IoMdMenu, IoMdClose, IoMdLogIn, IoMdCart } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaRegHeart, FaUser } from "react-icons/fa";

import Logo from "../logo/logo";
import MenuPopover from "../menu/menu-popover";
import LanguageNav from "src/components/language-nav/language-nav";
import { Link } from "react-router-dom";
import { paths } from "../../router/paths";
import { CheckoutContext } from "../../sections/checkout/context/checkout-provider";
import { useAuthContext } from "src/auth/hooks/use-auth-context";

import { useGetWishlist } from "src/actions/wishlists";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef(null);

  const { items } = useContext(CheckoutContext);
  const { user } = useAuthContext();

  const cartCount = items?.length || 0;

  const { wishlist } = useGetWishlist();
  const wishlistCount = wishlist?.length || 0;

  return (
    <>
      <LanguageNav />

      <div className="w-full px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between relative gap-4">
        {/* Menu Mobile */}
        <div className="w-full md:w-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              ref={buttonRef}
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2.5 px-2 py-2 bg-black/5 rounded-lg text-[#33373d] font-medium text-sm hover:bg-black/10 transition"
            >
              {showMenu ? <IoMdClose size={26} /> : <IoMdMenu size={26} />}
              <span className="hidden sm:inline">Menu</span>
            </button>

            <Logo className="h-7 md:hidden ml-2" />
          </div>

          {/* Icônes mobile */}
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

        {/* Logo - Desktop ONLY (hidden on mobile) */}
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:transform-none">
          <Logo className="h-10 md:h-12" />
        </div>

        {/* Icônes Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {user && (
            <Link
              to="/dashboard/wishlist"
              className="relative hover:text-gray-600 transition"
            >
              <FaRegHeart size={24} />

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

      <MenuPopover
        anchorRef={buttonRef}
        open={showMenu}
        onClose={() => setShowMenu(false)}
      />
    </>
  );
}
