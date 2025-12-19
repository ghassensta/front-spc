import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";
import theImage from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";
import theImage2 from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-01.jpg";
import theImage3 from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-03.jpg";
import theImage4 from "src/assets/images/SPC-carte-cadeau-montant-3.jpg";

export default function WhoPageView() {
  const images = [
    theImage,
    theImage2,
    theImage3,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, 5000); 
    };

    startTimer();

    return () => clearInterval(timerRef.current);
  }, [images.length]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetTimer();
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    resetTimer();
  };

  return (
    <div className="">
      <div className="flex bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] px-5 ">
        <div className="max-w-6xl mx-auto py-6 px-1">
          <h1 className="text-4xl font-bold mb-4">
            L'Essence de Spa & Prestige Collection
          </h1>
          <div className="flex flex-col md:flex-row gap-8">
            <p className="font-roboto md:w-1/2 pr-6">
              <p className="mb-3">
                <span className="font-bold">Spa & Prestige Collection</span>{" "}
                réunit des établissements d’exception, soigneusement
                sélectionnés pour leur confort, leur ambiance singulière et leur
                service sur-mesure. Spas urbains, thermes apaisants, hôtels de
                charme ou refuges insolites, chaque lieu a été choisi pour
                offrir des instants mémorables alliant authenticité et
                bienveillance.
              </p>
              <p className="mb-3">
                Nous travaillons main dans la main avec nos établissements
                partenaires, qui partagent notre vision de préserver et
                valoriser des lieux empreints de caractère. Ces établissements
                s’engagent à créer un cadre propice à la détente, avec un
                accueil chaleureux et une attention portée à chaque détail.
                Ensemble, nous garantissons une expérience inoubliable, alliant
                plénitude et bien-être.
              </p>
              <p className="mb-3">
                Rejoindre Spa & Prestige Collection c’est accéder à un univers
                pensé autant pour nos membres que pour nos partenaires. Nos
                membres bénéficient de privilèges exclusifs, tels que des
                expériences sur mesure et l’accès à des lieux de confiance,
                tandis que nos partenaires profitent d’une visibilité renforcée
                et d’un accompagnement dédié.
              </p>

              <p className="italic">
                Ensemble, nous créons des expériences inoubliables, accessibles,
                dans un esprit de sérénité et d’élégance.
              </p>
            </p>
             <div className="w-[90%] mx-auto md:w-1/2 relative">
             <div className="relative">
              <div className="relative w-full h-[400px] overflow-hidden">
                {images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Spa & Prestige Slide ${index + 1}`}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out ${
                      currentSlide === index
                        ? "translate-x-0"
                        : index < currentSlide
                        ? "-translate-x-full"
                        : "translate-x-full"
                    }`}
                    loading="lazy"
                  />
                ))}
              </div>
              {}
              <button
                onClick={goToPrev}
                className="absolute top-1/2 -left-8 transform -translate-y-1/2 text-black p-2 rounded-full transition-colors duration-300"
                aria-label="Previous slide"
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-black p-2 rounded-full transition-colors duration-300"
                aria-label="Next slide"
              >
                <FaChevronRight size={20} />
              </button>
              {}
              <div className="absolute mt-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full ${
                      currentSlide === index ? "bg-black" : "bg-gray-400"
                    } hover:bg-[#B6B498] transition-colors duration-300`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-6 px-1">
        <h2 className="text-4xl font-bold text-center mb-6">Nos valeurs</h2>
        <div className="text-base font-roboto font-normal text-center mb-10">
          Les valeurs de Spa & Prestige Collection guident chacune de nos
          actions et reflètent notre détermination à offrir des moments
          d’exception. Ces valeurs sont la clé d’une expérience unique, alliant
          bien-être, raffinement et humanité.
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FBF6EC] px-4 rounded py-8 hover:text-white hover:bg-[#B6B498] cursor-pointer duration-300 ease-in">
            <h3 className="mb-4 font-bold text-2xl">Sincérité</h3>
            <p className="font-bricolage text-base">
              Nous privilégions des expériences authentiques, où chaque
              établissement et chaque moment reflètent l’essence même du lieu.
              Cette approche repose sur une transparence et une confiance
              constantes, assurant une immersion véritable et sincère.
            </p>
          </div>
          <div className="bg-[#FBF6EC] px-4 rounded py-8 hover:text-white hover:bg-[#B6B498] cursor-pointer duration-300 ease-in">
            <h3 className="mb-4 font-bold text-2xl">Élégance</h3>
            <p className="font-bricolage text-base">
              L’élégance, pour nous, se révèle dans l’attention minutieuse
              portée aux gestes subtils et aux détails soigneusement pensés.
              Chaque prestation incarne un équilibre parfait entre simplicité et
              raffinement, pour des moments remplis de charme et de quiétude.
            </p>
          </div>
          <div className="bg-[#FBF6EC] px-4 rounded py-8 hover:text-white hover:bg-[#B6B498] cursor-pointer duration-300 ease-in">
            <h3 className="mb-4 font-bold text-2xl">Proximité</h3>
            <p className="font-bricolage text-base">
              L’humain est au cœur de notre démarche. Que ce soit avec nos
              partenaires ou nos membres, nous cultivons des relations fondées
              sur l’écoute et la bienveillance. Cela nous permet de répondre aux
              besoins spécifiques de chacun et de bâtir des liens solides et
              durables.
            </p>
          </div>
          <div className="bg-[#FBF6EC] px-4 rounded py-8 hover:text-white hover:bg-[#B6B498] cursor-pointer duration-300 ease-in">
            <h3 className="mb-4 font-bold text-2xl">Durabilité</h3>
            <p className="font-bricolage text-base">
              Nous sommes convaincus que la beauté du monde réside dans sa
              préservation. Chaque établissement de notre réseau s’engage à
              adopter des pratiques respectueuses de l’environnement, créant un
              impact positif et responsable pour les générations à venir.
            </p>
          </div>
          <div className="bg-[#FBF6EC] px-4 rounded py-8 hover:text-white hover:bg-[#B6B498] cursor-pointer duration-300 ease-in">
            <h3 className="mb-4 font-bold text-2xl">Engagement</h3>
            <p className="font-bricolage text-base">
              Nous nous engageons à soutenir le succès de nos partenaires et à
              partager notre savoir-faire avec nos membres, afin que chaque
              projet se développe en harmonie avec nos valeurs communes, tout en
              favorisant la transmission et l’innovation.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img
              lazyload="lazy"
              src={theImage4}
              alt="Carte Cadeau Spa & Prestige"
              className="max-w-full h-auto"
            />
          </div>
        </div>
        <div className="flex items-center justify-center my-4">
          <ButtonIcon link={paths.contact} title="Nous Contacter" />
        </div>
      </div>

      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)]">
        <div className="max-w-6xl mx-auto py-6 px-1">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-6">
            Rejoignez la Communauté Privée Spa & Prestige Collection
          </h2>
          <div className="text-xl text-[#414244] font-roboto font-normal text-center mb-10 w-full md:w-1/2 mx-auto">
            Plongez dans un univers d'exception et laissez-vous séduire par des
            privilèges rares et uniques :
          </div>
          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {}
            <div className="space-y-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="leading-none mt-1">✔</span> Vivez
                </h3>
                <p className="font-bricolage">
                  Des expériences personnalisées, créées spécialement pour vous
                </p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="leading-none mt-1">✔</span> Accédez
                </h3>
                <p className="font-bricolage">
                  A des établissements prestigieux, rigoureusement sélectionnés
                  par nos équipes
                </p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="leading-none mt-1">✔</span> Bénéficiez
                </h3>
                <p className="font-bricolage">
                  D’un programme de fidélité généreux, vous offrant de précieux
                  avantages
                </p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="leading-none mt-1">✔</span> Exprimez
                </h3>
                <p className="font-bricolage">
                  Vos impressions pour nous aider à vous offrir une expérience
                  toujours plus raffinée
                </p>
              </div>
            </div>

            {}
            <div className="space-y-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="leading-none mt-1">✔</span> Profitez
                </h3>
                <p className="font-bricolage">
                  De tarifs préférentiels pour des instants de bien-être
                  inoubliables
                </p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="leading-none mt-1">✔</span> Offrez
                </h3>
                <p className="font-bricolage">
                  Des cartes cadeaux élégantes, disponibles en version numérique
                  ou physique
                </p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="leading-none mt-1">✔</span> Partagez
                </h3>
                <p className="font-bricolage">
                  Ces moments d'exception en parrainant vos proches
                </p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="leading-none mt-1">✔</span> Recevez
                </h3>
                <p className="font-bricolage">
                  Des conseils exclusifs de Spa & Prestige Collection pour
                  enrichir votre expérience
                </p>
              </div>
            </div>
          </div>

          {}
          <div className="flex justify-center mt-10">
            <ButtonIcon link={paths.spa.list} title="COUP DE CŒUR" />
          </div>
        </div>
      </div>
    </div>
  );
}
