import React from "react";
import Header from "./comp/header";
import Section from "./comp/section";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";
import { useLayout } from "src/actions/layout";
import { CONFIG } from "src/config-global";
import { useGetEtablissements } from "src/actions/etablissements";

export default function HomePageView() {
  const { etablissements } = useGetEtablissements();
  const sections = [
    {
      bg: "white",
      header: "Accès Spa",
      subheader:
        "Plongez dans un univers de détente et profitez librement de nos espaces bien-être.",
      link: "/offres",
      data: [
        {
          slug: "massage-deluxe",
          name: "Massage Deluxe",
          image:
            "products/thumbnails/vA3qP0AqNpUqf2kwexPYT1cwjgQCsa7J6Kbsjrkx.jpg",
          spaName: "Zen Spa",
          spaLocation: "Tunis",
          offre: "-20%",
          offreValue: 20,
        },
        {
          slug: "soin-visage",
          name: "Soin du visage",
          image:
            "uploads/products/vsh20tkZbTBA0YuocmFb2TgIEmFaCamZibo0cmSY.jpg",
          spaName: "Beauty Lounge",
          spaLocation: "Sousse",
          offre: "-10%",
          offreValue: 10,
        },
        {
          slug: "spa-relax",
          name: "Spa Relax",
          image:
            "products/thumbnails/8XpFhMpcDYnO8ylgwSCGFrE4VX7jzfxS7lJcsOws.jpg",
          spaName: "Oasis Spa",
          spaLocation: "La Marsa",
          offre: "-15%",
          offreValue: 15,
        },
        {
          slug: "spa-relax",
          name: "Spa Relax",
          image:
            "products/thumbnails/8XpFhMpcDYnO8ylgwSCGFrE4VX7jzfxS7lJcsOws.jpg",
          spaName: "Oasis Spa",
          spaLocation: "La Marsa",
          offre: "-15%",
          offreValue: 15,
        },
      ],
    },
    {
      bg: "beige",
      header: "Nouvelles expériences",
      subheader: "À découvrir cette semaine",
      link: "/nouveautes",
      data: [
        {
          slug: "bain-marocain",
          name: "Bain Marocain",
          image:
            "products/thumbnails/vA3qP0AqNpUqf2kwexPYT1cwjgQCsa7J6Kbsjrkx.jpg",
          spaName: "Riad Hammam",
          spaLocation: "Hammamet",
          offre: "Nouveau",
          offreValue: 20,
        },
        {
          slug: "yoga-session",
          name: "Session Yoga",
          image:
            "uploads/products/vsh20tkZbTBA0YuocmFb2TgIEmFaCamZibo0cmSY.jpg",
          spaName: "Zen Life Center",
          spaLocation: "Nabeul",
          offre: "New",
          offreValue: 20,
        },
        {
          slug: "sauna-premium",
          name: "Sauna Premium",
          image:
            "products/thumbnails/8XpFhMpcDYnO8ylgwSCGFrE4VX7jzfxS7lJcsOws.jpg",
          spaName: "Hot Spa",
          spaLocation: "Sfax",
          offre: "New",
          offreValue: 20,
        },
        {
          slug: "sauna-premium",
          name: "Sauna Premium",
          image:
            "products/thumbnails/8XpFhMpcDYnO8ylgwSCGFrE4VX7jzfxS7lJcsOws.jpg",
          spaName: "Hot Spa",
          spaLocation: "Sfax",
          offre: "New",
          offreValue: 20,
        },
      ],
    },
  ];


  const { carte } = useLayout();

  return (
    <>
      <Header />
      
      {/* <div
        style={{
          backgroundImage: `url("https://spa-prestige-collection.com/wp-content/uploads/2025/01/Piscine2.jpg")`,
        }}
        className="bg-primary w-screen relative bg-center left-[calc(-50vw+50%)] min-h-32 overflow-hidden"
      >
        <div className="w-full flex flex-col z-10 relative items-center p-4 lg:p-16">
          <div className="bg-white/80 text-center flex flex-col items-center py-8 px-6 rounded-xl shadow-lg">
            {carte && carte.image && (
              <img
                lazyload="lazy"
                src={`${CONFIG.serverUrl}/storage/${carte.image}`}
                alt={carte.title || "Carte Cadeau"}
                className="mb-4 max-h-32 object-contain"
              />
            )}

            {carte && carte.description && (
              <p className="text-black font-tahoma text-base font-medium lg:w-1/2 uppercase mb-4">
                {carte.description}
              </p>
            )}

            {carte && carte.button_url && (
              <ButtonIcon
                title={carte.button_text || "OFFRIR"}
                link={carte?.button_url || paths.cadeau}
                // icon={<FaHandHoldingHeart />}
              />
            )}
          </div>
        </div>
      </div> */}
      <div className="px-2">
        {sections.map((section, index) => (
          <Section key={index} {...section} />
        ))}
      </div>
    </>
  );
}
