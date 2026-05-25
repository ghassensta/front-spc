import { Link } from "react-router-dom";
import { breadcrumbSchema } from "../../lib/schema";
import JsonLd from "./JsonLd";

const toLabel = (label) => {
  if (label == null) return "";
  if (typeof label === "string" || typeof label === "number") return String(label);
  if (typeof label === "object") return label.name || label.nom || label.label || "";
  return "";
};

export default function Breadcrumb({ items, className = "" }) {
  if (!items || items.length === 0) return null;

  const safeItems = items.map((it) => ({
    ...it,
    label: toLabel(it.label),
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema(safeItems)} />
      <nav
        aria-label="Fil d'ariane"
        className={`seo-breadcrumb ${className}`}
      >
        <ol
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            listStyle: "none",
            padding: 0,
            margin: "8px 0",
            fontSize: "14px",
          }}
        >
          {safeItems.map((item, i) => {
            const isLast = i === safeItems.length - 1;
            return (
              <li
                key={`${item.path}-${i}`}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {isLast ? (
                  <span aria-current="page" style={{ color: "#6b6b6b" }}>
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link
                      to={item.path}
                      style={{ color: "#b8955a", textDecoration: "none" }}
                    >
                      {item.label}
                    </Link>
                    <span aria-hidden="true" style={{ color: "#9b9b9b" }}>
                      ›
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
