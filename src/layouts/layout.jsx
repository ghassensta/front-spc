import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import CategoryPuce from "../components/category-puce/categoryPuce";
import { useGetCategories } from "src/actions/categories";
import { CONFIG } from "src/config-global";
import { FaChevronUp } from "react-icons/fa";
import { useScrollToTop } from "src/hooks/use-scroll-to-top";
import { Link, useLocation } from "react-router-dom";
import { paths } from "src/router/paths";
import etab from '../assets/spa-icons/SPC-picto-categorie-etablissement.svg';
import { motion } from "framer-motion";
import Header from "src/sections/home2/comp/header";

export default function LayoutTheme({ children }) {
  const [header, setHeader]=useState(false)
  const router = useLocation()

  useEffect(() => {
    if(router.pathname === paths.main) {
      setHeader(true)
    } else {
      setHeader(false)
    }
  }, [router])
  useScrollToTop();

  const { categories } = useGetCategories();
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sortedCategories = [...(categories || [])].sort((a, b) => {
    if (a.order === b.order) return new Date(a.created_at) - new Date(b.created_at);
    return a.order - b.order;
  });

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="min-h-screen relative m-auto flex flex-col">
        <div className={header ? "h-screen flex flex-col" : ""}>
          <Navbar />
          <div className="">
            <div className="
              grid grid-cols-4
              gap-x-2 gap-y-0
              px-3
              sm:grid-cols-5 sm:gap-x-4
              md:flex md:flex-wrap md:gap-10
              justify-center items-center
              md:mt-2
            ">
              <div className="flex justify-center">
                <motion.div whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link
                    to={paths.spa.list}
                    className="group flex flex-col items-center gap-1.5 py-2 px-3 rounded-full hover:bg-[#f6f5e9]/30 transition-all duration-300"
                  >
                    <img
                      loading="lazy"
                      src={etab}
                      alt="Établissements"
                      className="w-9 h-9 md:w-12 md:h-7 object-contain"
                    />
                    <span className="text-black text-[10px] md:text-[10px] font-tahoma uppercase tracking-wider leading-none text-center">
                      Établissements
                    </span>
                    <motion.span className="h-0.5 bg-primary w-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-1" />
                  </Link>
                </motion.div>
              </div>
              {}
              {sortedCategories.map((category) => (
                <div key={category.id} className="flex justify-center">
                  <CategoryPuce
                    name={category.name}
                    icon={`${CONFIG.serverUrl}/storage/${category.image}`}
                    slug={category.slug}
                  />
                </div>
              ))}
            </div>
            {}
          </div>
          {header && <div className="flex-1">
            <Header />
          </div>}
        </div>
        <div>{children}</div>

        <Footer />

        {}
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#787766] hover:bg-[#676556] text-white rounded-full shadow-2xl p-1 md:p-4 transition-all duration-300"
        >
          <FaChevronUp size={24} />
        </button>
      </div>
    </div>
  );
}
