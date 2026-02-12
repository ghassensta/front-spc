export const paths = {
  main: "/",
  spa: {
    root: "/spa",
    details: (id) => `/spa/${id}`,
    list: "/liste-des-spas",
  },
  product: (slug) => `/produit/${slug}`,
  search: (catSlug = "", villeSlug = "") => {
    const parts = [catSlug, villeSlug].filter(Boolean);
    return parts.length ? `/recherche/${parts.join("/")}` : "/recherche";
  },
  checkout: "/checkout",
  actualites: "/actualites" ,
  actualitesDetails: (slug) => `/actualites/${slug}`,
  who: "/qui-sommes-nous" ,
  categories: (slug) => `/categories/${slug}`,
  payment: "/payment",
  recompense: "/recompense" ,
  programme: "/programme-de-parrainage" ,
  referentiel: "/referentiel-de-candidature" ,
  cadeau: "/carte-cadeau" ,
  collection: "/collection-prestige" ,
  partenaire: "/devenir-partenaire" ,
  contact: "/assistance-contact" ,
  solutions: "/solutions-ce",
  marque: "/marque-partenaire" ,
  glossaire: "/glossaire" ,
  checkoutDetails: "/checkout/details",
  mentions: "/mentions-legales" ,
  conditions: "/conditions" ,
  dashboard: {
    root: "/dashboard",
    commandes: {
      root: "/dashboard/commandes",
      view: (id) => `/dashboard/commandes/${id}/view`,
    },
    details: "/dashboard/details",
    wishlist: "/dashboard/wishlist",
    aide: "/dashboard/aide",
    cadeau: "/dashboard/cadeau",
    parrainage: "/dashboard/parrainage",
    fidelite: "/dashboard/fidelite",
    bonAchats: "/dashboard/bon-achats",
  },
  cagnotte: {
    root: "/cagnotte",
    create: "/cagnotte/create",
    show: (slug) => `/cagnotte/${slug}`,
    manage: (slug) => `/cagnotte/${slug}`,
  },
  
  auth: {
    root: "/auth",
    register: "/auth/register",
    forget: "/auth/forget-password",
    reset: "/auth/reset-password"
  },
};
