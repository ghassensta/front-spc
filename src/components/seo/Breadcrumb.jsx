import { Link } from "react-router-dom";
import { breadcrumbSchema } from "../../lib/schema";
import JsonLd from "./JsonLd";

export default function Breadcrumb({ items, className = "" }) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
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
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
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
