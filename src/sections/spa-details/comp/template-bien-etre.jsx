import CardItem from "../../../components/card-item/card-item";

// Example data (you can replace it with real data)
const cards = [
  {
    id: 1,
    image: "https://spa-prestige-collection.com/wp-content/uploads/2025/02/SPC-Massage-corps-1975x1318-02.jpg",
    title: "Massage evasion sensorielle – 1h – en Solo",
    description:
      "Massage evasion sensorielle : Le massage Évasion Sensorielle est une expérience holistique unique qui combine des techniques de massage traditionnelles avec des éléments d",
    spaNote: "Accès Spa (valeur 40 €) offert avec cette offre.",
    price: "99,00 €",
    exclusiveExist: true,
    flashDeadline:"2025-05-01T20:30:00"
  },
  {
    id: 2,
    image: "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPA-visage-1975x1318-04.jpg",
    title: "Pass Paradis 1h + Traditionnel Indien du Visage 30 mn – Solo",
    description:
      "Accès à l’espace Réveil des Sens et au Concept du Bonheur ET « Un masseur bien-être écoute avec ses mains, et son cœur » Le massage Indien du visage est originaire d",
    spaNote: "Accès Spa (valeur 40 €) offert avec cette offre.",
    price: "69,00 €",
    exclusiveExist: false
  },
];

export default function TemplateBienEtre() {
  return (
    <div className="bg-[#f6f4ec] p-6">
      {cards.map((card, index) => (
        <CardItem key={index} {...card} />
      ))}
    </div>
  );
}
