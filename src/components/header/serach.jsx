// src/components/header/search.jsx
import React, { useState } from "react";
import { MapPin, X, Loader2, Search as SearchIcon } from "lucide-react";
import {
  useLocationSearch,
  useServiceCategoriesSearch,
} from "src/actions/serach";
import { Link } from "react-router-dom";
import { useGetHomePage } from "src/actions/homepage";
import { useTranslation } from "src/context/translation-context";

const Search = () => {
  const { sections } = useGetHomePage();
  const { translateSync } = useTranslation();

  const {
    query: villeQuery,
    setQuery: setVilleQuery,
    suggestions: villeSuggestions = [],
    loading: villeLoading,
  } = useLocationSearch();

  const {
    query: serviceQuery,
    setQuery: setServiceQuery,
    suggestions: serviceSuggestions = [],
    loading: serviceLoading,
  } = useServiceCategoriesSearch();

  const [selectedService, setSelectedService] = useState("");
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  const section = sections?.find((s) => s.key === "section2");
  if (!section) return null;

  const handleClear = () => {
    setVilleQuery("");
    setSelectedService("");
    setServiceQuery("");
  };

  const handleSelectVille = (label) => {
    setVilleQuery(label);
  };

  const handleSelectCategory = (label) => {
    setSelectedService(label);
    setServiceQuery(label);
    setShowServiceDropdown(false);
  };

  const hasSearch = villeQuery.trim() || selectedService;

  const generateSlug = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const serviceSlug = selectedService ? generateSlug(selectedService) : "";
  const villeSlug = villeQuery ? generateSlug(villeQuery) : "";

  let searchUrl = null;
  if (hasSearch) {
    searchUrl = "/recherche";
    if (serviceSlug) searchUrl += `/${serviceSlug}`;
    if (villeSlug) searchUrl += `/${villeSlug}`;
  }

  return (
    <div className="relative w-screen left-[calc(-50vw+50%)] bg-white py-12">
      <div className="max-w-4xl mx-auto text-center px-8">
        <h1
          className="text-2xl md:text-3xl font-semibold mb-2"
          style={{ fontFamily: "Cormorant Garamond" }}
        >
          {translateSync(section.title)}
        </h1>

        <h2 className="mb-8 font-light text-2xl md:text-3xl text-[#B6B499]">
          {translateSync(section.description)}
        </h2>

        <form
          className="flex flex-col md:flex-row justify-center items-center gap-4 font-tahoma"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Ville */}
          <div className="relative w-full md:w-64">
            <label className="block text-sm text-gray-700 mb-1 text-left">
              {translateSync("Où ?")}
            </label>

            <div className="relative">
              <input
                type="text"
                value={villeQuery}
                onChange={(e) => setVilleQuery(e.target.value)}
                placeholder={translateSync("Paris, 75001...")}
                className="w-full border border-gray-800 rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <MapPin className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            {(villeSuggestions.length > 0 || villeLoading) && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                {villeLoading && (
                  <div className="flex items-center justify-center p-3 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    {translateSync("Recherche en cours...")}
                  </div>
                )}

                {villeSuggestions
                  .filter((loc) => loc.type === "location")
                  .map((loc) => (
                    <button
                      key={loc.key}
                      type="button"
                      onClick={() => handleSelectVille(loc.label)}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 border-b border-gray-100 last:border-0"
                    >
                      {loc.label}
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Service */}
          <div className="relative w-full md:w-64">
            <label className="block text-sm text-gray-700 mb-1 text-left">
              {translateSync("Quoi ?")}
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                className="w-full text-left border border-gray-800 rounded-md px-3 py-2 pr-10 text-sm flex justify-between"
              >
                <span
                  className={selectedService ? "text-black" : "text-gray-500"}
                >
                  {selectedService ||
                    translateSync("Spa, massage, duo...")}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {(villeQuery || selectedService) && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {showServiceDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                <div className="p-2 border-b border-gray-100">
                  <div className="relative">
                    <SearchIcon className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={serviceQuery}
                      onChange={(e) => setServiceQuery(e.target.value)}
                      placeholder={translateSync("Rechercher un soin...")}
                      className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded"
                      autoFocus
                    />
                  </div>
                </div>

                {serviceLoading && (
                  <div className="flex items-center justify-center p-3 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    {translateSync("Recherche...")}
                  </div>
                )}

                {serviceSuggestions.length > 0 ? (
                  serviceSuggestions.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleSelectCategory(item.label)}
                      className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                    >
                      {item.label}
                    </button>
                  ))
                ) : (
                  !serviceLoading &&
                  serviceQuery.length >= 2 && (
                    <div className="p-4 text-center text-sm text-gray-500">
                      {translateSync("Aucun résultat")}
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Bouton */}
          <div className="w-full md:w-auto mt-5">
            {hasSearch && searchUrl ? (
              <Link
                to={searchUrl}
                className="bg-black text-white p-3 rounded-md w-full uppercase tracking-wider text-sm font-medium flex justify-center"
              >
                {translateSync("Rechercher")}
              </Link>
            ) : (
              <button
                disabled
                className="bg-gray-300 text-gray-500 p-3 rounded-md w-full uppercase tracking-wider text-sm font-medium cursor-not-allowed"
              >
                {translateSync("Rechercher")}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
