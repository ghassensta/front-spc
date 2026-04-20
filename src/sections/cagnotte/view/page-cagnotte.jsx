// src/components/cagnotte/PageCagnotte.jsx - Page explicative complète pour les cagnottes

import React from "react";
import { Users, Heart, Gift, Calendar, CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "src/router/paths";
import { TranslatedText } from "src/components/translated-text/translated-text";
import ImgCagnotte from "src/assets/images/cagnotte-spa-prestige-collection.png";
export default function PageCagnotte() {
  const navigate = useNavigate();

  const handleCreateCagnotte = () => {
    navigate(paths.cagnotte.create || "/cagnotte/creer");
  };

  return (
    <>
      {/* Section Hero avec image de fond */}
      <div className="relative w-screen left-[calc(-50vw+50%)] h-[500px] overflow-hidden">
        <img
          loading="lazy"
          src={ImgCagnotte}
          alt="Cagnotte Spa & Prestige Collection"
          className="w-full h-full object-cover"
        />
       
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <TranslatedText text="La Cagnotte Bien-Être" />
            </h1>
            <p className="text-xl md:text-2xl font-roboto max-w-2xl mx-auto mb-10">
              <TranslatedText text="Offrez ensemble un moment d'exception à vos proches" />
            </p>
            {/* CTA dans le hero pour une conversion rapide */}
            <Link to={paths.cagnotte.create}
              className="bg-white text-[#B6B498] font-bold text-lg py-4 px-12 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-3"
            >
              <TranslatedText text="Créer ma cagnotte" />
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Section Introduction */}
      <div className="flex bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] px-5 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6">
                <TranslatedText text="Un cadeau collectif qui crée des souvenirs" />
              </h2>
              <p className="font-roboto text-lg text-[#5E5E5E] leading-relaxed">
                <TranslatedText text="La cagnotte Spa & Prestige Collection permet à plusieurs personnes de participer ensemble à l'achat d'un moment de bien-être exceptionnel." />
                <br /><br />
                <TranslatedText text="Que ce soit pour un anniversaire, un mariage, une naissance, un départ à la retraite ou simplement pour faire plaisir, la cagnotte est le moyen idéal de rassembler vos contributions pour offrir une expérience inoubliable." />
                <br /><br />
                <TranslatedText text="Simple, conviviale et sécurisée, elle transforme chaque participation en un geste de générosité partagée." />
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                loading="lazy"
                src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070"
                alt="Groupe d'amis célébrant ensemble"
                className="w-full h-auto object-cover rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section Avantages */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          <TranslatedText text="Pourquoi choisir une cagnotte ?" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-[#B6B498] bg-opacity-20 p-4 rounded-full mb-4">
              <Users className="text-[#B6B498]" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3">
              <TranslatedText text="Participatif et solidaire" />
            </h3>
            <p className="font-roboto text-gray-700">
              <TranslatedText text="Chacun contribue selon ses moyens pour créer ensemble un cadeau d'exception." />
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-[#B6B498] bg-opacity-20 p-4 rounded-full mb-4">
              <Heart className="text-[#B6B498]" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3">
              <TranslatedText text="Personnalisé et touchant" />
            </h3>
            <p className="font-roboto text-gray-700">
              <TranslatedText text="Ajoutez un message personnel et laissez chaque contributeur exprimer ses vœux." />
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-[#B6B498] bg-opacity-20 p-4 rounded-full mb-4">
              <CheckCircle className="text-[#B6B498]" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3">
              <TranslatedText text="Simple et sécurisé" />
            </h3>
            <p className="font-roboto text-gray-700">
              <TranslatedText text="Créez votre cagnotte en quelques clics et partagez-la facilement. Paiements 100% sécurisés." />
            </p>
          </div>
        </div>
      </div>

      {/* Section Comment ça marche */}
      <div className="bg-gradient-to-b from-white to-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] px-5 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <TranslatedText text="Comment ça marche ?" />
          </h2>
          <p className="text-center font-roboto text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            <TranslatedText text="En 4 étapes simples, créez votre cagnotte et offrez un cadeau mémorable" />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Étape 1 */}
            <div className="flex gap-6 items-start bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0 w-16 h-16 bg-[#B6B498] text-white rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Gift size={28} className="text-[#B6B498]" />
                  <TranslatedText text="Créez votre cagnotte" />
                </h3>
                <p className="font-roboto text-gray-700 leading-relaxed">
                  <TranslatedText text="Donnez un titre évocateur, décrivez l'occasion et personnalisez votre message. Définissez éventuellement une date limite et un objectif de collecte." />
                </p>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="flex gap-6 items-start bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0 w-16 h-16 bg-[#B6B498] text-white rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Users size={28} className="text-[#B6B498]" />
                  <TranslatedText text="Partagez avec vos proches" />
                </h3>
                <p className="font-roboto text-gray-700 leading-relaxed">
                  <TranslatedText text="Partagez le lien unique de votre cagnotte par email, SMS ou réseaux sociaux. Vos proches peuvent contribuer en toute simplicité et laisser un message." />
                </p>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="flex gap-6 items-start bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0 w-16 h-16 bg-[#B6B498] text-white rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Calendar size={28} className="text-[#B6B498]" />
                  <TranslatedText text="Suivez les contributions" />
                </h3>
                <p className="font-roboto text-gray-700 leading-relaxed">
                  <TranslatedText text="Suivez en temps réel l'évolution de votre cagnotte grâce à votre tableau de bord personnel. Consultez les messages et le montant collecté." />
                </p>
              </div>
            </div>

            {/* Étape 4 */}
            <div className="flex gap-6 items-start bg-white p-6 rounded-xl shadow-md">
              <div className="flex-shrink-0 w-16 h-16 bg-[#B6B498] text-white rounded-full flex items-center justify-center text-2xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Sparkles size={28} className="text-[#B6B498]" />
                  <TranslatedText text="Offrez l'expérience" />
                </h3>
                <p className="font-roboto text-gray-700 leading-relaxed">
                  <TranslatedText text="Une fois la cagnotte clôturée, le bénéficiaire reçoit une carte cadeau du montant collecté, valable dans tous nos établissements partenaires pendant 1 an." />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Occasions */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-6">
          <TranslatedText text="Pour toutes les occasions" />
        </h2>
        <p className="text-center font-roboto text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          <TranslatedText text="La cagnotte bien-être s'adapte à tous vos événements spéciaux" />
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-[#FBF6EC] rounded-xl hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">🎂</div>
            <h4 className="font-bold text-lg">
              <TranslatedText text="Anniversaire" />
            </h4>
          </div>

          <div className="text-center p-6 bg-[#FBF6EC] rounded-xl hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">💍</div>
            <h4 className="font-bold text-lg">
              <TranslatedText text="Mariage" />
            </h4>
          </div>

          <div className="text-center p-6 bg-[#FBF6EC] rounded-xl hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">👶</div>
            <h4 className="font-bold text-lg">
              <TranslatedText text="Naissance" />
            </h4>
          </div>

          <div className="text-center p-6 bg-[#FBF6EC] rounded-xl hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">🎓</div>
            <h4 className="font-bold text-lg">
              <TranslatedText text="Diplôme" />
            </h4>
          </div>

          <div className="text-center p-6 bg-[#FBF6EC] rounded-xl hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">🏖️</div>
            <h4 className="font-bold text-lg">
              <TranslatedText text="Retraite" />
            </h4>
          </div>

          <div className="text-center p-6 bg-[#FBF6EC] rounded-xl hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">❤️</div>
            <h4 className="font-bold text-lg">
              <TranslatedText text="Saint-Valentin" />
            </h4>
          </div>

          <div className="text-center p-6 bg-[#FBF6EC] rounded-xl hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">🎄</div>
            <h4 className="font-bold text-lg">
              <TranslatedText text="Noël" />
            </h4>
          </div>

          <div className="text-center p-6 bg-[#FBF6EC] rounded-xl hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">🌟</div>
            <h4 className="font-bold text-lg">
              <TranslatedText text="Juste pour le plaisir" />
            </h4>
          </div>
        </div>
      </div>

      {/* Section FAQ */}
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          <TranslatedText text="Questions fréquentes" />
        </h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-3">
              <TranslatedText text="Combien coûte la création d'une cagnotte ?" />
            </h3>
            <p className="font-roboto text-gray-700">
              <TranslatedText text="La création d'une cagnotte est entièrement gratuite. Aucun frais n'est prélevé sur les contributions de vos proches." />
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-3">
              <TranslatedText text="Y a-t-il un montant minimum ou maximum ?" />
            </h3>
            <p className="font-roboto text-gray-700">
              <TranslatedText text="Chaque personne peut contribuer librement à partir de 5€. Il n'y a pas de montant maximum pour la cagnotte totale." />
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-3">
              <TranslatedText text="Combien de temps reste ouverte une cagnotte ?" />
            </h3>
            <p className="font-roboto text-gray-700">
              <TranslatedText text="Vous définissez vous-même la date de clôture lors de la création. Une cagnotte peut rester ouverte jusqu'à 6 mois maximum." />
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-3">
              <TranslatedText text="Comment le bénéficiaire reçoit-il son cadeau ?" />
            </h3>
            <p className="font-roboto text-gray-700">
              <TranslatedText text="À la clôture de la cagnotte, le bénéficiaire reçoit automatiquement par email une carte cadeau du montant total collecté, valable 1 an dans tous nos établissements partenaires." />
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-3">
              <TranslatedText text="Les paiements sont-ils sécurisés ?" />
            </h3>
            <p className="font-roboto text-gray-700">
              <TranslatedText text="Oui, tous les paiements sont traités par Stripe, leader mondial du paiement en ligne sécurisé. Aucune donnée bancaire n'est stockée sur nos serveurs." />
            </p>
          </div>
        </div>
      </div>

      {/* Section Navigation complémentaire */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to={paths.spa.list || "/spas"}
            className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold group-hover:text-[#B6B498] transition">
                <TranslatedText text="Découvrir nos spas" />
              </h3>
              <ArrowRight className="text-[#B6B498] group-hover:translate-x-2 transition-transform" size={28} />
            </div>
            <p className="font-roboto text-gray-600">
              <TranslatedText text="Explorez notre sélection d'établissements partenaires de prestige" />
            </p>
          </Link>

          <Link
            to={paths.cartesCadeaux || "/cartes-cadeaux"}
            className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold group-hover:text-[#B6B498] transition">
                <TranslatedText text="Cartes cadeaux" />
              </h3>
              <ArrowRight className="text-[#B6B498] group-hover:translate-x-2 transition-transform" size={28} />
            </div>
            <p className="font-roboto text-gray-600">
              <TranslatedText text="Offrez une carte cadeau individuelle pour un moment de bien-être" />
            </p>
          </Link>
        </div>
      </div>

      {/* Section CTA finale (placée à la fin pour une cohérence logique) */}
      <div className="bg-gradient-to-r from-[#B6B498] to-[#8B8970] w-screen relative left-[calc(-50vw+50%)] px-5 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-5xl font-bold mb-6">
            <TranslatedText text="Prêt à créer votre cagnotte ?" />
          </h2>
          <p className="text-xl font-roboto mb-10 opacity-95">
            <TranslatedText text="Quelques clics suffisent pour offrir ensemble un moment d'exception" />
          </p>
          <Link to={paths.cagnotte.create}
            className="bg-white text-[#B6B498] font-bold text-lg py-4 px-12 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-3"
          >
            <TranslatedText text="Créer ma cagnotte" />
            <ArrowRight size={24} />
          </Link>
          <p className="mt-6 text-sm opacity-80">
            <TranslatedText text="Gratuit • Sans engagement • Sécurisé" />
          </p>
        </div>
      </div>
    </>
  );
}