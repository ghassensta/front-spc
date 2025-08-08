import React, { useState, useContext } from 'react';
import { IoMdCart, IoMdLogIn, IoMdMenu } from 'react-icons/io';
import Logo from '../logo/logo';
import Menu from '../menu/menu';
import { Link } from 'react-router-dom';
import { paths } from '../../router/paths';
import { CheckoutContext } from '../../sections/checkout/context/checkout-provider';
// import { CheckoutContext } from '../../context/checkout-provider'; // make sure path is correct

export default function Navbar() {
  const [show, setShow] = useState(false);

  const { items } = useContext(CheckoutContext); // Access cart items from context

  return (
    <div className="w-full container md:px-16 py-8 flex justify-between relative">
      <IoMdMenu className="text-2xl cursor-pointer" onClick={() => setShow(true)} />
      <Menu show={show} onClose={() => setShow(false)} />

      <Logo className="max-w-60" />

      <div className="flex gap-3">
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
  );
}
