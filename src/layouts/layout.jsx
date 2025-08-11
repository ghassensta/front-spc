import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import CategoryPuce from "../components/category-puce/categoryPuce";
import { useCategories } from "src/hooks/useCategories";

export default function LayoutTheme({ children }) {
  const { categories } = useCategories();
  return (
    <div className="min-h-screen bg-background ">
      <div className="container m-auto">
        <Navbar />
        <div className="flex flex-wrap gap-4 mx-auto items-center justify-center mb-4">
          {categories.map((category, index) => (
            <CategoryPuce
              key={index}
              name={category.name}
              icon={category.id}
              slug={category.slug}
            />
          ))}
        </div>
        <div className="py-12">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
