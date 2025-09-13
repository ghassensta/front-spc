export const paths = {
  main: "/",
  spa: {
    root: "/spa",
    details: (id) => `/spa/${id}`,
  },
  checkout: "/checkout",
  actualites: "/actualites",/*DONE */
  actualitesDetails: (slug) => `/actualites/${slug}`,
  who: "/qui-somme-nous", /*DONE */
  categories: (slog) => `/categories/${slog}`,
  payment: "/payment",
  recompense: "/recompense",  /*DONE */
  referentiel: "/referentiel-de-candidature",/*DONE */
  cadeau: "/carte-cadeau",  /*DONE */
  collection: "/collection-prestige", /*DONE */
  partenaire: "/devenir-partenaire",/*DONE */
  contact: "/assistance-contact",/*DONE */
  solutions: "/solutions-ce",/*DONE */
  marque: "/marque-partenaire",/*DONE */
  glossaire: "/glossaire",/*DONE */
  checkoutDetails: "/checkout/details",
  mentions: "/mentions-legales",/*DONE */
  conditions: "/conditions",/*DONE */
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
  },
  auth: {
    root: "/auth",
  },
};