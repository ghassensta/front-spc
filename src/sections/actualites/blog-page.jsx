import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CONFIG } from "src/config-global";
import { paths } from "src/router/paths";
import PageSkeleton from "./page-skeleton";
import theImage from "src/assets/images/SPC-Essence-1975x1318-02.jpg";
import { useTranslation } from "src/context/translation-context";

export default function BlogPage({ categories, articles, loading }) {
  const { translateSync } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (loading) return <PageSkeleton />;

  // Filter articles based on search term
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered articles by view_count descending
  const sortedArticles = [...filteredArticles].sort(
    (a, b) => b.view_count - a.view_count
  );

  // Recent articles (sorted by date, top 8)
  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 8);

  const usePagination = searchTerm === "";
  const totalPages = usePagination
    ? Math.ceil(sortedArticles.length / itemsPerPage)
    : 1;
  const paginatedArticles = usePagination
    ? sortedArticles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : sortedArticles;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const delta = 2;
    const left = currentPage - delta;
    const right = currentPage + delta + 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) range.push(i);
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) rangeWithDots.push(l + 1);
        else if (i - l !== 1) rangeWithDots.push("...");
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <>
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden hidden md:block"
        style={{ backgroundImage: `url(${theImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            {translateSync("Actualités")}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {paginatedArticles.length === 0 ? (
            <div className="text-center text-gray-700 font-bold text-xl">
              {translateSync("Aucun article trouvé.")}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {paginatedArticles.map((article, index) => (
                <div
                  key={index}
                  className="bg-[#FBF6EC] shadow rounded overflow-hidden flex flex-col font-roboto h-full"
                >
                  <img
                    loading="lazy"
                    src={
                      article.thumbnail_path
                        ? `${CONFIG.serverUrl}/storage/${article.thumbnail_path}`
                        : "https://via.placeholder.com/400x200?text=No+Image"
                    }
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-base mb-6 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-700 flex-1 line-clamp-4">
                      {article.summary}
                    </p>
                    <Link
                      to={paths.actualitesDetails(article.slug)}
                      className="inline-block w-max mt-4 bg-[#B6B498] text-white py-2 px-4 rounded hover:bg-black duration-300"
                    >
                      {translateSync("Lire plus")}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-[#B6B498] text-white py-2 px-4 rounded hover:bg-black duration-300 disabled:opacity-50"
              >
                {translateSync("Précédent")}
              </button>
              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={index} className="py-2 px-4 text-gray-700">
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    onClick={() => handlePageChange(page)}
                    className={`py-2 px-4 rounded ${
                      currentPage === page
                        ? "bg-black text-white"
                        : "bg-[#B6B498] text-white hover:bg-black duration-300"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-[#B6B498] text-white py-2 px-4 rounded hover:bg-black duration-300 disabled:opacity-50"
              >
                {translateSync("Suivant")}
              </button>
            </div>
          )}
        </div>

        <div>
          <div className="mb-6">
            <input
              type="text"
              placeholder={translateSync("À la recherche de...")}
              className="w-full border border-gray-300 rounded py-2 px-3"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <h3 className="font-bold text-2xl mb-4">
            {translateSync("Catégories Articles")}
          </h3>
          <ul className="space-y-3 text-base font-roboto">
            {categories.map((item, i) => (
              <li key={i} className="hover:underline cursor-pointer">
                <Link to={`/actualites/categories/${item.slug}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="font-bold text-2xl mb-4 mt-8">
            {translateSync("Articles récents")}
          </h3>
          <ul className="space-y-3 text-base font-roboto">
            {recentArticles.map((item, i) => (
              <li key={i} className="hover:underline cursor-pointer">
                <Link to={paths.actualitesDetails(item.slug)}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center mb-8 mt-4">
        <Link
          to={"/assistance-contact"}
          className="font-bricolage bg-[#B6B498] py-2 px-4 rounded-full text-white hover:bg-black duration-300"
        >
          {translateSync("NOUS CONTACTER")}
        </Link>
      </div>
    </>
  );
}
