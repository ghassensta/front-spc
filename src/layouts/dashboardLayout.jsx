import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { paths } from "src/router/paths";
import { useRouter } from "src/hooks";
import {
  Home,
  ShoppingCart,
  Heart,
  User,
  LogOut,
  Gift,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

const NavLink = ({ link, isActive, toggleMenu, openMenus, isMobile = false, menuRef }) => {
  const Icon = link.icon;
  const anyChildActive = link.children?.some((child) => location.pathname.startsWith(child.to));

  // Handle submenu link clicks
  const handleSubmenuClick = (e) => {
    e.stopPropagation(); // Prevent bubbling to parent or document
    if (isMobile) {
      toggleMenu(link.label); // Close submenu on mobile after click
    }
    // Do not toggleMenu for desktop to keep submenu open
  };

  // Handle top-level link clicks
  const handleTopLevelClick = (e) => {
    if (isMobile) {
      e.stopPropagation();
      toggleMenu(link.label); // Close any open menus on mobile
    }
  };

  return (
    <li className="relative list-none" ref={menuRef}>
      {link.children ? (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu(link.label);
            }}
            className={`flex items-center gap-2 px-3 py-2 w-full text-left rounded transition-colors ${
              isMobile
                ? `justify-center ${openMenus[link.label] || anyChildActive ? "text-blue-600 font-semibold" : "text-gray-600"}`
                : `hover:bg-gray-100 ${anyChildActive ? "text-blue-600 font-semibold" : "text-gray-800"}`
            }`}
            aria-expanded={openMenus[link.label] || anyChildActive}
            aria-label={link.label}
            title={isMobile ? link.label : undefined}
          >
            {Icon && <Icon className={isMobile ? "w-6 h-6" : "w-5 h-5"} />}
            {!isMobile && <span className="text-sm">{link.label}</span>}
            {!isMobile && <ChevronDown className={`w-4 h-4 transition-transform ${openMenus[link.label] ? "rotate-180" : ""}`} />}
          </button>
          {(openMenus[link.label] || (!isMobile && anyChildActive)) && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`${
                isMobile
                  ? "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded z-10"
                  : "ml-6 mt-1 flex flex-col gap-1"
              }`}
            >
              {link.children.map((child, cIndex) => {
                const isChildActive = location.pathname.startsWith(child.to);
                return (
                  <li key={cIndex} className="list-none">
                    <Link
                      to={child.to}
                      onClick={handleSubmenuClick}
                      className={`block px-3 py-1.5 text-sm rounded hover:bg-gray-100 ${
                        isChildActive ? "text-blue-600 font-semibold" : "text-gray-600"
                      }`}
                    >
                      {child.label}
                    </Link>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </>
      ) : (
        <motion.div
          whileHover={{ scale: 1.03, backgroundColor: "#f3f4f6" }}
          whileTap={{ scale: 0.98 }}
          className={`rounded transition-colors duration-200 ${isActive ? "text-blue-600 font-semibold" : "text-gray-800"}`}
        >
          <Link
            to={link.to}
            onClick={handleTopLevelClick}
            className={`flex items-center gap-2 px-3 py-2 rounded ${isMobile ? "justify-center" : ""}`}
            aria-label={link.label}
            title={isMobile ? link.label : undefined}
          >
            {Icon && <Icon className={isMobile ? "w-6 h-6" : "w-5 h-5"} />}
            {!isMobile && <span className="text-sm">{link.label}</span>}
          </Link>
        </motion.div>
      )}
    </li>
  );
};

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState({});
  const menuRefs = useRef({});

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(menuRefs.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(event.target)) {
          setOpenMenus((prev) => ({ ...prev, [key]: false }));
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    { label: "Tableau du bord", to: paths.dashboard.root, icon: Home },
    { label: "Commandes", to: paths.dashboard.commandes.root, icon: ShoppingCart },
    { label: "Wishlists", to: paths.dashboard.wishlist, icon: Heart },
    { label: "Détails du compte", to: paths.dashboard.details, icon: User },
    {
      label: "Avantage",
      icon: Gift,
      children: [
        { label: "Cadeau d'anniversaire", to: paths.dashboard.cadeau },
        { label: "Parrainage", to: paths.dashboard.parrainage },
        { label: "Fidélité", to: paths.dashboard.fidelite },
      ],
    },
    { label: "Aide", to: paths.dashboard.aide, icon: HelpCircle },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="max-w-6xl mx-auto font-tahoma py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Desktop Sidebar */}
        <motion.aside
          className="hidden md:block md:col-span-1 bg-white border rounded-md p-4 sticky top-8 shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col gap-2 list-none">
            {links.map((link, index) => {
              const isActive =
                link.to &&
                (link.to === "/dashboard"
                  ? location.pathname === link.to
                  : location.pathname.startsWith(link.to));
              return (
                <NavLink
                  key={index}
                  link={link}
                  isActive={isActive}
                  toggleMenu={toggleMenu}
                  openMenus={openMenus}
                  menuRef={(el) => (menuRefs.current[link.label] = el)}
                />
              );
            })}
            <motion.li
              whileHover={{ scale: 1.03, backgroundColor: "#fee2e2" }}
              whileTap={{ scale: 0.98 }}
              className="rounded mt-4 list-none"
            >
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 w-full text-left text-red-600 font-semibold rounded hover:bg-red-50"
                aria-label="Se déconnecter"
              >
                <LogOut className="w-5 h-5" />
                Se déconnecter
              </button>
            </motion.li>
          </ul>
        </motion.aside>

        {/* Main Content */}
        <main className="col-span-1 md:col-span-4 bg-white rounded-md p-6 shadow-sm">
          {/* Mobile Top Nav */}
          <nav className="md:hidden sticky top-0 z-10 bg-white border-b shadow-sm py-3 px-4 mb-6">
            <ul className="flex justify-between items-center gap-2 list-none">
              {links.map((link, index) => {
                const isActive =
                  link.to &&
                  (link.to === "/dashboard"
                    ? location.pathname === link.to
                    : location.pathname.startsWith(link.to));
                return (
                  <NavLink
                    key={index}
                    link={link}
                    isActive={isActive}
                    toggleMenu={toggleMenu}
                    openMenus={openMenus}
                    isMobile
                    menuRef={(el) => (menuRefs.current[link.label] = el)}
                  />
                );
              })}
              <li className="list-none">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center text-red-600"
                  aria-label="Se déconnecter"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </li>
            </ul>
          </nav>

          {/* Page Content */}
          {children}
        </main>
      </div>
    </div>
  );
}