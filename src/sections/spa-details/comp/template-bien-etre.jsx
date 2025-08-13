import CardItem from "../../../components/card-item/card-item";
import ServicesTemplates from "./services-templates";

export default function TemplateBienEtre({ data }) {
  if (!data || !data.type_produit) return null;

  return (
    <div className="bg-[#f6f4ec] p-6">
      <ServicesTemplates />

      {data.type_produit.map((product) => (
        <CardItem
          key={product.id}
          image={product.image ? `${product.image}` : "/images/default-product.jpg"}
          title={product.nom || ""}
          description={product.description || ""}
          spaNote={product.access_spa || ""}
          price={product.prix || ""}
          exclusiveExist={product.exclusivite_spc === 1}
          flashDeadline={product.date_fin || null}
        />
      ))}
    </div>
  );
}
