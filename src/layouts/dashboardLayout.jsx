import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { paths } from "src/router/paths";

export default function DashboardLayout({ children }) {
  const location = useLocation();

  const links = [
    { label: "Tableau du bord", to: paths.dashboard.root },
    { label: "Commandes", to: paths.dashboard.commandes.root },
    { label: "Détails du compte", to: paths.dashboard.details },
    { label: "Se déconnecter", to: paths.main },
  ];

  return (
    <div className="grid grid-cols-5 max-w-6xl m-auto font-tahoma gap-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border rounded p-3"
      >
        <ul className="flex flex-col gap-4">
          {links.map((link, index) => {
            const isActive =
              link.to === "/dashboard"
                ? location.pathname === "/dashboard"
                : location.pathname.startsWith(link.to);

            return (
              <motion.li
                key={index}
                whileHover={{ scale: 1.03, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.98 }}
                className={`rounded transition-colors duration-200 ${
                  isActive ? "font-semibold" : ""
                }`}
              >
                <Link to={link.to} className="block px-4 py-2">
                  {link.label}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>

      <div className="col-span-4 bg-white rounded p-2">{children}</div>
    </div>
  );
}
