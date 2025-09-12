import React from "react";
import { Link } from "react-router-dom";

export default function ButtonIcon({
  icon,
  title,
  to = "#", // route interne
  sx = "",
  size = "md", // taille par défaut
  variant = "filled", // style par défaut
}) {
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantStyles = {
    filled: "bg-black text-white",
    outlined:
      "border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white",
    link: "text-secondary underline hover:text-black bg-transparent",
  };

  const finalSize = sizeStyles[size] || sizeStyles.md;
  const finalVariant = variantStyles[variant] || variantStyles.filled;

  return (
    <Link
      to={to.startsWith("/") ? to : `/${to}`} // s'assure que c'est une route interne valide
      className={`inline-flex font-tahoma rounded-sm items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 ${finalSize} ${finalVariant} ${sx}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {title}
    </Link>
  );
}
