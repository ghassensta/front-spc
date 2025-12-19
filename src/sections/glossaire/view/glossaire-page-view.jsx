// GlossairePageView.jsx
import React, { useState } from "react";
import GlossaireItem from "../glossaire-item";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";

export default function GlossairePageView() {
  const [openIndex, setOpenIndex] = useState(null);

  const glossaryData = [
    {
      letter: "A",
      terms: [
        {
          keyword: "Acupression",
          description:
            "Technique thérapeutique utilisant la pression sur certains points du corps pour soulager la douleur et améliorer la circulation énergétique.",
        },
        {
          keyword: "Aromathérapie",
          description:
            "Utilisation des huiles essentielles pour améliorer la santé physique et mentale.",
        },
        {
          keyword: "Aquaforme",
          description:
            "Activité physique réalisée dans l'eau, idéale pour travailler le tonus musculaire et la souplesse.",
        },
        {
          keyword: "Alimentation équilibrée",
          description:
            "Régime alimentaire riche et varié en nutriments essentiels, soutenant la santé générale et le bien-être.",
        },
        {
          keyword: "Anti-stress",
          description:
            "Techniques ou produits visant à réduire les tensions physiques et mentales.",
        },
        {
          keyword: "Alignement corporel",
          description:
            "Position optimale du corps pour éviter les douleurs et maintenir une posture saine.",
        },
        {
          keyword: "Ayurvéda",
          description:
            "Médecine traditionnelle indienne fondée sur l'équilibre des énergies corporelles pour promouvoir la santé et le bien-être.",
        },
        {
          keyword: "Autohypnose",
          description:
            "Technique permettant de se mettre soi-même dans un état de relaxation profonde pour traiter divers maux ou améliorer la concentration.",
        },
        {
          keyword: "Adaptogènes",
          description:
            "Plantes ou substances naturelles qui aident l'organisme à s'adapter au stress et à maintenir un équilibre physiologique.",
        },
        {
          keyword: "Acupuncture",
          description:
            "Pratique de la médecine traditionnelle chinoise qui consiste à insérer de fines aiguilles dans des points spécifiques du corps pour soulager diverses affections.",
        },
        {
          keyword: "Abdominaux",
          description:
            "Exercices visant à tonifier les muscles abdominaux, contribuant ainsi à améliorer la posture et la stabilité du tronc.",
        },
        {
          keyword: "Antioxydants",
          description:
            "Substances qui protègent les cellules du corps contre les effets nuisibles des radicaux libres, favorisant ainsi la santé générale.",
        },
        {
          keyword: "Ambiance zen",
          description:
            "Environnement calme, apaisant, souvent utilisé dans les spas ou lieux de relaxation pour favoriser le bien-être.",
        },
        {
          keyword: "Aromachologie",
          description:
            "Étude des effets des senteurs sur l'esprit et les émotions humaines, souvent utilisée pour améliorer le bien-être mental.",
        },
        {
          keyword: "Anxiolytique",
          description:
            "Substance ou méthode visant à réduire l'anxiété et à favoriser la relaxation.",
        },
        {
          keyword: "Aquathérapie",
          description:
            "Utilisation de l'eau, sous différentes formes (bains, jets, massages), pour traiter des douleurs physiques et favoriser la détente.",
        },
        {
          keyword: "Activation musculaire",
          description:
            "Exercices destinés à stimuler les muscles avant une activité physique pour prévenir les blessures et améliorer la performance.",
        },
        {
          keyword: "Apaisant",
          description:
            "Qui a un effet calmant, souvent utilisé pour décrire des huiles essentielles, des tisanes ou des massages favorisant la relaxation.",
        },
        {
          keyword: "Antistress",
          description:
            "Produits, techniques ou méthodes visant à réduire le stress et à favoriser la détente.",
        },
        {
          keyword: "Activités bien-être",
          description:
            "Différents types d'activités qui visent à améliorer la santé mentale et physique.",
        },
        {
          keyword: "Amélioration de la qualité de vie",
          description:
            "Processus qui inclut des activités et des habitudes visant à améliorer le bien-être général.",
        },
        {
          keyword: "Alimentation saine",
          description:
            "Régime alimentaire équilibré favorisant la santé générale et le bien-être.",
        },
        {
          keyword: "Alignement postural",
          description:
            "Maintien d'une posture correcte pour prévenir les douleurs corporelles et améliorer le bien-être général.",
        },
        {
          keyword: "Abhyanga",
          description:
            "Massage ayurvédique avec huiles chaudes pour stimuler la circulation, éliminer les toxines et détendre les muscles.",
        },
        {
          keyword: "Acupressure",
          description:
            "Pression sur des points spécifiques du corps pour soulager la douleur, réduire le stress et améliorer le bien-être.",
        },
        {
          keyword: "Amma Assis",
          description:
            "Massage japonais assis, sans huile, avec pressions sur le dos, les épaules, la nuque et la tête pour libérer les tensions.",
        },
        {
          keyword: "Aux tampons",
          description:
            "Compresses ou tampons imbibés d'huiles ou d'herbes utilisés pour des soins relaxants ou du visage.",
        },
        {
          keyword: "Aux Mojos",
          description:
            "Sachets contenant des herbes ou cristaux, utilisés pour des rituels ou soins énergétiques.",
        },
      ],
    },
    {
      letter: "B",
      terms: [
        {
          keyword: "Balinais",
          description:
            "Massage traditionnel de Bali, combinant pressions, pétrissage et frictions pour détendre les muscles, améliorer la circulation et réduire le stress. Il utilise souvent des huiles essentielles pour favoriser la relaxation et l'équilibre énergétique.",
        },
        {
          keyword: "Bain de vapeur",
          description:
            "Utilisation de la vapeur d'eau pour purifier et relaxer le corps.",
        },
        {
          keyword: "Bien-être",
          description: "État physique, mental et émotionnel optimal.",
        },
        {
          keyword: "Bain froid",
          description:
            "Immersion dans de l'eau froide pour revitaliser le corps et stimuler la circulation sanguine.",
        },
        {
          keyword: "Bains de pieds",
          description:
            "Soins des pieds avec de l'eau chaude pour soulager la fatigue et améliorer la circulation.",
        },
        {
          keyword: "Biodynamie",
          description:
            "Méthode qui intègre l'agriculture naturelle pour promouvoir la santé et le bien-être.",
        },
        {
          keyword: "Biofeedback",
          description:
            "Méthode pour mieux réguler les fonctions corporelles en prenant conscience de ses signaux internes.",
        },
        {
          keyword: "Biorhythmes",
          description: "Cycles biologiques influençant l'humeur et l'énergie.",
        },
        {
          keyword: "Bains de soleil",
          description:
            "Exposition modérée au soleil pour produire de la vitamine D et améliorer l'humeur.",
        },
        {
          keyword: "Biodégradable",
          description:
            "Produits qui se décomposent naturellement, souvent utilisés dans les soins de bien-être respectueux de l'environnement.",
        },
        {
          keyword: "Bénéfices du yoga",
          description:
            "Effets positifs du yoga, comme la réduction du stress et l'amélioration de la flexibilité.",
        },
        {
          keyword: "Barre au sol",
          description:
            "Exercice de danse au sol pour améliorer la posture et la souplesse.",
        },
        {
          keyword: "Bain de forêt",
          description:
            "Pratique de relaxation et de réduction du stress en s'immergeant dans la nature.",
        },
        {
          keyword: "Bain de lumière",
          description:
            "Utilisation de la lumière naturelle pour réguler les rythmes biologiques et lutter contre la dépression saisonnière.",
        },
        {
          keyword: "Biohacking",
          description:
            "Techniques visant à améliorer le bien-être physique et mental par des pratiques ou technologies.",
        },
        {
          keyword: "Biorégulation",
          description:
            "Maintien de l'équilibre physiologique du corps, essentiel pour la santé et le bien-être.",
        },
        {
          keyword: "Biodiversité",
          description:
            "Concept incluant la variété des formes de vie qui soutient la santé de l'environnement et des écosystèmes.",
        },
        {
          keyword: "Bilan de santé",
          description:
            "Évaluation complète de l'état de santé pour prévenir les maladies et optimiser le bien-être.",
        },
        {
          keyword: "Bain d'herbes",
          description:
            "Immersion dans des bains à base de plantes médicinales pour leurs effets bénéfiques sur la santé.",
        },
        {
          keyword: "Bienfaits de la méditation",
          description:
            "Avantages de la pratique de la méditation pour la réduction du stress et l'amélioration du bien-être mental.",
        },
        {
          keyword: "Bains de boue",
          description:
            "Traitement thérapeutique utilisant de la boue chaude pour apaiser et soigner diverses douleurs corporelles.",
        },
        {
          keyword: "Bain de relaxation",
          description:
            "Immersion dans de l'eau chaude avec des huiles essentielles ou des sels pour détendre le corps et l'esprit.",
        },
        {
          keyword: "Bilan de bien-être",
          description:
            "Évaluation du bien-être général pour identifier les aspects à améliorer.",
        },
        {
          keyword: "Bain purifiant",
          description:
            "Utilisation d'un bain pour éliminer les toxines et favoriser le bien-être.",
        },
        {
          keyword: "Bien-être émotionnel",
          description:
            "Santé mentale et équilibre émotionnel, souvent favorisés par des pratiques comme la thérapie ou la relaxation.",
        },
        {
          keyword: "Bruits apaisants",
          description:
            "Sons ou musiques spécifiquement choisis pour induire la relaxation et le calme.",
        },
        {
          keyword: "Biodétox",
          description:
            "Processus de détoxification naturelle du corps par l'alimentation ou les soins.",
        },
        {
          keyword: "Bambou",
          description:
            "Matériau naturel souvent utilisé dans les produits de bien-être, comme les tapis de yoga ou les vêtements.",
        },
        {
          keyword: "Brume d'eau",
          description:
            "Vapeur ou spray d'eau utilisé pour apaiser la peau ou l'environnement.",
        },
        {
          keyword: "Bains minéraux",
          description:
            "Utilisation d'eau riche en minéraux pour améliorer la santé de la peau et des muscles.",
        },
      ],
    },
    {
      letter: "C",
      terms: [
        {
          keyword: "Californien",
          description:
            "Massage relaxant avec des mouvements longs et fluides pour détendre les muscles et réduire le stress.",
        },
        {
          keyword: "Chromothérapie",
          description:
            "Thérapie utilisant les couleurs pour rééquilibrer les énergies et favoriser la guérison.",
        },
        {
          keyword: "Calme",
          description:
            "État de tranquillité et de sérénité mentale ou physique.",
        },
        {
          keyword: "Capacité de relaxation",
          description: "Aptitude à se détendre et à réduire le stress.",
        },
        {
          keyword: "Cicatrisation",
          description:
            "Processus de guérison, souvent amélioré par des traitements bien-être.",
        },
        {
          keyword: "Cohérence cardiaque",
          description:
            "Pratique de régulation de la respiration pour améliorer le bien-être mental et émotionnel.",
        },
        {
          keyword: "Concentration",
          description:
            "Capacité de maintenir son attention sur une tâche, souvent améliorée par la méditation ou des exercices de relaxation.",
        },
        {
          keyword: "Chiropractie",
          description:
            "Méthode de soins manuels qui se concentre sur le soulagement de la douleur et la promotion du bien-être physique.",
        },
        {
          keyword: "Cleansing",
          description:
            "Processus de purification, souvent en lien avec la détoxification du corps.",
        },
        {
          keyword: "Condition physique",
          description:
            "Niveau de forme corporelle, soutenu par une alimentation saine et de l'exercice.",
        },
        {
          keyword: "Cognitif",
          description:
            "Relatif aux processus mentaux comme la perception, la mémoire et la prise de décision, souvent amélioré par des pratiques de bien-être.",
        },
        {
          keyword: "Cryothérapie",
          description:
            "Utilisation du froid pour réduire l'inflammation et améliorer la récupération musculaire.",
        },
        {
          keyword: "Calorie",
          description:
            "Unité de mesure de l'énergie alimentaire, un facteur clé dans les régimes de bien-être.",
        },
        {
          keyword: "Caféine",
          description:
            "Stimulant souvent consommé pour augmenter l'énergie, mais qui peut aussi avoir des effets sur le bien-être, selon sa consommation.",
        },
        {
          keyword: "Cocooning",
          description:
            "Le fait de créer un environnement confortable et relaxant à la maison, souvent pour favoriser le bien-être.",
        },
        {
          keyword: "Confort",
          description:
            "Sensation de bien-être physique et mental, souvent recherché dans les pratiques de relaxation.",
        },
        {
          keyword: "Courage",
          description:
            "Capacité à faire face au stress ou à des défis, élément clé du bien-être mental.",
        },
        {
          keyword: "Compléments alimentaires",
          description:
            "Produits qui peuvent soutenir la santé et le bien-être en complétant l'alimentation.",
        },
        {
          keyword: "Calme mental",
          description:
            "État d'équilibre intérieur, souvent atteint par la méditation ou des exercices de relaxation.",
        },
        {
          keyword: "Curation",
          description:
            "Processus de sélection de traitements ou d'approches spécifiques pour améliorer la santé et le bien-être.",
        },
        {
          keyword: "Collagène",
          description:
            "Protéine essentielle à la peau et aux articulations, souvent pris dans des compléments de bien-être.",
        },
        {
          keyword: "Cérémonies de bien-être",
          description:
            "Pratiques rituelles comme les bains de vapeur ou les méditations guidées qui favorisent la relaxation.",
        },
        {
          keyword: "Cristaux",
          description:
            "Pierre utilisée dans des pratiques de bien-être comme la lithothérapie, censée avoir des vertus thérapeutiques.",
        },
        {
          keyword: "Compassion",
          description:
            "Valeur qui favorise le bien-être émotionnel et la santé mentale, particulièrement dans les relations humaines.",
        },
        {
          keyword: "Cohésion",
          description:
            "Travail d'équipe ou unité entre les individus, essentiel au bien-être dans des contextes de groupe ou au travail.",
        },
        {
          keyword: "Céto",
          description:
            "Régime alimentaire privilégiant les graisses saines et la réduction des glucides pour améliorer la santé et le bien-être.",
        },
        {
          keyword: "Cure",
          description:
            "Période de traitement thérapeutique, souvent utilisée pour des détoxifications ou des programmes de bien-être.",
        },
        {
          keyword: "Cicatrices émotionnelles",
          description:
            "Expériences de vie qui affectent le bien-être mental et nécessitent souvent des soins thérapeutiques.",
        },
        {
          keyword: "Circuit bien-être",
          description:
            "Enchaînement de traitements ou d'activités visant à améliorer le bien-être physique et mental.",
        },
      ],
    },
    {
      letter: "D",
      terms: [
        {
          keyword: "Digitopression",
          description:
            "Technique de pression sur des points spécifiques du corps pour soulager la douleur et stimuler l'énergie.",
        },
        {
          keyword: "Drainant",
          description:
            "Qui favorise l'élimination des toxines et la circulation lymphatique.",
        },
        {
          keyword: "Détente",
          description:
            "État de relaxation et de calme, souvent recherché à travers des pratiques comme la méditation ou les massages.",
        },
        {
          keyword: "Détoxification",
          description:
            "Processus de nettoyage du corps en éliminant les toxines, souvent effectué via des régimes ou des traitements spécifiques.",
        },
        {
          keyword: "Douceur",
          description:
            "Caractéristique d'un environnement ou d'une pratique qui favorise la relaxation et le bien-être.",
        },
        {
          keyword: "Diète",
          description:
            "Régime alimentaire structuré visant à améliorer la santé ou atteindre un objectif de bien-être physique.",
        },
        {
          keyword: "Développement personnel",
          description:
            "Processus visant à améliorer les compétences, la connaissance de soi et la santé mentale.",
        },
        {
          keyword: "Dopamine",
          description:
            "Neurotransmetteur lié à la motivation et au plaisir, souvent stimulé par des activités de bien-être comme l'exercice physique ou la méditation.",
        },
        {
          keyword: "Dépuration",
          description:
            "Processus de purification du corps, souvent associé à des pratiques de détoxification.",
        },
        {
          keyword: "Douleur",
          description:
            "Sensation physique qui, lorsqu'elle est mal gérée, peut nuire au bien-être, mais qui peut être soulagée par diverses thérapies.",
        },
        {
          keyword: "Dynamisme",
          description:
            "Niveau d'énergie et de vitalité, souvent lié à un mode de vie sain et équilibré.",
        },
        {
          keyword: "Diététique",
          description:
            "Discipline qui étudie l'alimentation et ses effets sur la santé, en lien direct avec le bien-être physique.",
        },
        {
          keyword: "Dépression",
          description:
            "Trouble de l'humeur qui affecte le bien-être mental, souvent traité par des approches thérapeutiques et du soutien.",
        },
        {
          keyword: "Désintoxication",
          description:
            "Élimination des substances toxiques du corps, souvent effectuée par des régimes ou des traitements spécifiques.",
        },
        {
          keyword: "Développement spirituel",
          description:
            "Approches visant à nourrir et équilibrer le bien-être mental et émotionnel à travers des pratiques spirituelles.",
        },
        {
          keyword: "Détournement de l'esprit",
          description:
            "Technique utilisée dans la méditation ou la relaxation pour alléger les pensées stressantes et améliorer le bien-être mental.",
        },
        {
          keyword: "Déséquilibre",
          description:
            "Condition où le corps ou l'esprit n'est pas en harmonie, souvent traitée par des thérapies de bien-être pour retrouver l'équilibre.",
        },
        {
          keyword: "Dynamique de groupe",
          description:
            "Interaction entre les individus dans un cadre collectif, influençant le bien-être des personnes au sein de l'équipe ou du groupe.",
        },
        {
          keyword: "Dopage naturel",
          description:
            "Pratiques ou substances naturelles qui stimulent la vitalité et le bien-être physique sans effets secondaires indésirables.",
        },
        {
          keyword: "Dépenses énergétiques",
          description:
            "Activités physiques ou mentales qui brûlent de l'énergie et influencent le bien-être corporel.",
        },
        {
          keyword: "Dorsale",
          description:
            "Partie du corps liée à la posture, qui joue un rôle clé dans le bien-être physique et peut nécessiter des soins spécialisés pour éviter les douleurs.",
        },
        {
          keyword: "Détourner l'attention",
          description:
            "Technique utilisée dans la gestion du stress, permettant de se concentrer sur des pensées positives ou relaxantes.",
        },
      ],
    },
    {
      letter: "E",
      terms: [
        {
          keyword: "Équilibre",
          description:
            "L'état d'harmonie entre les différents aspects de la vie (physique, mental, émotionnel), essentiel pour le bien-être général.",
        },
        {
          keyword: "Énergie",
          description:
            "Ressource physique et mentale qui influence la vitalité et le bien-être global.",
        },
        {
          keyword: "Exercice physique",
          description:
            "Activité qui favorise la santé physique et mentale, réduisant le stress et améliorant le bien-être.",
        },
        {
          keyword: "Épanouissement",
          description:
            "Processus de développement personnel et d'accomplissement de soi, essentiel au bien-être émotionnel et psychologique.",
        },
        {
          keyword: "Écologie",
          description:
            "Concept lié à la protection de l'environnement, souvent associé à des pratiques de bien-être respectueuses de la nature.",
        },
        {
          keyword: "Environnement",
          description:
            "L'espace autour de soi, dont la qualité influence directement le bien-être mental et physique.",
        },
        {
          keyword: "Émotion",
          description:
            "Ressentis affectifs qui jouent un rôle central dans le bien-être mental et la gestion du stress.",
        },
        {
          keyword: "Éveil",
          description:
            "Pratique de développement personnel et spirituel, souvent associée à la méditation et à la pleine conscience, pour améliorer le bien-être.",
        },
        {
          keyword: "Équilibre alimentaire",
          description:
            "Habitudes alimentaires saines, essentielles pour maintenir une bonne santé et un bien-être optimal.",
        },
        {
          keyword: "Endorphines",
          description:
            "Hormones produites par le corps, souvent libérées lors de l'exercice physique ou d'activités agréables, contribuant au bien-être.",
        },
        {
          keyword: "Exposition au soleil",
          description:
            "Pratique d'exposition modérée au soleil pour stimuler la production de vitamine D et améliorer l'humeur.",
        },
        {
          keyword: "Esprit",
          description:
            "L'aspect mental et cognitif de l'être humain, influencé par les pratiques de relaxation, de méditation, et de gestion du stress.",
        },
        {
          keyword: "Émotionnel",
          description:
            "Relatif à la gestion des émotions, essentiel pour un bien-être mental et une santé émotionnelle équilibrée.",
        },
        {
          keyword: "Équilibre mental",
          description:
            "La gestion et l'harmonie des pensées et émotions, vitales pour un bien-être durable.",
        },
        {
          keyword: "Entraînement",
          description:
            "Pratique régulière d'activités physiques ou mentales pour améliorer la condition physique et mentale, essentiel pour le bien-être.",
        },
        {
          keyword: "Éveil de conscience",
          description:
            "Pratique visant à augmenter la prise de conscience de soi et de son environnement, souvent liée à la méditation et à des thérapies de bien-être.",
        },
        {
          keyword: "Exposition à la nature",
          description:
            "Passer du temps en extérieur pour réduire le stress et améliorer le bien-être mental, souvent liée à la pratique du bain de forêt.",
        },
        {
          keyword: "Équité",
          description:
            "Principe de justice et d'égalité, pouvant jouer un rôle dans le bien-être au sein d'une communauté ou d'une organisation.",
        },
        {
          keyword: "Énergie vitale",
          description:
            "Concept spirituel qui représente la force et la vitalité internes qui influencent la santé physique et mentale.",
        },
        {
          keyword: "Emotions positives",
          description:
            "Ressentis comme la joie, l'amour, la gratitude, qui favorisent le bien-être émotionnel et mental.",
        },
      ],
    },
    {
      letter: "F",
      terms: [
        {
          keyword: "Forme physique",
          description:
            "Condition corporelle générale, influencée par l'exercice, l'alimentation et les habitudes de vie saines.",
        },
        {
          keyword: "Félicité",
          description:
            "État de bonheur et de bien-être émotionnel, souvent recherché par des pratiques comme la méditation et l'auto-soin.",
        },
        {
          keyword: "Flexibilité",
          description:
            "Capacité à adapter le corps ou l'esprit à diverses situations, souvent améliorée par des exercices physiques ou de relaxation.",
        },
        {
          keyword: "Fermeté",
          description:
            "Caractéristique physique liée à la tonicité musculaire, contribuant au bien-être physique.",
        },
        {
          keyword: "Fluide",
          description:
            "Sensation de légèreté et de liberté de mouvement, souvent recherchée par la pratique de certaines disciplines comme le yoga ou le Pilates.",
        },
        {
          keyword: "Fatigue",
          description:
            "Sensation de manque d'énergie physique ou mentale, souvent traitée par le repos, la nutrition et l'exercice.",
        },
        {
          keyword: "Fréquence cardiaque",
          description:
            "Mesure du rythme du cœur, influençant la santé et le bien-être, notamment lors d'activités physiques.",
        },
        {
          keyword: "Fruits",
          description:
            "Aliments riches en vitamines et en antioxydants, essentiels pour une alimentation saine et un bien-être général.",
        },
        {
          keyword: "Fortitude",
          description:
            "Force intérieure et courage face aux défis, contribuant au bien-être émotionnel et mental.",
        },
        {
          keyword: "Fusion",
          description:
            "Intégration de différents aspects du bien-être (corps, esprit, émotions) pour atteindre une harmonie totale.",
        },
        {
          keyword: "Famille",
          description:
            "Structure de soutien et de connexion émotionnelle, jouant un rôle essentiel dans le bien-être mental et social.",
        },
        {
          keyword: "Fitness",
          description:
            "Activité physique visant à maintenir ou améliorer la condition physique et le bien-être global.",
        },
        {
          keyword: "Fréquence respiratoire",
          description:
            "Nombre de respirations par minute, un indicateur de l'état physique et mental, influençant la relaxation et le bien-être.",
        },
        {
          keyword: "Flux",
          description:
            "État de concentration totale dans une activité, souvent associé au bien-être mental et à la productivité.",
        },
        {
          keyword: "Fructification",
          description:
            "Processus de développement et d'atteinte des objectifs de vie, contribuant à un épanouissement personnel et à un bien-être durable.",
        },
        {
          keyword: "Ferme",
          description:
            "Lieu de production alimentaire saine, souvent associé à une alimentation équilibrée et respectueuse du bien-être.",
        },
        {
          keyword: "Filtration",
          description:
            "Processus de purification (par exemple, l'eau ou l'air) qui peut jouer un rôle dans le bien-être global.",
        },
        {
          keyword: "Fluidité",
          description:
            "Sensation de bien-être dans le corps, de mouvement sans contrainte, souvent recherchée par des pratiques comme la danse ou le yoga.",
        },
        {
          keyword: "Frissons",
          description:
            "Réactions physiologiques du corps pouvant être liées à des émotions fortes ou à des changements dans l'environnement, influençant le bien-être émotionnel.",
        },
      ],
    },
    {
      letter: "G",
      terms: [
        {
          keyword: "Gratitude",
          description:
            "Sentiment de reconnaissance qui améliore le bien-être émotionnel et mental.",
        },
        {
          keyword: "Générosité",
          description:
            "Partage des ressources ou de l'attention, contribuant au bien-être émotionnel et social.",
        },
        {
          keyword: "Gestion du stress",
          description:
            "Ensemble de techniques visant à réduire l'impact du stress sur le corps et l'esprit, essentiel pour le bien-être mental.",
        },
        {
          keyword: "Glaçon",
          description:
            "Utilisé dans certains traitements de bien-être, comme la cryothérapie, pour réduire l'inflammation et favoriser la récupération.",
        },
        {
          keyword: "Gomme",
          description:
            "Peut être utilisée dans des contextes de relaxation, comme les gommes de massage ou de détente.",
        },
        {
          keyword: "Génération de bonheur",
          description:
            "Processus d'actions ou d'attitudes visant à accroître le bien-être et l'épanouissement personnel.",
        },
        {
          keyword: "Génétique",
          description:
            "Lien avec la santé et le bien-être en termes d'hérédité et de prédispositions physiques et mentales.",
        },
        {
          keyword: "Gymnastique",
          description:
            "Activité physique qui améliore la condition physique et le bien-être.",
        },
        {
          keyword: "Glycémie",
          description:
            "Niveau de sucre dans le sang, essentiel à la gestion de l'énergie et du bien-être physique.",
        },
        {
          keyword: "Gérer ses émotions",
          description:
            "Techniques et pratiques visant à maîtriser les émotions et à améliorer le bien-être émotionnel.",
        },
        {
          keyword: "Génome",
          description:
            "L'ensemble du matériel génétique, influençant la santé et le bien-être à long terme.",
        },
        {
          keyword: "Garde-robe",
          description:
            "Choix vestimentaires qui peuvent influencer la perception de soi et donc le bien-être personnel.",
        },
        {
          keyword: "Gommage",
          description:
            "Exfoliation de la peau pour éliminer les cellules mortes et favoriser un bien-être physique en offrant une peau lisse et saine.",
        },
        {
          keyword: "Guérison",
          description:
            "Processus de récupération physique ou mentale, essentiel à la restauration du bien-être.",
        },
        {
          keyword: "Grains",
          description:
            "Éléments de l'alimentation saine comme les grains entiers, bénéfiques pour la santé et le bien-être.",
        },
        {
          keyword: "Glycogène",
          description:
            "Source d'énergie utilisée par le corps, influençant la vitalité et le bien-être physique.",
        },
        {
          keyword: "Gestes bien-être",
          description:
            "Habitudes ou routines quotidiennes qui contribuent à maintenir un état de bien-être général, comme la méditation ou l'hydratation.",
        },
        {
          keyword: "Génération de détente",
          description:
            "Processus de relaxation permettant de réduire le stress et d'améliorer le bien-être.",
        },
        {
          keyword: "Grandeur d'âme",
          description:
            "Qualité morale qui contribue au bien-être émotionnel et psychologique en favorisant la bienveillance.",
        },
        {
          keyword: "Graines de chia",
          description:
            "Super-aliment riche en oméga-3 et en fibres, bénéfique pour la santé et le bien-être.",
        },
      ],
    },
    {
      letter: "H",
      terms: [
        {
          keyword: "Hammam",
          description:
            "Bain de vapeur chaude pour purifier le corps et favoriser la relaxation.",
        },
        {
          keyword: "Hydrothérapie",
          description:
            "Utilisation de l'eau sous différentes formes (chaude, froide, pression) pour traiter divers maux et améliorer le bien-être.",
        },
        {
          keyword: "Harmonie",
          description:
            "État d'équilibre et de bien-être, essentiel pour le corps, l'esprit et les émotions.",
        },
        {
          keyword: "Hydratation",
          description:
            "Processus d'apport en eau nécessaire au bon fonctionnement du corps, élément clé pour le bien-être physique.",
        },
        {
          keyword: "Humeur",
          description:
            "L'état émotionnel d'une personne, influençant fortement le bien-être psychologique.",
        },
        {
          keyword: "Hygiène",
          description:
            "Pratiques liées à la propreté personnelle et à la santé, contribuant au bien-être physique.",
        },
        {
          keyword: "Hypnothérapie",
          description:
            "Méthode thérapeutique utilisant l'hypnose pour traiter des troubles émotionnels ou physiques et améliorer le bien-être.",
        },
        {
          keyword: "Hérédité",
          description:
            "Transmission de traits physiques et mentaux qui peuvent influencer le bien-être tout au long de la vie.",
        },
        {
          keyword: "Herbes",
          description:
            "Plantes utilisées en phytothérapie, souvent employées pour leurs bienfaits sur la santé et le bien-être général.",
        },
        {
          keyword: "Holisme",
          description:
            "Approche de la santé et du bien-être qui considère l'individu dans sa globalité, en tenant compte de l'esprit, du corps et des émotions.",
        },
        {
          keyword: "Harmonie intérieure",
          description:
            "Équilibre émotionnel et psychologique, contribuant à un bien-être durable.",
        },
        {
          keyword: "Hatha yoga",
          description:
            "Pratique du yoga qui combine exercices physiques et techniques de respiration pour améliorer le bien-être physique et mental.",
        },
        {
          keyword: "Hypothèse de bien-être",
          description:
            "Théories ou approches qui expliquent les facteurs influençant le bien-être.",
        },
        {
          keyword: "Haut potentiel",
          description:
            "Potentiel d'une personne à exceller dans certains domaines, souvent lié à la gestion du bien-être émotionnel et intellectuel.",
        },
        {
          keyword: "Handicap",
          description:
            "Condition qui peut nécessiter une approche spécifique pour favoriser le bien-être des individus concernés.",
        },
        {
          keyword: "Homéopathie",
          description:
            "Méthode thérapeutique alternative utilisée pour traiter divers troubles et améliorer le bien-être général.",
        },
        {
          keyword: "Habitudes de vie",
          description:
            "Routines quotidiennes qui influencent le bien-être physique, mental et émotionnel.",
        },
        {
          keyword: "Hérédité génétique",
          description:
            "Influence de l'ADN sur la santé et le bien-être, affectant la susceptibilité à certaines conditions de santé.",
        },
        {
          keyword: "Hygiène du sommeil",
          description:
            "Ensemble de pratiques favorisant un sommeil réparateur, essentiel pour le bien-être physique et mental.",
        },
        {
          keyword: "Hydromassage",
          description:
            "Technique de relaxation utilisant l'eau pour soulager les tensions et favoriser le bien-être corporel.",
        },
        {
          keyword: "Hétérothérapie",
          description:
            "Pratique thérapeutique impliquant des interactions avec l'environnement extérieur pour favoriser le bien-être.",
        },
        {
          keyword: "Harmonie corporelle",
          description:
            "Équilibre physique et posture qui contribue au bien-être général, souvent amélioré par des pratiques comme la danse ou le yoga.",
        },
      ],
    },
    {
      letter: "I",
      terms: [
        {
          keyword: "Intégrité",
          description:
            "Qualité morale qui influence le bien-être psychologique et émotionnel, en rapport avec l'honnêteté et l'éthique personnelle.",
        },
        {
          keyword: "Inspiration",
          description:
            "Stimulation mentale ou émotionnelle qui favorise la créativité et le bien-être mental.",
        },
        {
          keyword: "Immunité",
          description:
            "Capacité du corps à se défendre contre les infections et à maintenir la santé physique, contribuant au bien-être général.",
        },
        {
          keyword: "Intuition",
          description:
            "Perception directe des choses sans raisonnement conscient, influençant le bien-être mental et émotionnel.",
        },
        {
          keyword: "Irrigation",
          description:
            "Processus d'hydratation du corps et de la peau, essentiel au bien-être physique et à la santé cutanée.",
        },
        {
          keyword: "Identité",
          description:
            "Conscience de soi qui impacte le bien-être psychologique et l'épanouissement personnel.",
        },
        {
          keyword: "Inflammation",
          description:
            "Réaction du corps à une agression qui, lorsqu'elle est contrôlée, peut affecter positivement le bien-être physique.",
        },
        {
          keyword: "Imagination",
          description:
            "Faculté mentale qui permet de visualiser des scénarios positifs, favorisant le bien-être émotionnel et psychologique.",
        },
        {
          keyword: "Isothérapie",
          description:
            "Méthode thérapeutique basée sur l'utilisation de petites quantités de substances pour stimuler les défenses du corps et améliorer le bien-être.",
        },
        {
          keyword: "Inhalation",
          description:
            "Pratique de respiration de substances naturelles comme les huiles essentielles pour favoriser la relaxation et améliorer le bien-être mental.",
        },
        {
          keyword: "Introspection",
          description:
            "Pratique de réflexion sur soi-même qui favorise la gestion des émotions et l'amélioration du bien-être psychologique.",
        },
        {
          keyword: "Intensité",
          description:
            "Niveau d'engagement physique ou mental qui peut influencer le bien-être, notamment dans l'exercice physique ou la concentration mentale.",
        },
        {
          keyword: "Indépendance",
          description:
            "Liberté émotionnelle et psychologique qui contribue au bien-être mental et au développement personnel.",
        },
        {
          keyword: "Impression",
          description:
            "Ressenti personnel qui peut influencer l'état d'esprit et le bien-être général d'une personne.",
        },
        {
          keyword: "Incontournable",
          description:
            "Ce qui est essentiel pour maintenir un bien-être global (comme des habitudes de vie saines).",
        },
        {
          keyword: "Isolement",
          description:
            "État d'éloignement des autres, qui peut affecter négativement le bien-être émotionnel et social.",
        },
        {
          keyword: "Infusion",
          description:
            "Boisson à base de plantes ou de fleurs, souvent utilisée pour ses bienfaits sur la santé et le bien-être.",
        },
        {
          keyword: "Interdépendance",
          description:
            "Relation mutuelle qui peut contribuer au bien-être social et émotionnel.",
        },
        {
          keyword: "Indulgence",
          description:
            "Pratique consistant à se permettre des moments de détente ou de plaisir, important pour maintenir un équilibre et un bien-être émotionnel.",
        },
        {
          keyword: "Inconscience",
          description:
            "Absence de réflexion ou de prise en charge des besoins personnels qui peut affecter négativement le bien-être.",
        },
      ],
    },
    {
      letter: "J",
      terms: [
        {
          keyword: "Jouissance",
          description:
            "Sensation de plaisir ou de satisfaction intense, contribuant au bien-être émotionnel et physique.",
        },
        {
          keyword: "Journée détente",
          description:
            "Une journée consacrée à des activités relaxantes pour favoriser la réduction du stress et améliorer le bien-être.",
        },
        {
          keyword: "Joues",
          description:
            "Zone du visage, parfois au centre de soins esthétiques et de bien-être, souvent massées pour la détente.",
        },
        {
          keyword: "Jardin thérapeutique",
          description:
            "Espace extérieur conçu pour favoriser la relaxation et le bien-être par le contact avec la nature.",
        },
        {
          keyword: "Jonglerie",
          description:
            "Pratique qui peut aider à améliorer la concentration et la coordination, contribuant à la stimulation mentale et au bien-être.",
        },
        {
          keyword: "Jeûne",
          description:
            "Pratique qui consiste à s'abstenir de nourriture pendant une période donnée, parfois utilisé pour des raisons de santé et de bien-être.",
        },
        {
          keyword: "Joyeux",
          description:
            "État de bonheur ou de plaisir, associé à un bien-être émotionnel et psychologique.",
        },
        {
          keyword: "Jambes légères",
          description:
            "Sensation agréable qui peut être associée à la circulation sanguine améliorée, favorisant le bien-être physique.",
        },
        {
          keyword: "Jouer",
          description:
            "Activité qui permet de réduire le stress, améliorer l'humeur et stimuler le bien-être émotionnel.",
        },
        {
          keyword: "Jouet thérapeutique",
          description:
            "Objet utilisé dans le cadre d'activités thérapeutiques, souvent pour stimuler la détente et le bien-être.",
        },
        {
          keyword: "Joie de vivre",
          description:
            "Sentiment général de bonheur et d'optimisme, essentiel pour le bien-être mental et émotionnel.",
        },
        {
          keyword: "Jasmin",
          description:
            "Plante souvent utilisée en aromathérapie, réputée pour ses propriétés relaxantes et son effet bénéfique sur le bien-être.",
        },
        {
          keyword: "Jupe confortable",
          description:
            "Vêtements favorisant une sensation de confort et de détente, contribuant à un bien-être physique et mental.",
        },
        {
          keyword: "Jardinage",
          description:
            "Activité physique en plein air qui peut améliorer la santé mentale, réduire le stress et promouvoir le bien-être.",
        },
        {
          keyword: "Jouvence",
          description:
            "Concept lié à la jeunesse et à la vitalité, souvent associé à des soins du corps et des habitudes de vie favorisant le bien-être.",
        },
        {
          keyword: "Jovialité",
          description:
            "Disposition mentale joyeuse qui contribue au bien-être émotionnel.",
        },
        {
          keyword: "Jambes tonifiées",
          description:
            "Condition physique résultant d'exercices qui favorisent la santé des jambes et améliorent le bien-être physique.",
        },
        {
          keyword: "Journée de relaxation",
          description:
            "Journée dédiée à des activités calmantes, comme la méditation ou les soins corporels, visant à restaurer l'équilibre et le bien-être.",
        },
      ],
    },
    {
      letter: "K",
      terms: [
        {
          keyword: "Kundalini",
          description:
            "Énergie spirituelle selon certaines pratiques de yoga, qui, lorsqu'éveillée, contribue à un bien-être mental et émotionnel.",
        },
        {
          keyword: "Karaté",
          description:
            "Art martial qui, au-delà de la discipline physique, favorise également la concentration, la gestion du stress et le bien-être mental.",
        },
        {
          keyword: "Kéfir",
          description:
            "Boisson fermentée riche en probiotiques, bénéfique pour la santé digestive et le bien-être intestinal.",
        },
        {
          keyword: "Kinésithérapie",
          description:
            "Discipline médicale qui utilise des techniques physiques pour améliorer la mobilité et le bien-être du corps.",
        },
        {
          keyword: "Kinesiologie",
          description:
            "Méthode thérapeutique qui examine les liens entre les muscles et le bien-être, visant à restaurer l'équilibre du corps et de l'esprit.",
        },
        {
          keyword: "Kalon",
          description:
            "Concept grec signifiant une beauté morale et intérieure, étroitement liée au bien-être émotionnel et spirituel.",
        },
        {
          keyword: "Kiné",
          description:
            "Abréviation courante de kinésithérapie, qui contribue au bien-être physique par des traitements physiques adaptés.",
        },
        {
          keyword: "Karma",
          description:
            "Concept spirituel lié à l'impact de nos actions sur notre bien-être et notre destinée future.",
        },
        {
          keyword: "Kava",
          description:
            "Plante utilisée pour ses propriétés relaxantes et calmantes, favorisant le bien-être mental et la gestion du stress.",
        },
        {
          keyword: "Kalonothérapie",
          description:
            "Pratique thérapeutique visant à apporter le bien-être par la beauté intérieure, en lien avec des pratiques de soins et de détente.",
        },
      ],
    },
    {
      letter: "L",
      terms: [
        {
          keyword: "Libération",
          description:
            "Le processus de se débarrasser du stress, des tensions ou des émotions négatives pour favoriser le bien-être mental et émotionnel.",
        },
        {
          keyword: "Lâcher-prise",
          description:
            "Concept psychologique essentiel pour gérer le stress et les émotions, favorisant ainsi un bien-être mental et émotionnel.",
        },
        {
          keyword: "Relaxation",
          description:
            "Technique visant à réduire le stress et à détendre le corps et l'esprit, essentielle pour le bien-être général.",
        },
        {
          keyword: "Lumière",
          description:
            "Utilisée en luminothérapie pour traiter certains troubles de l'humeur, favorisant ainsi le bien-être psychologique.",
        },
        {
          keyword: "Longévité",
          description:
            "La durée de vie, souvent liée à un mode de vie sain et à des pratiques qui favorisent le bien-être physique et mental.",
        },
        {
          keyword: "Légèreté",
          description:
            "Sensation physique ou émotionnelle de bien-être, souvent liée à une absence de stress ou de tension.",
        },
        {
          keyword: "Lymphe",
          description:
            "Liquide corporel impliqué dans la circulation des nutriments et des déchets, dont la santé influe sur le bien-être général.",
        },
        {
          keyword: "Lithothérapie",
          description:
            "Pratique thérapeutique utilisant des pierres et cristaux pour améliorer le bien-être émotionnel et physique.",
        },
        {
          keyword: "Légumes",
          description:
            "Aliments essentiels pour une alimentation équilibrée, contribuant au bien-être physique par leurs bienfaits nutritifs.",
        },
        {
          keyword: "Lecture",
          description:
            "Activité mentale apaisante et enrichissante, favorisant le bien-être émotionnel et intellectuel.",
        },
        {
          keyword: "Libido",
          description:
            "Aspect important de la santé sexuelle, lié au bien-être physique et émotionnel.",
        },
        {
          keyword: "Lenteur",
          description:
            "Concept de ralentir le rythme de vie pour réduire le stress et favoriser le bien-être mental.",
        },
        {
          keyword: "Luminothérapie",
          description:
            "Traitement par la lumière, souvent utilisé pour traiter la dépression saisonnière et améliorer le bien-être psychologique.",
        },
        {
          keyword: "Loisir",
          description:
            "Activités récréatives et détentes qui favorisent un bien-être général en permettant de se relaxer et de s'épanouir.",
        },
        {
          keyword: "Lutte contre le stress",
          description:
            "Ensemble de techniques et stratégies pour gérer et réduire le stress, essentiel pour le bien-être mental et physique.",
        },
        {
          keyword: "Liaison sociale",
          description:
            "Connexions avec les autres, importantes pour le bien-être émotionnel et social.",
        },
        {
          keyword: "Libération émotionnelle",
          description:
            "Processus de gestion des émotions, souvent lié à la pratique de techniques de développement personnel pour améliorer le bien-être émotionnel.",
        },
        {
          keyword: "Lissage",
          description:
            "Pratique cosmétique qui, au-delà de l'apparence physique, peut avoir un effet positif sur le bien-être en améliorant la confiance en soi.",
        },
        {
          keyword: "Légumes fermentés",
          description:
            "Aliments probiotiques bénéfiques pour la santé digestive et le bien-être intestinal.",
        },
        {
          keyword: "Lait d'amande",
          description:
            "Alternative alimentaire végétalienne souvent associée à une alimentation saine et au bien-être physique.",
        },
      ],
    },
    {
      letter: "M",
      terms: [
        {
          keyword: "Méditation",
          description:
            "Pratique de concentration mentale visant à calmer l'esprit et réduire le stress, favorisant le bien-être mental.",
        },
        {
          keyword: "Massage",
          description:
            "Technique de relaxation corporelle qui aide à soulager les tensions et améliorer le bien-être physique et émotionnel.",
        },
        {
          keyword: "Musculation",
          description:
            "Activité physique qui contribue à améliorer la force et la santé physique, influençant le bien-être général.",
        },
        {
          keyword: "Mouvement",
          description:
            "Activité physique essentielle pour maintenir la forme physique, améliorer la circulation et le bien-être général.",
        },
        {
          keyword: "Méditation de pleine conscience",
          description:
            "Technique visant à cultiver la présence et la conscience du moment présent pour réduire le stress et favoriser le bien-être mental.",
        },
        {
          keyword: "Mentalité positive",
          description:
            "Attitude qui favorise une approche optimiste face aux défis, influençant positivement le bien-être psychologique.",
        },
        {
          keyword: "Manger sainement",
          description:
            "Pratique alimentaire qui améliore le bien-être physique et mental par une nutrition équilibrée.",
        },
        {
          keyword: "Massage thérapeutique",
          description:
            "Technique spécifique utilisée pour traiter les douleurs physiques et favoriser la guérison, contribuant ainsi au bien-être.",
        },
        {
          keyword: "Morale",
          description:
            "Principes et valeurs qui influencent le bien-être psychologique et l'épanouissement personnel.",
        },
        {
          keyword: "Méditation transcendantale",
          description:
            "Technique de méditation qui vise à transcender les pensées et amener un état de relaxation profonde pour le bien-être.",
        },
        {
          keyword: "Mantra",
          description:
            "Mot ou phrase répétée lors de la méditation pour favoriser la concentration et améliorer le bien-être mental.",
        },
        {
          keyword: "Musique relaxante",
          description:
            "Sonorités apaisantes utilisées pour réduire le stress et améliorer l'état d'esprit, favorisant le bien-être.",
        },
        {
          keyword: "Maquillage naturel",
          description:
            "Utilisation de produits cosmétiques qui respectent la peau, contribuant à l'estime de soi et au bien-être personnel.",
        },
        {
          keyword: "Minceur",
          description:
            "Pratique ou objectif lié à la gestion du poids, souvent pour améliorer le bien-être physique et la confiance en soi.",
        },
        {
          keyword: "Méditation guidée",
          description:
            "Pratique de méditation dirigée par un instructeur ou une application, favorisant le bien-être mental et émotionnel.",
        },
        {
          keyword: "Mindfulness",
          description:
            "Autre terme pour la pleine conscience, une approche qui favorise la gestion du stress et le bien-être émotionnel.",
        },
        {
          keyword: "Massothérapie",
          description:
            "Thérapie utilisant le massage pour traiter les douleurs et tensions musculaires, contribuant au bien-être physique.",
        },
        {
          keyword: "Manuel",
          description:
            "Référence aux techniques manuelles, comme le massage, pour améliorer le bien-être physique.",
        },
        {
          keyword: "Métamorphose",
          description:
            "Transformation personnelle ou émotionnelle, souvent en lien avec le développement personnel et le bien-être.",
        },
        {
          keyword: "Méditation zen",
          description:
            "Pratique de méditation originant du bouddhisme zen, visant à apporter paix intérieure et bien-être mental.",
        },
        {
          keyword: "Miracle",
          description:
            "Utilisé dans le contexte du bien-être pour désigner des moments ou des transformations perçus comme exceptionnels et bénéfiques pour l'esprit.",
        },
        {
          keyword: "Mucus",
          description:
            "Lié à la santé physique, un bon drainage du mucus peut améliorer le bien-être corporel en soutenant le système respiratoire et digestif.",
        },
        {
          keyword: "Ménopause",
          description:
            "Période de transition de la vie des femmes, souvent traitée avec des soins spécifiques pour maintenir le bien-être physique et émotionnel.",
        },
        {
          keyword: "Maîtrise de soi",
          description:
            "Capacité à contrôler ses émotions et réactions, essentielle pour maintenir un bien-être mental stable.",
        },
        {
          keyword: "Médecine douce",
          description:
            "Approches thérapeutiques naturelles, comme l'acupuncture ou l'homéopathie, qui visent à améliorer le bien-être sans recours aux médicaments lourds.",
        },
      ],
    },
    {
      letter: "N",
      terms: [
        {
          keyword: "Nuad Bo Lann",
          description:
            "Massage traditionnel thaïlandais combinant étirements, pressions et manipulations pour améliorer la circulation et relâcher les tensions.",
        },
        {
          keyword: "Nutrition",
          description:
            "Pratique essentielle qui influence directement le bien-être physique et mental en fournissant au corps les nutriments nécessaires.",
        },
        {
          keyword: "Naturopathie",
          description:
            "Médecine alternative qui utilise des méthodes naturelles pour prévenir et traiter les maladies, contribuant au bien-être global.",
        },
        {
          keyword: "Nidothérapie",
          description:
            "Pratique thérapeutique qui utilise la gestion de l'environnement personnel, notamment l'aménagement de l'espace, pour favoriser le bien-être.",
        },
        {
          keyword: "Nervosité",
          description:
            "État d'anxiété ou de stress qui peut être géré par des techniques de relaxation et de gestion du bien-être mental.",
        },
        {
          keyword: "Nouveauté",
          description:
            "Découvertes ou approches innovantes qui peuvent améliorer le bien-être, notamment dans les domaines de la santé et du développement personnel.",
        },
        {
          keyword: "Nid",
          description:
            "Métaphoriquement utilisé pour désigner un espace personnel et confortable où l'on peut se ressourcer, favorisant ainsi le bien-être émotionnel.",
        },
        {
          keyword: "Neuroplasticité",
          description:
            "Capacité du cerveau à se réorganiser et à se régénérer, influençant positivement le bien-être mental par l'adaptation aux expériences.",
        },
        {
          keyword: "Nuit réparatrice",
          description:
            "Sommeil de qualité permettant au corps et à l'esprit de se régénérer, crucial pour le bien-être physique et mental.",
        },
        {
          keyword: "Naissance",
          description:
            "Concept lié au renouvellement et à la croissance personnelle, influençant le bien-être émotionnel et spirituel.",
        },
        {
          keyword: "Narcisse",
          description:
            "Plante parfois utilisée en aromathérapie, contribuant à un bien-être apaisant et calmant.",
        },
        {
          keyword: "Nourriture consciente",
          description:
            "Pratique consistant à manger en pleine conscience, ce qui aide à améliorer la digestion, la santé et le bien-être global.",
        },
        {
          keyword: "Nature",
          description:
            "L'environnement naturel, qui joue un rôle clé dans la réduction du stress et la promotion du bien-être émotionnel et physique.",
        },
        {
          keyword: "Nostalgie",
          description:
            "Émotion qui peut avoir un impact positif ou négatif sur le bien-être mental, selon son contexte.",
        },
      ],
    },
    {
      letter: "O",
      terms: [
        {
          keyword: "Oxygénation",
          description:
            "Processus essentiel pour le bon fonctionnement du corps et du cerveau, améliorant l'énergie et le bien-être.",
        },
        {
          keyword: "Olfactothérapie",
          description:
            "Thérapie utilisant les odeurs et les huiles essentielles pour favoriser le bien-être émotionnel.",
        },
        {
          keyword: "Onguent",
          description:
            "Baume ou pommade naturelle utilisée pour apaiser la peau et procurer une sensation de bien-être.",
        },
        {
          keyword: "Ostéopathie",
          description:
            "Médecine douce basée sur la manipulation du corps pour soulager douleurs et tensions.",
        },
        {
          keyword: "Oméga-3",
          description:
            "Acides gras essentiels bénéfiques pour la santé mentale, le cœur et l'inflammation.",
        },
        {
          keyword: "Osmose",
          description:
            "Terme utilisé pour désigner une harmonie entre le corps et l'esprit, souvent recherché en développement personnel.",
        },
        {
          keyword: "Ozone thérapie",
          description:
            "Technique de soin utilisant l'ozone pour purifier et revitaliser l'organisme.",
        },
        {
          keyword: "Optimisme",
          description:
            "Attitude mentale positive favorisant un bien-être émotionnel et psychologique.",
        },
        {
          keyword: "Ouverture d'esprit",
          description:
            "Capacité à accueillir de nouvelles idées et expériences, essentielle pour le développement personnel.",
        },
        {
          keyword: "Objectif",
          description:
            "Fixer des buts personnels et professionnels pour améliorer le bien-être et la motivation.",
        },
        {
          keyword: "Observation",
          description:
            "Pratique de pleine conscience consistant à observer ses pensées et émotions sans jugement.",
        },
        {
          keyword: "Oubli",
          description:
            "Savoir lâcher prise et oublier les rancœurs pour améliorer son bien-être mental.",
        },
        {
          keyword: "Om",
          description:
            "Son sacré utilisé dans la méditation et le yoga pour favoriser la relaxation et l'équilibre intérieur.",
        },
        {
          keyword: "Ondes positives",
          description:
            "Énergies favorisant un état d'esprit serein et harmonieux.",
        },
        {
          keyword: "Orchidée",
          description:
            "Fleur souvent associée à la relaxation et utilisée en parfumerie pour créer des ambiances apaisantes.",
        },
        {
          keyword: "Orientation",
          description:
            "Trouver une direction de vie en accord avec son bien-être et ses aspirations.",
        },
        {
          keyword: "Observation intérieure",
          description:
            "Pratique introspective aidant à mieux comprendre ses émotions et améliorer son bien-être.",
        },
        {
          keyword: "Oxygène",
          description:
            "Élément vital qui joue un rôle clé dans l'amélioration du bien-être physique et mental.",
        },
        {
          keyword: "Océan",
          description:
            "Source d'apaisement et de ressourcement, propice au bien-être et à la détente.",
        },
        {
          keyword: "Ondulation",
          description:
            "Mouvement doux utilisé en yoga ou en danse pour favoriser la fluidité corporelle et l'harmonie intérieure.",
        },
        {
          keyword: "Outdoor",
          description:
            "Activités en plein air bénéfiques pour la santé physique et mentale.",
        },
        {
          keyword: "Observation de la nature",
          description:
            "Pratique favorisant la relaxation et le bien-être en se reconnectant à son environnement.",
        },
      ],
    },
    {
      letter: "P",
      terms: [
        {
          keyword: "Palper-rouler",
          description:
            "Technique de massage visant à déloger les amas de graisse en effectuant des pressions et des mouvements de roulement sur la peau.",
        },
        {
          keyword: "Polynésien",
          description:
            "Massage inspiré des traditions polynésiennes, utilisant des mouvements lents et fluides pour détendre et revitaliser le corps.",
        },
        {
          keyword: "Paix",
          description:
            "État de calme intérieur et d'harmonie, exempt de tensions ou de stress.",
        },
        {
          keyword: "Plénitude",
          description:
            "Sentiment de satisfaction profonde et d'accomplissement personnel.",
        },
        {
          keyword: "Pureté",
          description:
            "Qualité de ce qui est exempt d'impuretés, synonyme de clarté et de bien-être naturel.",
        },
        {
          keyword: "Plaisir",
          description:
            "Sensation agréable ressentie à travers les sens ou les émotions.",
        },
        {
          keyword: "Privilège",
          description:
            "Avantage particulier procurant une expérience exclusive et raffinée.",
        },
        {
          keyword: "Protection",
          description:
            "Action de préserver son équilibre physique et mental contre les agressions extérieures.",
        },
        {
          keyword: "Présence",
          description:
            "État de conscience ancré dans l'instant présent, favorisant la sérénité.",
        },
        {
          keyword: "Proximité",
          description:
            "Relation chaleureuse et bienveillante avec son environnement et autrui.",
        },
        {
          keyword: "Pensée positive",
          description:
            "Attitude mentale tournée vers l'optimisme et la recherche d'harmonie.",
        },
        {
          keyword: "Parfum",
          description:
            "Effluve subtil stimulant les sens et influençant les émotions.",
        },
        {
          keyword: "Peau",
          description:
            "Organe sensoriel reflétant la santé et le bien-être intérieur.",
        },
        {
          keyword: "Prestige",
          description:
            "Rayonnement d'un lieu ou d'une expérience procurant une sensation d'exclusivité.",
        },
        {
          keyword: "Puissance intérieure",
          description:
            "Force personnelle permettant l'épanouissement et la résilience.",
        },
        {
          keyword: "Pause",
          description:
            "Moment de détente et de ressourcement, essentiel au bien-être.",
        },
        {
          keyword: "Prendre soin",
          description:
            "Acte d'attention et de bienveillance envers soi-même ou autrui.",
        },
        {
          keyword: "Profond",
          description:
            "Qualifie une sensation ou une expérience intense et authentique.",
        },
        {
          keyword: "Purification",
          description:
            "Processus visant à éliminer les toxines et les tensions pour retrouver un équilibre.",
        },
        {
          keyword: "Positivité",
          description:
            "Capacité à voir le bon côté des choses et à cultiver la joie de vivre.",
        },
        {
          keyword: "Persévérance",
          description:
            "Volonté de poursuivre son bien-être malgré les obstacles.",
        },
        {
          keyword: "Patience",
          description:
            "Aptitude à accepter le temps nécessaire pour atteindre un état de mieux-être.",
        },
      ],
    },
    {
      letter: "Q",
      terms: [
        {
          keyword: "Quiétude",
          description:
            "État de calme et de sérénité profonde, exempt de stress ou d'agitation.",
        },
        {
          keyword: "Quotidien équilibré",
          description:
            "Mode de vie harmonieux basé sur des habitudes favorisant le bien-être.",
        },
        {
          keyword: "Quête de soi",
          description:
            "Processus personnel visant à mieux se connaître et à s'épanouir pleinement.",
        },
        {
          keyword: "Qualité de vie",
          description:
            "Niveau de bien-être général résultant de l'équilibre entre santé, émotions et environnement.",
        },
        {
          keyword: "Qi",
          description:
            "Concept issu de la médecine traditionnelle chinoise désignant l'énergie vitale qui circule dans le corps.",
        },
        {
          keyword: "Qi Gong",
          description:
            "Discipline énergétique chinoise combinant mouvements doux, respiration et méditation pour favoriser l'harmonie corporelle et mentale.",
        },
      ],
    },
    {
      letter: "R",
      terms: [
        {
          keyword: "Réflexologie plantaire",
          description:
            "Technique de massage des pieds visant à stimuler des points spécifiques pour soulager les tensions et améliorer la santé globale.",
        },
        {
          keyword: "Relaxation",
          description:
            "État de détente physique et mentale permettant de réduire le stress et les tensions.",
        },
        {
          keyword: "Repos",
          description:
            "Moment de pause nécessaire à la récupération du corps et de l'esprit.",
        },
        {
          keyword: "Ressourcement",
          description:
            "Processus permettant de retrouver énergie et équilibre en se recentrant sur soi.",
        },
        {
          keyword: "Réconfort",
          description:
            "Sensation de bien-être procurée par une attention bienveillante ou un moment apaisant.",
        },
        {
          keyword: "Respiration",
          description:
            "Fonction vitale influençant le bien-être et la gestion du stress, notamment à travers des techniques comme la respiration profonde.",
        },
        {
          keyword: "Régénération",
          description:
            "Capacité du corps et de l'esprit à se restaurer et à retrouver leur vitalité.",
        },
        {
          keyword: "Ralentissement",
          description:
            "Pratique visant à adopter un rythme de vie plus apaisé et conscient.",
        },
        {
          keyword: "Rituel",
          description:
            "Habitude ou pratique régulière favorisant le bien-être et l'équilibre intérieur.",
        },
        {
          keyword: "Rayonnement",
          description:
            "État de bien-être intérieur se manifestant par une énergie positive et un éclat naturel.",
        },
        {
          keyword: "Résilience",
          description:
            "Capacité à surmonter les épreuves et à retrouver un équilibre émotionnel.",
        },
        {
          keyword: "Réharmonisation",
          description:
            "Processus visant à rééquilibrer le corps et l'esprit à travers diverses pratiques de bien-être.",
        },
        {
          keyword: "Régulation",
          description:
            "Action de stabiliser les émotions, le stress ou l'énergie pour un mieux-être global.",
        },
        {
          keyword: "Rajeunissement",
          description:
            "Effet de revitalisation du corps et de l'esprit, procurant une sensation de fraîcheur et de dynamisme.",
        },
        {
          keyword: "Recueillement",
          description:
            "Moment d'introspection et de calme permettant de se recentrer sur soi.",
        },
        {
          keyword: "Rêverie",
          description:
            "Évasion mentale procurant une sensation d'apaisement et de créativité.",
        },
        {
          keyword: "Revitalisation",
          description:
            "Action de redonner de l'énergie et du tonus au corps et à l'esprit.",
        },
      ],
    },
    {
      letter: "S",
      terms: [
        {
          keyword: "Sauna",
          description:
            "Chambre chauffée utilisée pour la sudation, favorisant la relaxation et l'élimination des toxines.",
        },
        {
          keyword: "Shiatsu",
          description:
            "Massage japonais utilisant des pressions sur des points spécifiques pour rétablir l'équilibre énergétique.",
        },
        {
          keyword: "Sous affusion",
          description:
            "Technique de massage avec des jets d'eau chaude ou froide qui sont projetés sur le corps pour stimuler la circulation.",
        },
        {
          keyword: "Suédois",
          description:
            "Massage qui combine des mouvements longs, des pressions et des pétrissages pour détendre les muscles et améliorer la circulation.",
        },
        {
          keyword: "Singapourien",
          description:
            "Massage inspiré des techniques traditionnelles de Singapour, souvent axé sur le bien-être général et la relaxation.",
        },
        {
          keyword: "Sérénité",
          description:
            "État de calme et de tranquillité intérieure, libre de préoccupations et de tensions.",
        },
        {
          keyword: "Sommeil réparateur",
          description:
            "Type de sommeil profond permettant la récupération physique et mentale.",
        },
        {
          keyword: "Soin",
          description:
            "Action visant à préserver ou améliorer l'état de santé et de bien-être.",
        },
        {
          keyword: "Soulagement",
          description:
            "Sensation de décompression et de confort après avoir éliminé une douleur ou un stress.",
        },
        {
          keyword: "Santé mentale",
          description:
            "État de bien-être psychologique où une personne se sent équilibrée et épanouie.",
        },
        {
          keyword: "Soutien",
          description:
            "Aide morale et émotionnelle permettant de maintenir ou restaurer l'équilibre intérieur.",
        },
        {
          keyword: "Silence",
          description:
            "Absence de bruit, propice à la relaxation et à la méditation.",
        },
        {
          keyword: "Souplesse",
          description:
            "Flexibilité du corps, souvent travaillée à travers des pratiques comme le yoga ou les étirements.",
        },
        {
          keyword: "Satisfaction",
          description:
            "Sentiment de contentement et de bien-être intérieur découlant de l'accomplissement ou du plaisir.",
        },
        {
          keyword: "Sécurité émotionnelle",
          description:
            "Sentiment de stabilité et de confiance intérieure, à l'abri des peurs et des angoisses.",
        },
        {
          keyword: "Savourer",
          description:
            "Prendre le temps d'apprécier pleinement une expérience ou un moment de bien-être.",
        },
        {
          keyword: "Spiritualité",
          description:
            "Dimension intérieure et transcendante qui recherche l'épanouissement personnel et l'harmonie avec soi-même et le monde.",
        },
        {
          keyword: "Simplicité",
          description:
            "Mode de vie épuré des distractions et des complications, axé sur le retour à l'essentiel.",
        },
        {
          keyword: "Soin corporel",
          description:
            "Ensemble des pratiques visant à entretenir et améliorer l'état physique du corps.",
        },
        {
          keyword: "Synergie",
          description:
            "Interaction harmonieuse entre différentes pratiques ou éléments contribuant au bien-être global.",
        },
        {
          keyword: "Stress",
          description:
            "Réaction de l'organisme face à des situations perçues comme menaçantes ou perturbatrices, à réguler pour préserver son équilibre.",
        },
        {
          keyword: "Soin personnalisé",
          description:
            "Approche de bien-être prenant en compte les besoins spécifiques de chaque individu pour lui offrir un accompagnement adapté.",
        },
        {
          keyword: "Spas",
          description:
            "Lieux dédiés à la détente et aux soins corporels, souvent associés à des pratiques de relaxation et de soins thermaux.",
        },
        {
          keyword: "Sagesse",
          description:
            "Capacité à prendre des décisions équilibrées et éclairées, contribuant au bien-être intérieur.",
        },
      ],
    },
    
  ];

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-5xl text-center mb-10">GLOSSAIRE</h1>

      {}
      <h2 className="text-2xl text-center mb-6">Liste des termes</h2>

      <div className="flex flex-col divide-y font-bricolage mb-8">
        {glossaryData.map((group, index) => (
          <GlossaireItem
            key={index}
            letter={group.letter}
            data={group.terms}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
      <div className="w-full flex items-center justify-center mb-2">
        <ButtonIcon title="Accueil" link={paths.main} />
      </div>
    </div>
  );
}
