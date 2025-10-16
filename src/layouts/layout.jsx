import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import CategoryPuce from "../components/category-puce/categoryPuce";
import { useGetCategories } from "src/actions/categories";
import { CONFIG } from "src/config-global";
import LanguageNav from "src/components/language-nav/language-nav";
import { FaChevronUp } from "react-icons/fa";
import { useScrollToTop } from "src/hooks/use-scroll-to-top";

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
