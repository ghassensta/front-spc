import React from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const articles = [
    {
      title:
        "Lodge de Luxe en France : Votre Évasion Nature au Domaine des Prés Verts",
      excerpt:
        "Lodge de Luxe en France : Votre Évasion Nature au Domaine des Prés Verts. Dans un monde en quête de sérénité...",
      image:
        "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg",
      link: "#",
    },
    {
      title: "Voyager Autrement : L’Art de Partir Sans Voiture",
      excerpt:
        "Voyager Autrement : L’Art de Partir Sans Voiture. Partir en vacances sans voiture est une tendance en plein essor...",
      image:
        "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg",
      link: "#",
    },
  ];

export default function BlogDetails() {
  return (
    <>
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden"
        style={{
          backgroundImage:
            "url('https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 " />{" "}
        {/* overlay */}
        <div className="absolute inset-0 flex items-center justify-center max-w-6xl mx-auto px-3 text-center">
          <h1 className="text-white text-4xl font-bold">
            Lodge de Luxe en France : Votre Évasion Nature au Domaine des Prés
            Verts
          </h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto my-8">
        <img
          src="https://spa-prestige-collection.com/wp-content/uploads/2025/06/59.png"
          alt=""
          className="mb-12"
        />

        <div className="space-y-4">
          <h5 className="text-4xl font-semibold">
            Lodge de Luxe en France : Votre Évasion Nature au Domaine des Prés
            Verts
          </h5>
          <p className="font-bricolage text">
            Dans un monde en quête de sérénité, le concept de lodge de luxe
            s’affirme comme l’ultime réponse à nos désirs d’évasion. Loin des
            standards hôteliers classiques, un lodge promet une expérience
            immersive en pleine nature, alliant confort haut de gamme et
            authenticité. Découvrez pourquoi ces havres de paix sont synonymes
            de détente absolue et laissez-vous charmer par l’exemple
            exceptionnel du Domaine des Prés Verts & Spa, véritable référence en
            matière d’hébergement insolite en Bourgogne.
          </p>
          <h6 className="text-3xl">
            Qu'est-ce qu'un Lodge ? L'Art de l'Hôtellerie en Nature
          </h6>
          <p className="font-bricolage text">
            Le terme “lodge”, autrefois associé à des habitations rustiques,
            désigne aujourd’hui des établissements touristiques d’exception,
            conçus pour une intégration parfaite dans l’environnement naturel.
            Qu’il s’agisse d’une cabane en bois, d’une tente safari de luxe ou
            d’une suite contemporaine, chaque lodge partage des principes
            fondamentaux pour des vacances nature inoubliables :
          </p>
          <ul className="list-item font-bricolage list-disc ml-6">
            <li>
              Intégration Écologique : Une architecture respectueuse de
              l’environnement, privilégiant les matériaux locaux et les grandes
              ouvertures pour maximiser la connexion avec le paysage. Un choix
              idéal pour un séjour éco-responsable.
            </li>
            <li>
              Luxe Discret et Intimité : Malgré une esthétique souvent rustique,
              le lodge offre un confort sans compromis : literie haut de gamme,
              salles de bain modernes, cheminées. Chaque espace est pensé pour
              une intimité précieuse.
            </li>
            <li>
              Calme et Déconnexion : Conçus pour une tranquillité maximale, les
              lodges invitent à la déconnexion numérique, favorisant un retour
              aux sources et un repos profond.
            </li>
            <li>
              Activités Nature & Bien-être : L’expérience est enrichie par des
              activités de plein air (randonnées, observation faunique) et
              souvent des options de bien-être, pour une retraite nature
              complète.
            </li>
            <li>
              Gastronomie Locale Raffinée : La mise en valeur des produits du
              terroir et de la cuisine locale offre une dimension gourmande à
              l’immersion culturelle.
            </li>
          </ul>
          <h6 className="text-3xl">
            Le Lodge : Plus qu'un Hébergement, une Philosophie de Voyage
          </h6>
          <p className="font-bricolage text">
            Choisir un lodge, c’est adopter une philosophie de voyage. C’est
            privilégier l’authenticité, le respect de l’environnement et la
            recherche d’une expérience de séjour qui va au-delà de la simple
            nuitée. C’est l’opportunité de se réveiller au chant des oiseaux, de
            prendre son petit-déjeuner face à un panorama époustouflant, et de
            s’endormir sous un ciel étoilé, loin de toute pollution lumineuse.
            Pour des vacances insolites et une immersion totale en pleine
            nature, le lodge est la solution idéale.
          </p>
          <div className="w-full flex items-center justify-center">
            <button className="bg-[#B6B499] font-roboto  text-white py-2 px-4 rounded-full">
              OFFRIR UNE CARTE CADEAU
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-around gap-6">
            <img
              src="https://spa-prestige-collection.com/wp-content/uploads/2025/06/58-1024x683.png"
              className="w-full"
              alt=""
            />
            <img
              src="https://spa-prestige-collection.com/wp-content/uploads/2025/06/61-1024x683.png"
              className="w-full"
              alt=""
            />
          </div>
          <h6 className="text-3xl">
            Exemple Concret : Le Domaine des Prés Verts, Votre Lodge d'Exception
            en Bourgogne
          </h6>
          <p className="font-bricolage text">
            Pour illustrer parfaitement cette philosophie, prenons l’exemple du
            Domaine des Prés Verts. Niché au cœur d’une nature préservée en
            Bourgogne, ce domaine incarne l’essence même du lodge de luxe à la
            française. C’est une destination incontournable pour un séjour
            romantique ou une escapade ressourçante.
          </p>
          <p className="font-bricolage text">
            Dès l’arrivée, le Domaine ne se visite pas, il se ressent. Classé
            dans le{" "}
            <strong>
              Top 3 mondial des Hôtels Hors du Commun sur Tripadvisor en 2023
            </strong>{" "}
            et sélectionné par le <strong>Guide Michelin des Hôtels,</strong> il
            symbolise une hospitalité discrète mais passionnée. Fondé en 2011
            par Jérémy Leleu avec une première cabane perchée, le Domaine
            propose aujourd’hui huit hébergements insolites de luxe. Chacun,
            qu’il s’agisse d’une cabane perchée avec jacuzzi, d’une roulotte ou
            d’une suite contemporaine, dispose de jacuzzis privatifs, terrasses
            panoramiques et d’un service hôtelier personnalisé de haut niveau.
            Ce précurseur de la <strong>“homespitality”</strong> fusionne le
            confort d’un logement insolite avec les standards d’un hôtel de
            luxe.
          </p>
          <p className="font-bricolage">
            Le Domaine invite à une détente absolue, sublimée par des
            expériences exclusives : soins bien-être, balades en 2CV, dîners
            locaux en chambre et escapades œnologiques. Chaque détail est pensé
            pour un luxe simple et sensoriel, une intimité précieuse où le temps
            suspend son cours.
          </p>
          <h6 className="text-3xl">
            Le Cube Spa Vinésime : Votre Sanctuaire de Bien-être Privatif
          </h6>
          <p className="font-bricolage">
            Au cœur du Domaine, à proximité de Beaune et Dijon, Le Cube Spa
            Vinésime offre une parenthèse confidentielle entre vignes et
            volupté. Ce sanctuaire de bien-être, privatisable pour une
            expérience en solo ou en duo, a été conçu pour une déconnexion
            totale et une profonde revitalisation. Dans un cadre épuré et
            naturel, profitez d’un espace comprenant hammam, sauna, douche
            sensorielle, tisanerie et terrasse avec jardin. Les soins sur-mesure
            et rituels s’inspirent des bienfaits du vignoble Bourguignon,
            utilisant des produits des marques Vinésime, Minimaliste et Bivouak,
            formulés à base de Pinot Noir de Gevrey-Chambertin et bourgeons de
            Cassis Noir. Découvrez la vinocosmétique pour révéler l’éclat
            naturel de votre peau et apaiser corps et esprit. L’approche
            sur-mesure du spa, alliant expertise et ingrédients d’exception,
            garantit une discrétion absolue et des résultats incomparables. Le
            spa est ouvert 7j/7, de 9h00 à 20h00.
          </p>
          <h6 className="text-3xl">
            Le Bistrot des Prés Verts : L'Art de Vivre Bourguignon à Châteauneuf
          </h6>
          <p className="font-bricolage">
            Au cœur de Châteauneuf, classé parmi les plus beaux villages de
            France, Le Bistrot des Prés Verts réinvente l’art de la dégustation.
            Ce bar à vins et cave à manger confidentiel, aux pierres apparentes
            et à l’ambiance feutrée, célèbre la Bourgogne gourmande et
            conviviale. Vins de vignerons locaux, ardoises gourmandes et
            douceurs sucrées sont soigneusement sélectionnés. Dégustez sur place
            ou à emporter, à l’intérieur ou sur la terrasse végétalisée, pour un
            rendez-vous épicurien authentique et chaleureux.
          </p>
          <h6 className="text-3xl">
            Votre Refuge en Bourgogne : Le Domaine des Prés Verts & Spa
          </h6>
          <p className="font-bricolage">
            Situé entre Dijon, Beaune et le Parc naturel du Morvan, le Domaine
            des Prés Verts & Spa est une adresse emblématique,{" "}
            <strong>
              reconnue internationalement pour son concept unique d’hôtellerie
              intimiste en pleine nature.
            </strong>{" "}
            C’est le lieu idéal pour une parenthèse enchantée, une invitation à
            ralentir, respirer et se reconnecter à l’essentiel. Une destination
            singulière, à la croisée du romantisme, du raffinement et de la
            nature.
          </p>
          <h6 className="text-3xl">Informations & Contact :</h6>
          <ul className="font-bricolage list-disc ml-6">
            <li>
              <span className="font-bold">Adresse :</span>10 impasse des Prés
              Verts, 21230 JOUEY, Hameau de Pochey
            </li>
            <li>
              <span className="font-bold">Email Réservations :</span>
              info@domainedespresverts.com
            </li>
            <li>
              <span className="font-bold">Email Spa :</span>spa@presverts.fr
            </li>
            <li>
              <span className="font-bold">Téléphone :</span> 03 45 44 05 60
            </li>
          </ul>
          <p className="font-bricolage">
            En somme, le Domaine des Prés Verts n’est pas qu’un simple lieu de
            séjour ; c’est une destination qui offre une parenthèse enchantée,
            une invitation à ralentir, à respirer et à se reconnecter à
            l’essentiel. Il illustre parfaitement la promesse d’un séjour en
            lodge réussi en France et démontre que le luxe peut rimer avec
            simplicité et que la véritable richesse se trouve parfois dans la
            quiétude de la nature.
          </p>
          <div className="w-full flex items-center justify-center">
            <button className="bg-[#B6B499] font-roboto  text-white py-2 px-4 rounded-full">
              NOS ÉTABLISSEMENTS PARTENAIRES
            </button>
          </div>
          <hr className="border-black" />
          <div className="flex justify-between font-bricolage">
            <button className="flex items-center font-bold gap-2">
              <FaChevronLeft />
              Précédent
            </button>
            <button className="flex items-center font-bold gap-2">
              Suivant
              <FaChevronRight />
            </button>
          </div>
          <div className="font-bricolage flex items-center gap-4 text-xl">
            <strong>Partager la publication: </strong>
            <div className="flex gap-2">
              <FaFacebook />
              <FaXTwitter />
              <FaLinkedin />
            </div>
          </div>

           <h5 className="text-4xl text-center font-semibold">
            Articles Similaires
          </h5>
           <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-[#FBF6EC] shadow rounded overflow-hidden flex flex-col font-roboto"
            >
              <img
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
        </div>
      </div>
    </>
  );
}