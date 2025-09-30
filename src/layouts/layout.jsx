import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import CategoryPuce from "../components/category-puce/categoryPuce";
import { useGetCategories } from "src/actions/categories";
import { CONFIG } from "src/config-global";
import LanguageNav from "src/components/language-nav/language-nav";

export default function LayoutTheme({ children }) {
  const { categories } = useGetCategories();

  const sortedCategories = [...(categories || [])].sort((a, b) => {
    if (a.order === b.order) {
      return new Date(a.created_at) - new Date(b.created_at);
    }
    return a.order - b.order;
  });

  return (
    <div className="min-h-screen bg-background ">
      <div className="min-h-screen m-auto flex flex-col">
        <LanguageNav />
        <Navbar />

        <div className="flex-1 h-full">
          <div className="flex flex-wrap gap-4 mx-auto items-center justify-center mb-4">
            {sortedCategories.map((category) => (
              <CategoryPuce
                key={category.id}
                name={category.name}
                icon={`${CONFIG.serverUrl}/storage/${category.image}`}
                slug={category.slug}
              />
            ))}
          </div>

          <div className="">{children}</div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
