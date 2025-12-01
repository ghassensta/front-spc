import React from "react";
import { Link } from "react-router-dom";
import { paths } from "src/router/paths";

export default function ReferentielViewPage() {
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
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-white text-4xl md:text-5xl max-w-5xl mx-auto text-center font-bold leading-snug">
            Référentiel de Candidature – Spa & Prestige Collection
          </h1>
        </div>
      </div>

      {/* Checkmarks & Adhesion Section */}
      <div className="max-w-6xl mx-auto  gap-10 py-6 md:py-12 px-4 grid grid-cols-1 md:grid-cols-2 mt-5">
        {/* Left Side: Checkmark List */}
        <div className="space-y-4 flex flex-col mb-6 md:mb-12">
          {[
            {
              description:
                "L’ambiance de l’établissement doit favoriser une expérience de détente optimale. L’agencement des espaces, l’éclairage, la musique, les odeurs et la décoration doivent être soigneusement pensés pour créer un cadre calme et serein, propice au ressourcement.",
              title: "Atmosphère et Ambiance de Relaxation",
            },
            {
              description:
                "Les installations doivent être modernes, bien entretenues et accessibles, y compris pour les personnes handicapées. L’établissement doit offrir une grande diversité d’espaces, permettant à chaque visiteur de profiter d'une expérience bien-être complète. Si des chambres sont proposées, elles doivent garantir un confort optimal, propice à la détente et à la relaxation.",
              title: "Confort des Installations et Aménagements de Qualité",
            },
            {
              description:
                "La communication doit être fluide et claire, de la prise de rendez-vous au suivi post-soin. Le service client doit être réactif, empathique et capable de répondre rapidement aux demandes. L’établissement doit offrir une expérience personnalisée, adaptée aux besoins individuels de chaque client, et assurer un suivi attentif après chaque soin pour garantir une satisfaction complète.",
              title: "Service Client Réactif et Expérience Personnalisée",
            },
            {
              description:
                "Les établissements doivent adopter des pratiques durables pour réduire leur impact environnemental. Cela inclut l’utilisation de produits écologiques, la gestion de l’énergie et la réduction des déchets, afin de minimiser l'empreinte écologique et garantir un environnement respectueux des générations futures.",
              title: "Démarche Durable et Engagement Écologique",
            },
            {
              description:
                "Les établissements doivent proposer des services novateurs, intégrer de nouvelles technologies, développer des concepts créatifs et adopter des approches originales. Ces initiatives sont essentielles pour répondre aux exigences des clients et renforcer l'attractivité de l'établissement.",
              title: "Innovation et Originalité",
            }
          ].map((text, i) => (
            <div key={i} className="flex items-start text-3xl space-x-3">
              <span className="leading-none mt-6">✔</span>
              <div>
                <p className="mb-3">{text.title}</p>
                <p className="text-base font-bricolage">{text.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4 flex flex-col mb-12">
          {[
            {
              description:
                "Les soins doivent répondre à des standards d’excellence, avec une attention particulière à la posture, à la fluidité des gestes et à l’ancrage. Chaque prestation doit être unique, adaptée aux besoins de chaque client et refléter l’identité de l’établissement.",
              title: "Qualité des Soins et Prestations Signature",
            },
            {
              description:
                "L’hygiène doit être rigoureusement respectée. Chaque espace, des salles de soins aux vestiaires, doit être entretenu quotidiennement selon les normes sanitaires en vigueur, assurant ainsi un environnement agréable et sûr.",
              title: "Propreté Exemplaire et Entretien Rigoureux",
            },
            {
              description:
                "L’intimité des clients doit être respectée tout au long de leur expérience, y compris dans les cabines de soins. L’établissement doit garantir la confidentialité des informations personnelles et offrir un cadre où les clients se sentent en sécurité et en confiance.",
              title: "Respect de l'Intimité et Confidentialité des Clients",
            },
            {
              description:
                "Les établissements doivent mettre en place des actions favorisant le bien-être des salariés, en créant un environnement de travail respectueux, épanouissant et équilibré. Un personnel épanoui contribue directement à la qualité du service offert aux clients et renforce les valeurs de l’établissement.",
              title: "Epanouissement et bien être au travail",
            },
            {
              description:
                "Le personnel doit être diplômé, formé et engagé, avec un fort sens du professionnalisme et de l’empathie. Cet engagement est essentiel pour garantir une expérience client de qualité, où chaque interaction reflète la passion de l’équipe et son dévouement à offrir le meilleur service possible.",
              title: "Équipe Compétente et Engagée",
            },
          ].map((text, i) => (
            <div key={i} className="flex items-start text-3xl space-x-3">
              <span className="leading-none mt-6">✔</span>
              <div>
                <h2 className="mb-3">{text.title}</h2>
                <p className="text-base font-bricolage">{text.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Right Side: Adhesion Info */}
      </div>
      <div className="bg-[#FBF6EC] p-8 w-screen relative left-[calc(-50vw+50%)] rounded-lg shadow-lg flex flex-col items-center ">
        <div className="max-w-6xl flex flex-col-reverse md:grid grid-cols-2 gap-4">
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
            <div className="flex flex-col gap-6 md:gap-12 w-full justify-center items-center">
              <Link to={paths.partenaire} className="bg-[#B6B499] w-max text-white px-6 rounded-full py-2 text-sm hover:bg-black uppercase tracking-wider transition">
                Devenir partenaire
              </Link>
              <Link to={paths.contact} className="bg-[#B6B499] w-max text-white px-6 rounded-full py-2 text-sm hover:bg-black uppercase tracking-wider transition">
                Nous contacter
              </Link>
            </div>
          </div>
          <img
            lazyload="lazy"
            src="https://spa-prestige-collection.com/wp-content/uploads/2025/05/SPC-Catalogue-1975x1318-1-1024x683.jpg"
            alt="Spa & Prestige Collection"
            className="w-full mb-6 rounded shadow"
          />
        </div>
      </div>
    </>
  );
}
