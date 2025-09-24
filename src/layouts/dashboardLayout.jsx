import React, { useState, useRef, useEffect, useCallback } from "react";
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
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { signOut } from "src/actions/auth";

const NavLink = ({ link, isActive, toggleMenu, openMenus, isMobile = false, menuRef }) => {
  const [showPopover, setShowPopover] = useState(false);
  const Icon = link.icon;
  const hasChildren = link.children && link.children.length > 0;
  const anyChildActive = hasChildren && link.children.some((child) =>
    location.pathname === child.to || location.pathname.startsWith(child.to)
  );
  const { push } = useRouter();

  const handleClick = (e) => {
    e.stopPropagation();
    if (hasChildren) {
      toggleMenu(link.label);
    } else if (link.to && isMobile) {
      push(link.to); // Navigate using router for mobile
      toggleMenu(link.label); // Close menu on mobile
    }
  };

  const handleSubmenuClick = () => {
    if (isMobile) {
      toggleMenu(link.label); // Close submenu on mobile after selection
    }
  };

  if (isMobile) {
    return (
      <li className="relative list-none" ref={menuRef}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setShowPopover(true)}
          onHoverEnd={() => setShowPopover(false)}
          className="relative"
        >
          {hasChildren ? (
            <button
              onClick={handleClick}
              className={`flex items-center justify-center rounded-lg  transition-all duration-200  ${
                isActive || anyChildActive || openMenus[link.label]
                  ? "text-[#b6b499] bg-blue-50 border-blue-200"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              aria-label={link.label}
              aria-expanded={hasChildren ? openMenus[link.label] : undefined}
              aria-controls={hasChildren ? `submenu-${link.label}` : undefined}
            >
              {Icon && <Icon className="w-6 h-6" />}
            </button>
          ) : (
            <Link
              to={link.to}
              onClick={() => toggleMenu(link.label)}
              className={`flex items-center justify-center rounded-lg  transition-all duration-200  ${
                isActive ? "text-[#b6b499] bg-blue-50 border-blue-200" : "text-gray-700 hover:bg-gray-50"
              }`}
              aria-label={link.label}
            >
              {Icon && <Icon className="w-6 h-6" />}
            </Link>
          )}
          {showPopover && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-full z-50"
            >
              <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
                {link.label}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </motion.div>
          )}
          {hasChildren && openMenus[link.label] && (
            <motion.ul
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              id={`submenu-${link.label}`}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 min-w-48 z-40"
            >
              {link.children.map((child, index) => {
                const isChildActive = location.pathname === child.to || location.pathname.startsWith(child.to);
                return (
                  <li key={index} className="list-none">
                    <Link
                      to={child.to}
                      onClick={handleSubmenuClick}
                      className={`flex items-center px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                        isChildActive ? "text-[#b6b499] font-semibold" : "text-gray-700"
                      }`}
                    >
                      {child.label}
                    </Link>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </motion.div>
      </li>
    );
  }

  return (
    <li className="list-none" ref={menuRef}>
      {hasChildren ? (
        <div>
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
            className={`w-full flex items-center px-4 py-3 text-left rounded-lg group transition-all duration-200 ${
              anyChildActive || openMenus[link.label]
                ? "text-[#b6b499] bg-blue-50 font-semibold"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            aria-expanded={openMenus[link.label]}
            aria-controls={`submenu-${link.label}`}
            aria-label={link.label}
          >
            {Icon && (
              <Icon
                className={`mr-3 w-5 h-5 transition-colors duration-200 ${
                  anyChildActive || openMenus[link.label] ? "text-[#b6b499]" : "text-gray-500 group-hover:text-[#b6b499]"
                }`}
              />
            )}
            <span className="flex-1 text-sm group-hover:text-gray-900">{link.label}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                openMenus[link.label] ? "rotate-180" : ""
              } ${anyChildActive || openMenus[link.label] ? "text-[#b6b499]" : "text-gray-400 group-hover:text-gray-600"}`}
            />
          </motion.button>
          {openMenus[link.label] && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              id={`submenu-${link.label}`}
              className="mt-1 ml-6 space-y-1 list-none"
            >
              {link.children.map((child, index) => {
                const isChildActive = location.pathname === child.to || location.pathname.startsWith(child.to);
                return (
                  <li key={index} className="list-none">
                    <motion.div
                      whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={child.to}
                        className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                          isChildActive ? "text-[#b6b499] bg-blue-50 font-semibold" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {child.label}
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
          whileTap={{ scale: 0.98 }}
          className="rounded-lg transition-colors duration-200"
        >
          <Link
            to={link.to}
            className={`flex items-center px-4 py-3 rounded-lg group transition-all duration-200 ${
              isActive ? "text-[#b6b499] bg-blue-50 font-semibold" : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => isMobile && toggleMenu(link.label)}
          >
            {Icon && (
              <Icon
                className={`mr-3 w-5 h-5 transition-colors duration-200 ${
                  isActive ? "text-[#b6b499]" : "text-gray-500 group-hover:text-[#b6b499]"
                }`}
              />
            )}
            <span className="text-sm group-hover:text-gray-900">{link.label}</span>
          </Link>
        </motion.div>
      )}
    </li>
  );
};

const LogoutButton = ({ isMobile }) => {
  const [showPopover, setShowPopover] = useState(false);
  const { push } = useRouter();
  const { user, checkUserSession } = useAuthContext();

  const handleLogout = useCallback(async () => {
      try {
        await signOut();
        await checkUserSession?.();
      } catch (error) {
        console.error(error);
      }
    }, [checkUserSession]);

  if (isMobile) {
    return (
      <li className="list-none">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setShowPopover(true)}
          onHoverEnd={() => setShowPopover(false)}
          className="relative"
        >
          <button
            onClick={handleLogout}
            className="fflex items-center justify-center rounded-lg  transition-all duration-200 text-red-600"
            aria-label="Se déconnecter"
          >
            <LogOut className="w-6 h-6" />
          </button>
          {showPopover && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-full z-50"
            >
              <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
                Déconnexion
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </li>
    );
  }

  return (
    <li className="list-none">
      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: "#fee2e2" }}
        whileTap={{ scale: 0.98 }}
        onClick={handleLogout}
        className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 rounded-lg group font-semibold w-full text-left"
        aria-label="Se déconnecter"
      >
        <LogOut className="w-5 h-5 mr-3 group-hover:text-red-700 transition-colors duration-200" />
        <span className="text-sm group-hover:text-red-700">Se déconnecter</span>
      </motion.button>
    </li>
  );
};

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const menuRefs = useRef({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile) {
        Object.entries(menuRefs.current).forEach(([key, ref]) => {
          if (ref && !ref.contains(event.target)) {
            setOpenMenus((prev) => ({ ...prev, [key]: false }));
          }
        });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  const toggleMenu = (menuLabel) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuLabel]: !prev[menuLabel],
    }));
  };

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
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-900">Menu</h1>
          </div>
          <ul className="flex flex-col gap-2 list-none">
            {links.map((link, index) => {
              const isActive =
                link.to &&
                (link.to === paths.dashboard.root
                  ? location.pathname === link.to
                  : location.pathname.startsWith(link.to));
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <NavLink
                    link={link}
                    isActive={isActive}
                    toggleMenu={toggleMenu}
                    openMenus={openMenus}
                    isMobile={false}
                    menuRef={(el) => (menuRefs.current[link.label] = el)}
                  />
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <LogoutButton isMobile={false} />
            </motion.div>
          </ul>
        </motion.aside>

        {/* Main Content */}
        <main className="col-span-1 md:col-span-4 bg-white rounded-md p-1 shadow-sm">
          {/* Mobile Top Nav */}
          <motion.nav
            className="md:hidden sticky top-0 z-30 bg-white border-b shadow-sm py-3 px-1 mb-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex justify-between items-center gap-2 list-none">
              {links.map((link, index) => {
                const isActive =
                  link.to &&
                  (link.to === paths.dashboard.root
                    ? location.pathname === link.to
                    : location.pathname.startsWith(link.to));
                return (
                  <NavLink
                    key={index}
                    link={link}
                    isActive={isActive}
                    toggleMenu={toggleMenu}
                    openMenus={openMenus}
                    isMobile={true}
                    menuRef={(el) => (menuRefs.current[link.label] = el)}
                  />
                );
              })}
              <LogoutButton isMobile={true} />
            </ul>
          </motion.nav>

          {/* Page Content */}
          {children}
        </main>
      </div>
    </div>
  );
}