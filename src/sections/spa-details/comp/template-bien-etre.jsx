import CardItem from "../../../components/card-item/card-item";
import ServicesTemplates from "./services-templates";

export default function TemplateBienEtre({ data=[] }) {
  if (!data || !data.type_produit) return null;
  console.log("data all bookes", data);

  return (
    <div className="p-6">
      <ServicesTemplates data={data} />
    </div>
  );
}
