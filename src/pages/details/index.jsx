
import { useParams } from "react-router-dom";
import SpaDetailsView from "../../sections/spa-details/spa-details-view";
import { useGetEtablissement } from "src/actions/etablissements";

// ----------------------------------------------------------------------

export default function Page() {
  const { id } =useParams();

  const { etablissement, types, simlairesEtablissment, avis, marquesPartenaires } = useGetEtablissement(id)

  console.log(etablissement)

  return (
    <>
     <SpaDetailsView spaData={etablissement} types={types} simlairesEtablissment={simlairesEtablissment} avis={avis} marquesPartenaires={marquesPartenaires}/>
    </>
  );
}
