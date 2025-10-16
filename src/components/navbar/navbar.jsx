import React, { useState, useContext } from "react";
import { IoIosHeartEmpty, IoMdCart, IoMdLogIn, IoMdMenu } from "react-icons/io";
import Logo from "../logo/logo";
import Menu from "../menu/menu";
import { Link } from "react-router-dom";
import { paths } from "../../router/paths";
import { CheckoutContext } from "../../sections/checkout/context/checkout-provider";
import { MdDashboard } from "react-icons/md";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { FaRegHeart } from "react-icons/fa";
// import { CheckoutContext } from '../../context/checkout-provider'; // make sure path is correct

export default function Navbar() {
  const [show, setShow] = useState(false);

  const { items } = useContext(CheckoutContext); // Access cart items from context

  const { user } = useAuthContext();

  return (
    <div className="w-full px-2 md:px-6 py-8 flex flex-col md:flex-row justify-between relative gap-6">
      <div className="flex justify-between">
        <button
          className="text-base cursor-pointer flex items-center h-max p-1 gap-2 text-[#33373d] bg-black/5 font-arial font-sans font-medium"
          onClick={() => setShow(true)}
        >
          <IoMdMenu className="text-2xl" />
          <span>Menu</span>
        </button>
        <div className="gap-3 flex md:hidden">
          <Link to={paths.auth.root} className="relative">
            <IoMdLogIn className="text-2xl" />
          </Link>
          <Link to={paths.checkout} className="relative">
            <IoMdCart className="text-2xl" />
            {items?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-tahoma">
                {items.length}
              </span>
            )}
          </Link>
        </div>
      </div>
      <Menu show={show} onClose={() => setShow(false)} />

      <Logo className="max-w-min mx-auto" />

      <div className="gap-3 hidden md:flex">
        {user && <Link><FaRegHeart className="text-2xl"/></Link>}
        {user ? (
          <Link to={paths.dashboard.root} className="relative">
            <MdDashboard className="text-2xl" />
          </Link>
        ) : (
          <Link to={paths.auth.root} className="relative">
            <IoMdLogIn className="text-2xl" />
          </Link>
        )}

        <Link to={paths.checkout} className="relative">
          <IoMdCart className="text-2xl" />
          {items?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-tahoma">
              {items.length}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
