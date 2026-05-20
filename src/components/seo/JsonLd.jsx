import { Helmet } from "react-helmet-async";

/**
 * Injecte un ou plusieurs schémas JSON-LD.
 * react-helmet-async v2 ne supporte pas les .map() comme enfants de <Helmet>,
 * donc on rend UN <Helmet> par schéma (Helmet les fusionnera dans le <head>).
 */
export default function JsonLd({ data }) {
  if (!data) return null;
  const payload = (Array.isArray(data) ? data : [data]).filter(Boolean);
  if (!payload.length) return null;

  return (
    <>
      {payload.map((schema, i) => (
        <Helmet key={i}>
          <script type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        </Helmet>
      ))}
    </>
  );
}
