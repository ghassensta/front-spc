import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CONFIG } from "src/config-global";
import { paths } from "src/router/paths";
import theImage from "src/assets/images/SPC-Essence-1975x1318-02.jpg";
import { useTranslation } from "src/context/translation-context";
import HeroImage from "src/components/hero-image/HeroImage";

export default function BlogDetails({ actualitie }) {
  const { translateSync } = useTranslation();

  if (!actualitie) return null;

  return (
    <>
      <HeroImage
        image={theImage}
        label="Actualité SPA & Bien-être"
        title={actualitie.title}
        opacity={40}
      />

      <div className="max-w-4xl mx-auto my-8 px-2">
        {actualitie.thumbnail_path && (
          <img
            lazyload="lazy"
            src={`${CONFIG.serverUrl}/storage/${actualitie.thumbnail_path}`}
            alt={translateSync(actualitie.title) || ""}
            className="mb-12 w-full object-cover"
          />
        )}

        <div
          className="prose space-y-4 max-w-none font-tahoma blog-container"
          dangerouslySetInnerHTML={{
            __html: translateSync(actualitie.content), // <-- traduction ici
          }}
        />

        {/* Bouton vers les établissements */}
        <div className="w-full flex items-center justify-center my-4">
          <Link
            to={paths.spa.list}
            className="bg-[#b8955a] font-roboto text-white py-2 px-4 rounded-full"
          >
            {translateSync("NOS ÉTABLISSEMENTS PARTENAIRES")}
          </Link>
        </div>

        <hr className="border-black my-6" />

        {/* Navigation articles */}
        <div className="flex justify-between font-roboto font-bold text-base mb-6">
          <Link
            to={paths.actualitesDetails(
              actualitie.prev_slug ?? actualitie.slug,
            )}
            className="flex items-center gap-2"
          >
            <FaChevronLeft /> {translateSync("Précédent")}
          </Link>
          <Link
            to={paths.actualitesDetails(
              actualitie.next_slug ?? actualitie.slug,
            )}
            className="flex items-center gap-2"
          >
            {translateSync("Suivant")} <FaChevronRight />
          </Link>
        </div>

        {/* Articles similaires */}
        {Array.isArray(actualitie.similaires) &&
          actualitie.similaires.length > 0 && (
            <>
              <h5 className="text-4xl text-center font-semibold mb-6">
                {translateSync("Articles Similaires")}
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {actualitie.similaires.map((article, index) => (
                  <div
                    key={index}
                    className="bg-[#FBF6EC] shadow rounded overflow-hidden flex flex-col font-roboto"
                  >
                    {article.thumbnail_path && (
                      <img
                        lazyload="lazy"
                        src={`${CONFIG.serverUrl}/storage/${article.thumbnail_path}`}
                        alt={translateSync(article.title)}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-base mb-2">
                        {translateSync(article.title)}
                      </h3>
                      <p className="text-sm text-gray-700 flex-1">
                        {translateSync(article.summary)}
                      </p>
                      <Link
                        to={paths.actualitesDetails(article.slug)}
                        className="inline-block w-max mt-4 bg-[#b8955a] text-white py-2 px-4 rounded hover:bg-black duration-300"
                      >
                        {translateSync("Lire plus")}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
      </div>
    </>
  );
}
