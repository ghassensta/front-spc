import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import CategoryPuce from "../components/category-puce/categoryPuce";
import { useGetCategories } from "src/actions/categories";
import { CONFIG } from "src/config-global";
import LanguageNav from "src/components/language-nav/language-nav";
import { FaChevronUp } from "react-icons/fa";
import { useScrollToTop } from "src/hooks/use-scroll-to-top";
import { Link } from "react-router-dom";
import { paths } from "src/router/paths";
import etab from '../assets/spa-icons/SPC-picto-categorie-etablissement.svg'
import { motion } from "framer-motion";

export default function LayoutTheme({ children }) {
  // Auto scroll on route change
  useScrollToTop();

  const { categories } = useGetCategories();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const sortedCategories = [...(categories || [])].sort((a, b) => {
    if (a.order === b.order) {
      return new Date(a.created_at) - new Date(b.created_at);
    }
    return a.order - b.order;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen relative m-auto flex flex-col">
        <LanguageNav />
        <Navbar />

        <div className="flex-1 h-full">
          {/* CATEGORIES */}
          <div className="grid grid-cols-2 px-8 md:flex md:flex-wrap gap-4 mx-auto items-center justify-center mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={paths.spa.list}
                className="group w-full inline-block rounded-full min-w-24  pr-6 pl-1  duration-300 "
              >
                <div className="flex items-center gap-1 text-center text-black relative">
                  
                    <span className="rounded-full p-0">
                      <img lazyload="lazy" src={etab} alt="ÉTABLISSEMENTS" className="w-8 h-8 object-contain" />
                    </span>
              
                  <div className="relative flex-1">
                    <span className="text-black text-sm text-left md:text-center font-tahoma uppercase">ÉTABLISSEMENTS</span>
                    {/* Underline animation */}
                    <motion.span
                      className="block h-0.5 bg-primary absolute left-0 -bottom-1 origin-left scale-x-0 group-hover:scale-x-100"
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
            {sortedCategories.map((category) => (
              <CategoryPuce
                key={category.id}
                name={category.name}
                icon={`${CONFIG.serverUrl}/storage/${category.image}`}
                slug={category.slug}
              />
            ))}
          </div>

          {/* MAIN CONTENT */}
          <div>{children}</div>
        </div>

        <Footer />

        {/* SCROLL TO TOP BUTTON */}
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-4 right-4 z-50 bg-[#787766] hover:bg-[#676556] transition text-white rounded-md shadow-lg p-3"
        >
          <FaChevronUp />
        </button>
      </div>
    </div>
  );
}
