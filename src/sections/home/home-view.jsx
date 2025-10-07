import React from "react";
import Header from "./comp/header";

import ButtonIcon from "../../components/button-icon/button-icon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import Card from "../../components/card/card";
import { useGetEtablissements } from "src/actions/etablissements";
import { useGetLastNews } from "src/actions/actualites";
import { useLayout } from "src/actions/layout";
import { CONFIG } from "src/config-global";
import SpaCard from "src/components/spa-card/spa-card";
import { Link } from "react-router-dom";
import { paths } from "src/router/paths";
import { TranslatedText } from "src/components/translated-text/translated-text";

export default function HomeView() {
  const { etablissements } = useGetEtablissements();
  const { actualites } = useGetLastNews(3);
  const { marques, prochainement, carte } = useLayout();

  console.log(marques);

  return (
    <>
      <Header />

      {/* ETABLISSEMENT SECTION  */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center">
          <TranslatedText text="Des Moments Sélectionnés pour Vous." />{" "}
          <div className="text-[#B6B499] text-2xl">
            <TranslatedText
              text="Une collection choisie avec soin, pour celles et ceux en quête
            d’exceptions."
            />
          </div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
          {etablissements.slice(0, 4).map((etablissement) => (
            <SpaCard
              key={etablissement.id}
              to={`/spa/${etablissement.slug || etablissement.id}`}
              title={etablissement.nom || etablissement.id}
              description={etablissement.description_avant}
              image={etablissement.image_avant}
              location={etablissement.adresse}
              remise_offres={etablissement.remise_offres}
              prix_offres={etablissement.prix_offres}
              nombre_offres={etablissement.nombre_offres}
            />
          ))}
        </div>
        <div className="text-center">
          <ButtonIcon
            link={paths.spa.list}
            title="Découvrir toutes les offres"
          />
        </div>
      </div>

      {/* CARTE CADEAUX SECTION  */}
      <div
        style={{
          backgroundImage: `url("https://spa-prestige-collection.com/wp-content/uploads/2025/01/Piscine2.jpg")`,
        }}
        className="bg-primary w-screen relative bg-center left-[calc(-50vw+50%)] mt-16 min-h-32 overflow-hidden"
      >
        <div className="w-full flex flex-col z-10 relative items-center p-4 lg:p-16">
          <div className="bg-white/80 text-center flex flex-col items-center py-8 px-6 rounded-xl shadow-lg">
            {/* Vérifier que sectionCarte existe avant de lire ses propriétés */}
            {carte && carte.image && (
              <img
                lazyload="lazy"
                src={`${CONFIG.serverUrl}/storage/${carte.image}`}
                alt={carte.title || "Carte Cadeau"}
                className="mb-4 max-h-32 object-contain"
              />
            )}

            {/* Description (si carte existe) */}
            {carte && carte.description && (
              <p className="text-black font-tahoma text-base font-medium lg:w-1/2 uppercase mb-4">
                {carte.description}
              </p>
            )}

            {/* Bouton (si carte existe) */}
            {carte && carte.button_url && (
              <ButtonIcon
                title={carte.button_text || "OFFRIR"}
                link={carte?.button_url || paths.cadeau}
                // icon={<FaHandHoldingHeart />}
              />
            )}
          </div>
        </div>
      </div>

      <div
        className="relative w-screen left-[calc(-50vw+50%)]"
        style={{ backgroundColor: "#FFF" }}
      >
        <div className="max-w-6xl mx-auto py-4">
          <h2 className="text-4xl font-bold text-center">
            Moments de détente / Eclat & Soin de soi
            <div className="text-[#B6B499] mt-2">
              Découvrez nos offres séjour pour une détente absolue.
            </div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            <Card
              to={paths.product(
                "rituel-corps-relaxant-avec-massage-gommage-et-sauna-infrarouge-solo"
              )}
              title="Rituel Corps Relaxant avec Massage, Gommage et Sauna Infrarouge – Solo"
              image={`${CONFIG.serverUrl}/storage/uploads/products/vsh20tkZbTBA0YuocmFb2TgIEmFaCamZibo0cmSY.jpg`}
              headTitle= "Maison Blanche"
              buttonTitle= "Offrir cette expérience"
              location="11320 Montferrand France"
              bottomText="Jusqu'à 20% de remise"
              offreValue={320}
            />
            <Card
              to={paths.product("sejour-jai-fais-un-reve")}
              title="Séjour “J’ai Fais Un Rêve”"
              image={`${CONFIG.serverUrl}/storage/products/thumbnails/8XpFhMpcDYnO8ylgwSCGFrE4VX7jzfxS7lJcsOws.jpg`}
               headTitle= "Maison Blanche"
              buttonTitle= "Offrir cette expérience"
              location="11320 Montferrand France"
              bottomText="Jusqu'à 20% de remise"
              offreValue={320}
            />
            <Card
              to={paths.product(
                "soin-hydrafacial-x-myblend-soin-signature-solo"
              )}
              title="Soin Hydrafacial x MyBlend – Soin Signature – Solo"
              image={`${CONFIG.serverUrl}/storage/products/thumbnails/vA3qP0AqNpUqf2kwexPYT1cwjgQCsa7J6Kbsjrkx.jpg`}
               headTitle= "Maison Blanche"
              buttonTitle= "Offrir cette expérience"
              location="11320 Montferrand France"
              bottomText="Jusqu'à 20% de remise"
              offreValue={320}
            />
          </div>
          <div className="text-center">
            <ButtonIcon link={paths.spa.list} title="DÉCOUVRIR" />
          </div>
        </div>
      </div>

      <div
        className="relative w-screen left-[calc(-50vw+50%)]"
        style={{ backgroundColor: "beige" }}
      >
        <div className="max-w-6xl mx-auto py-4">
          <h2 className="text-4xl font-bold text-center">
            Escapades Bien-Être (Offres Séjour)
            <div className="text-[#B6B499] mt-2">
              Savourez des moments gourmands et relaxants.
            </div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            <Card
              to={paths.product(
                "rituel-corps-relaxant-avec-massage-gommage-et-sauna-infrarouge-solo"
              )}
              title="Rituel Corps Relaxant avec Massage, Gommage et Sauna Infrarouge – Solo"
              image={`${CONFIG.serverUrl}/storage/uploads/products/vsh20tkZbTBA0YuocmFb2TgIEmFaCamZibo0cmSY.jpg`}
            />
            <Card
              to={paths.product("sejour-jai-fais-un-reve")}
              title="Séjour “J’ai Fais Un Rêve”"
              image={`${CONFIG.serverUrl}/storage/products/thumbnails/8XpFhMpcDYnO8ylgwSCGFrE4VX7jzfxS7lJcsOws.jpg`}
            />
            <Card
              to={paths.product(
                "soin-hydrafacial-x-myblend-soin-signature-solo"
              )}
              title="Soin Hydrafacial x MyBlend – Soin Signature – Solo"
              image={`${CONFIG.serverUrl}/storage/products/thumbnails/vA3qP0AqNpUqf2kwexPYT1cwjgQCsa7J6Kbsjrkx.jpg`}
            />
          </div>
          <div className="text-center">
            <ButtonIcon link={paths.spa.list} title="Découvrir" />
          </div>
        </div>
      </div>

      <div
        className="relative w-screen left-[calc(-50vw+50%)]"
        style={{ backgroundColor: "white" }}
      >
        <div className="max-w-6xl mx-auto py-4">
          <h2 className="text-4xl font-bold text-center">
            Plaisirs & Saveurs
            <div className="text-[#B6B499] mt-2">
              Boostez votre énergie avec nos activités dynamiques.
            </div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            <Card
              to={paths.product(
                "rituel-corps-relaxant-avec-massage-gommage-et-sauna-infrarouge-solo"
              )}
              title="Rituel Corps Relaxant avec Massage, Gommage et Sauna Infrarouge – Solo"
              image={`${CONFIG.serverUrl}/storage/uploads/products/vsh20tkZbTBA0YuocmFb2TgIEmFaCamZibo0cmSY.jpg`}
            />
            <Card
              to={paths.product("sejour-jai-fais-un-reve")}
              title="Séjour “J’ai Fais Un Rêve”"
              image={`${CONFIG.serverUrl}/storage/products/thumbnails/8XpFhMpcDYnO8ylgwSCGFrE4VX7jzfxS7lJcsOws.jpg`}
            />
            <Card
              to={paths.product(
                "soin-hydrafacial-x-myblend-soin-signature-solo"
              )}
              title="Soin Hydrafacial x MyBlend – Soin Signature – Solo"
              image={`${CONFIG.serverUrl}/storage/products/thumbnails/vA3qP0AqNpUqf2kwexPYT1cwjgQCsa7J6Kbsjrkx.jpg`}
            />
          </div>
          <div className="text-center">
            <ButtonIcon link={paths.spa.list} title="Découvrir" />
          </div>
        </div>
      </div>
      <div
        className="relative w-screen left-[calc(-50vw+50%)]"
        style={{ backgroundColor: "beige" }}
      >
        <div className="max-w-6xl mx-auto py-4">
          <h2 className="text-4xl font-bold text-center">
            Vitalité & Mouvement
            <div className="text-[#B6B499] mt-2">
              Découvrez nos offres à venir.
            </div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            <Card
              to={paths.product(
                "rituel-corps-relaxant-avec-massage-gommage-et-sauna-infrarouge-solo"
              )}
              title="Rituel Corps Relaxant avec Massage, Gommage et Sauna Infrarouge – Solo"
              image={`${CONFIG.serverUrl}/storage/uploads/products/vsh20tkZbTBA0YuocmFb2TgIEmFaCamZibo0cmSY.jpg`}
            />
            <Card
              to={paths.product("sejour-jai-fais-un-reve")}
              title="Séjour “J’ai Fais Un Rêve”"
              image={`${CONFIG.serverUrl}/storage/products/thumbnails/8XpFhMpcDYnO8ylgwSCGFrE4VX7jzfxS7lJcsOws.jpg`}
            />
            <Card
              to={paths.product(
                "soin-hydrafacial-x-myblend-soin-signature-solo"
              )}
              title="Soin Hydrafacial x MyBlend – Soin Signature – Solo"
              image={`${CONFIG.serverUrl}/storage/products/thumbnails/vA3qP0AqNpUqf2kwexPYT1cwjgQCsa7J6Kbsjrkx.jpg`}
            />
          </div>
          <div className="text-center">
            <ButtonIcon link={paths.spa.list} title="Découvrir" />
          </div>
        </div>
      </div>

      {/* PROCHAINEMENT & CARDS SECTION  */}
      <div
        className=" relative w-screen left-[calc(-50vw+50%)]"
        style={{
          backgroundColor: "white",
        }}
      >
        <div className="max-w-6xl mx-auto py-4">
          <h2 className="text-4xl font-bold text-center">
            {prochainement?.title || "L’univers Spa & Prestige Collection."}
            <div className="text-[#B6B499] mt-2">
              {prochainement?.description ||
                "Un réseau confidentiel dédié aux lieux d’exception."}
            </div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            {prochainement?.extra_data?.cards?.map((item, index) => (
              <Card
                key={index} // React nécessite une clé unique
                to={paths.spa.list}
                title={item.title || "Sans titre"}
                image={
                  item.image
                    ? `${CONFIG.serverUrl}${item.image}`
                    : "/assets/img/placeholder.png"
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* L'UNIVERS SECTION  */}
      <div className=" relative w-screen left-[calc(-50vw+50%)] bg-[beige]">
        <div className="max-w-6xl mx-auto py-4">
          <h2 className="text-4xl font-bold text-center">
            L’univers Spa & Prestige Collection.{" "}
            <div className="text-[#B6B499]">
              Un réseau confidentiel dédié aux lieux d’exception.
            </div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card
              to={paths.who}
              title="Qui sommes-nous ?"
              image="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg"
            />
            <Card
              to={paths.referentiel}
              title="Référentiel de candidature"
              image="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg"
            />
            <Card
              to={paths.collection}
              title="Collection Prestige"
              image="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg"
            />
          </div>
        </div>
      </div>

      {/* ACTUALITES SECTION  */}
      {actualites.length > 0 && (
        <div className="bg-white rounded-lg  left-[calc(-50vw+50%)] relative w-screen">
          <div className="max-w-6xl mx-auto py-4">
            <h2 className="text-4xl font-bold text-center">
              Actualités
              <div className="text-[#B6B499]">Nos derniers articles</div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {actualites.map((actualite) => (
                <div
                  className="mb-3 relative cursor-pointer"
                  key={actualite.id}
                >
                  <img
                    lazyload="lazy"
                    src={`${CONFIG.serverUrl}/storage/${actualite.thumbnail_path}`}
                    alt={actualite.title}
                  />
                  <span className="absolute bg-black/25 w-full h-full top-0 left-0" />
                  <Link
                    to={paths.actualitesDetails(actualite.slug)}
                    className="absolute bottom-0 text-white text-2xl p-2 pb-5 font-bold"
                  >
                    {actualite.title}
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center">
              <ButtonIcon link={paths.actualites} title="Tous nos articles" />
            </div>
          </div>
        </div>
      )}

      {/* MARQUES PARTENAIRES SECTION  */}
      {marques?.extra_data?.logos && (
        <div className="bg-white rounded-lg">
          <div className="max-w-6xl mx-auto py-12">
            <h2 className="text-4xl font-bold text-center">
              {marques.title || "Nos marques partenaires"}
            </h2>
            <p className="text-center text-gray-500 mt-2 mb-8">
              {marques.description}
            </p>

            {/* Gestion du loading et erreur */}

            {Object.keys(marques?.extra_data?.logos || {}).length > 0 ? (
              <Swiper
                spaceBetween={20}
                modules={[Autoplay, Navigation]}
                autoplay={{ delay: 3000 }}
                navigation={{
                  prevEl: ".swiper-button-prev",
                  nextEl: ".swiper-button-next",
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {Object.values(marques?.extra_data?.logos || {}).map(
                  (marque, i) => (
                    <SwiperSlide
                      key={i}
                      className="flex justify-center w-full h-48"
                    >
                      <a
                        href={marque.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full h-full"
                      >
                        <img
                          lazyload="lazy"
                          className="mx-auto max-h-full object-contain"
                          src={
                            marque.image
                              ? `${CONFIG.serverUrl}/storage/${marque.image}`
                              : "/assets/img/placeholder.png"
                          }
                          alt={`Logo partenaire ${i + 1}`}
                        />
                      </a>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            ) : (
              <p className="text-center text-gray-400">
                Aucune marque partenaire disponible pour le moment.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
