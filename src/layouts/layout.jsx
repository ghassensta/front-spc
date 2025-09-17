import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import CategoryPuce from "../components/category-puce/categoryPuce";
import { useGetCategories } from "src/actions/categories";
import { CONFIG } from "src/config-global";
import LanguageNav from "src/components/language-nav/language-nav";

export default function LayoutTheme({ children }) {
  const { categories } = useGetCategories();

  return (
    <div className="min-h-screen bg-background ">
      <div className="min-h-screen m-auto flex flex-col">
        <LanguageNav />
        
        <Navbar />
        <div className="flex-1 h-full">
          <div className="flex flex-wrap gap-4 mx-auto items-center justify-center mb-4">
            {categories.map((category, index) => (
              <CategoryPuce
                key={index}
                name={category.name}
                icon={`${CONFIG.serverUrl}/storage/${category.image}`}
                slug={category.slug}
              />
            ))}
          </div>
          <div className="py-12 ">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
