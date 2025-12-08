import React from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CONFIG } from "src/config-global";
import { paths } from "src/router/paths";
import theImage from "src/assets/images/SPC-Essence-1975x1318-02.jpg";

export default function BlogDetails({ actualitie }) {
  console.log(actualitie);
  return (
    <>
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden hidden md:block"
        style={{
          backgroundImage:
            `url(${theImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 " />{" "}
        {/* overlay */}
        <div className="absolute inset-0 flex items-center justify-center max-w-6xl mx-auto px-3 text-center">
          <h1 className="text-white text-4xl font-bold">{actualitie?.title}</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto my-8">
        <img
          lazyload="lazy"
          src={CONFIG.serverUrl + "/storage/" + actualitie?.thumbnail_path}
          alt=""
          className="mb-12"
        />

        <div className="px-2">
          <div
            className="prose space-y-4 max-w-none font-tahoma blog-container" // optional Tailwind typography plugin for better style
            dangerouslySetInnerHTML={{ __html: actualitie?.content }}
          />
          {/* {actualitie?.content} */}
          <div className="w-full flex items-center justify-center mb-4">
            <Link
              to={paths.spa.list}
              className="bg-[#B6B499] font-roboto  text-white py-2 px-4 rounded-full"
            >
              NOS ÉTABLISSEMENTS PARTENAIRES
            </Link>
          </div>
          <hr className="border-black" />
          <div className="flex justify-between font-bricolage">
            <Link
              to={paths.actualitesDetails(
                actualitie?.prev_slug ?? actualitie?.slug
              )}
              className="flex items-center font-bold gap-2"
            >
              <FaChevronLeft />
              Précédent
            </Link>
            <Link
              to={paths.actualitesDetails(
                actualitie?.next_slug ?? actualitie?.slug
              )}
              className="flex items-center font-bold gap-2"
            >
              Suivant
              <FaChevronRight />
            </Link>
          </div>
          {/*  <div className="font-bricolage flex items-center gap-4 text-xl">
            <strong>Partager la publication: </strong>
            <div className="flex gap-2">
              <FaFacebook />
              <FaXTwitter />
              <FaLinkedin />
            </div>
          </div> */}
          {actualitie?.similaires > 0 && (
            <h5 className="text-4xl text-center font-semibold">
              Articles Similaires
            </h5>
          )}

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {actualitie?.similaires.map((article, index) => (
              <div
                key={index}
                className="bg-[#FBF6EC] shadow rounded overflow-hidden flex flex-col font-roboto"
              >
                <img
                  lazyload="lazy"
                  src={CONFIG.serverUrl + "/storage/" + article.thumbnail_path}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-base mb-6">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-700 flex-1">
                    {article.summary}
                  </p>
                  <Link
                    to={paths.actualitesDetails(article.slug)}
                    className="inline-block w-max mt-4 bg-[#B6B498] text-white py-2 px-4 rounded hover:bg-black duration-300"
                  >
                    Lire plus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
