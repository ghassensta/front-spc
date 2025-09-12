import React from "react";

export default function CollectionPrestigePage() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden"
        style={{
          backgroundImage:
            "url('https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-white text-4xl md:text-5xl max-w-5xl mx-auto text-center font-bold leading-snug">
            Collection Prestige — bien plus qu’un guide, une vitrine d’exception
          </h1>
        </div>
      </div>

      {/* Intro Section */}
      <div className="my-8 px-4">
        <h5 className="text-2xl md:text-3xl text-center mb-6">
          Bientôt disponible, Collection Prestige revient avec une nouvelle
          édition dédiée aux plus belles adresses bien-être de notre réseau.
        </h5>
        <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] text-center font-bricolage py-8 text-lg">
          <div className="max-w-3xl mx-auto mb-6 px-4">
            Imprimé avec soin et diffusé chaque année, ce guide haut de gamme
            devient un{" "}
            <span className="font-bold">véritable passeport d’inspiration</span>{" "}
            pour une clientèle en quête d’expériences uniques et de lieux
            soigneusement sélectionnés.
          </div>
          <ul className="list-disc max-w-3xl mx-auto space-y-5 text-left pl-6 pr-4">
            <li>
              <span className="font-bold">
                Présenté lors des grands rendez-vous du secteur
              </span>{" "}
              (Thermalies, Hôtel & Restaurant Meetings, EquipHôtel…),
            </li>
            <li>
              <span className="font-bold">
                Distribué dans nos établissements partenaires
              </span>
              , intégré à nos{" "}
              <span className="font-bold">coffrets cadeaux</span>, remis lors de
              nos <span className="font-bold">rencontres professionnelles</span>{" "}
              — Ce support élégant s’impose comme{" "}
              <span className="font-bold">
                un outil stratégique de visibilité ciblée.
              </span>
            </li>
            <li>
              <span className="font-bold">
                Conçu et valorisé par Isabelle Charrier
              </span>
              , experte reconnue du bien-être et fondatrice du magazine{" "}
              <span className="italic">Sense of Wellness</span>, il incarne une
              vision contemporaine, exigeante et inspirée du monde du spa et de
              l’hôtellerie bien-être.
            </li>
          </ul>
        </div>
      </div>

      {/* Checkmarks & Adhesion Section */}
      <div className="max-w-6xl mx-auto gap-10 py-12 px-4 items-center">
        {/* Left Side: Checkmark List */}
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {[
            "Une visibilité sélective et qualitative",
            "Un accès direct à une audience affinitaire",
            "Une mise en lumière cohérente et raffinée de votre établissement",
            "Un levier d’image, de notoriété et d’opportunités concrètes",
            "Une vitrine de choix pour être vu… là où il faut, par ceux qu’il faut",
            "Une édition limitée à fort impact",
            "Une opportunité à ne pas manquer.",
          ].map((text, i) => (
            <div key={i} className="flex items-start text-3xl space-x-3">
              <span className="leading-none mt-1">✔</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <p className="italic mt-4 text-3xl font-bold text-center">
          Et si votre établissement en faisait partie ?
        </p>

        {/* Right Side: Adhesion Info */}
      </div>

      <div className="bg-[#FBF6EC] p-8 w-screen relative left-[calc(-50vw+50%)] rounded-lg shadow-lg flex flex-col items-center ">
        <div className="max-w-6xl grid grid-cols-2 gap-4">
          <div className="font-bricolage">
            <h3 className="text-xl font-bold mb-4 ">
              Modalités d’adhésion – Spa & Prestige Collection
            </h3>
            <p className="text-lg text-justify leading-relaxed mb-6">
              Les établissements souhaitant rejoindre Spa & Prestige Collection
              doivent fournir une documentation détaillant leur conformité aux
              critères de ce référentiel (certifications, photos, etc.). Ce
              référentiel garantit que les établissements respectent des
              standards élevés, assurant ainsi une expérience client d’exception
              et une qualité cohérente au sein du réseau.
            </p>
            <div className="flex flex-col gap-4 w-full justify-center items-center">
              <button className="bg-[#A88A4D] w-max text-white px-12 rounded-full py-2 rounded hover:bg-[#8c723e] transition">
                Devenir partenaire
              </button>
              <button className="bg-gray-500 w-max text-white px-12 rounded-full py-2 rounded hover:bg-gray-600 transition">
                Nous contacter
              </button>
            </div>
          </div>
          <img
            src="https://spa-prestige-collection.com/wp-content/uploads/2025/05/SPC-Catalogue-1975x1318-1-1024x683.jpg"
            alt="Spa & Prestige Collection"
            className="w-full mb-6 rounded shadow"
          />
        </div>
      </div>
    </>
  );
}