import React from "react";
import { paths } from "src/router/paths";

export default function BlogPage() {
  const articles = [
    {
      title:
        "Lodge de Luxe en France : Votre Évasion Nature au Domaine des Prés Verts",
      excerpt:
        "Lodge de Luxe en France : Votre Évasion Nature au Domaine des Prés Verts. Dans un monde en quête de sérénité...",
      image:
        "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg",
      link: paths?.actualitesDetails("lodge-de-luxe-en-france"),
    },
    {
      title: "Voyager Autrement : L’Art de Partir Sans Voiture",
      excerpt:
        "Voyager Autrement : L’Art de Partir Sans Voiture. Partir en vacances sans voiture est une tendance en plein essor...",
      image:
        "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg",
      link: paths.actualitesDetails("lodge-de-luxe-en-france"),
    },
    {
      title: "Hydrafacial : Le Soin Star pour une Peau Visiblement Sublimée",
      excerpt:
        "Découvrez pourquoi l'Hydrafacial est devenu incontournable pour une peau éclatante...",
      image:
        "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg",
      link: paths.actualitesDetails("lodge-de-luxe-en-france"),
    },
    {
      title:
        "Sécurité Hivernale : 7 Pratiques Naturelles pour Rééquilibrer Votre Énergie",
      excerpt:
        "En hiver, prenez soin de votre corps avec ces 7 pratiques simples et naturelles...",
      image:
        "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg",
      link: paths.actualitesDetails("lodge-de-luxe-en-france"),
    },
  ];

  const recentArticles = [
    "Lodge de Luxe en France : Votre Évasion Nature au Domaine des Prés Verts",
    "Voyager Autrement : L’Art de Partir Sans Voiture",
    "Élixir des Saisons à Thiers : Quand l’Hébergement Devient Évasion",
    "Hydrafacial : Le Soin Star pour une Peau Visiblement Sublimée",
    "Sécurité Hivernale : 7 pratiques naturelles pour rééquilibrer votre énergie",
  ];

  return (
    <>
      {/* Hero Section */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden hidden md:block"
        style={{
          backgroundImage:
            "url('https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />{" "}
        {/* overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Actualités</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Articles */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-[#FBF6EC] shadow rounded overflow-hidden flex flex-col font-roboto"
            >
              <img lazyload="lazy"
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-base mb-6">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-700 flex-1">
                  {article.excerpt}
                </p>
                <a
                  href={article.link}
                  className="inline-block w-max mt-4 bg-[#B6B498] text-white py-2 px-4 rounded hover:bg-black duration-300"
                >
                  Lire plus
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div>
          <div className="mb-6">
            <input
              type="text"
              placeholder="À la recherche de..."
              className="w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>
          <h3 className="font-bold text-2xl mb-4">Articles récents</h3>
          <ul className="space-y-3 text-base font-roboto">
            {recentArticles.map((item, i) => (
              <li key={i} className="hover:underline cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center my-4">
        <button className="font-bricolage bg-[#B6B498] py-2 px-4 rounded-full text-white hover:bg-black duration-300">
          NOUS CONTACTER
        </button>
      </div>
    </>
  );
}