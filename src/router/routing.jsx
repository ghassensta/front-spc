import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import LayoutTheme from "../layouts/layout";
import LoadingScreen from "../components/loading-screen/loading-screen";
import DashboardLayout from "src/layouts/dashboardLayout";
import { AuthGuard } from "src/auth/guard/auth-guard";

// Pages principales
const Index = lazy(() => import("../pages/home/index"));
const Index2 = lazy(() => import("../pages/home/index2"));
const Details = lazy(() => import("../pages/details/index"));
const SpaList = lazy(() => import("../pages/spa-list/index"));
const ViewProduct = lazy(() => import("../pages/product/index"));
const ViewProduct2 = lazy(() => import("../pages/product2/index"));
const Chekckout = lazy(() => import("../pages/checkout/index"));
const ChekckoutPayement = lazy(() => import("../pages/checkout/checkout"));
const CheckoutDetails = lazy(() => import("../pages/checkout/details"));
const SearchPage = lazy(() => import("../pages/serach/index"));
const SuccessPaiment = lazy(() =>
  import("../pages/payment-status/succes-view")
);
const FailedPaiment = lazy(() => import("../pages/payment-status/failed-view"));
// Dashboard
const DashboardMain = lazy(() => import("../pages/dashboard/index"));
const DashboardCommandes = lazy(() => import("../pages/dashboard/commandes"));
const ViewCommandes = lazy(() => import("../pages/dashboard/viewCommandes"));
const DashboardDetails = lazy(() => import("../pages/dashboard/details"));
const DashboardWishlist = lazy(() => import("../pages/dashboard/wishlist"));
const DashboardAide = lazy(() => import("../pages/dashboard/aide"));
const DashboardCadeaux = lazy(() => import("../pages/dashboard/cadeaux"));
const DashboardParrainage = lazy(() => import("../pages/dashboard/parrainage"));
const DashboardFidelite = lazy(() => import("../pages/dashboard/fidelite"));
const DashboardBonAchats = lazy(() => import("../pages/dashboard/bon-achats"));

// Nouvelles pages
const Categories = lazy(() => import("../pages/categories"));
const Actualites = lazy(() => import("../pages/actualites"));
const ActualitesDetails = lazy(() => import("../pages/actualites/details"));
const Who = lazy(() => import("../pages/who"));
const CarteCadeau = lazy(() => import("../pages/carte-cadeau"));
const Recompense = lazy(() => import("../pages/recompense"));
const Programme = lazy(() => import("../pages/programme"));
const CollectionPrestige = lazy(() => import("../pages/collection-prestige"));
const Referentiel = lazy(() => import("../pages/referentiel"));
const Contact = lazy(() => import("../pages/contact"));
const Partenaire = lazy(() => import("../pages/partnaire"));
const Solutions = lazy(() => import("../pages/solutions"));
const Marques = lazy(() => import("../pages/marque-partenaire"));
const Glossaire = lazy(() => import("../pages/glossaire"));
const Mentions = lazy(() => import("../pages/mentions"));
const Conditions = lazy(() => import("../pages/conditions"));

export const routes = [
  {
    path: "/",
    element: (
      <LayoutTheme>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </LayoutTheme>
    ),
    children: [
      // === Anciennes routes dynamiques ===
      { element: <Index2 />, index: true },
      { element: <Index />, path: "home2" },
      { element: <Details />, path: "spa/:id" },
      { element: <SpaList />, path: "liste-des-spas" },
      { element: <ViewProduct />, path: "produit2/:slug" },
      { element: <ViewProduct2 />, path: "produit/:slug" },
      { element: <Chekckout />, path: "checkout" },
      {
        element: (
          <AuthGuard>
            <ChekckoutPayement />
          </AuthGuard>
        ),
        path: "payment",
      },
      { element: <CheckoutDetails />, path: "checkout/details" },
      { element: <SuccessPaiment />, path: "/succes" },
      { element: <FailedPaiment />, path: "/failed" },

      // === Nouvelles routes statiques ===
      // { element: <ViewProduct />, path: "spa" },
      { element: <Categories />, path: "categories/:slug" },
      { element: <Categories />, path: "categories" },
      { element: <Actualites />, path: "actualites" },
      { element: <ActualitesDetails />, path: "actualites/:slug" },
      { element: <CollectionPrestige />, path: "collection-prestige" },
      { element: <Partenaire />, path: "devenir-partenaire" },
      { element: <Glossaire />, path: "glossaire" },
      { element: <Solutions />, path: "solutions-ce" },
      { element: <Marques />, path: "marque-partenaire" },
      { element: <Who />, path: "qui-somme-nous" },
      { element: <Referentiel />, path: "referentiel-de-candidature" },
      { element: <CarteCadeau />, path: "carte-cadeau" },
      { element: <Recompense />, path: "recompense" },
      { element: <Programme />, path: "programme-de-parrainage" },
      { element: <Contact />, path: "assistance-contact" },
      { element: <Mentions />, path: "mentions-legales" },
      { element: <Conditions />, path: "conditions" },

      // === DANS LE TABLEAU `children` DE LA RACINE ===
      {
        element: <SearchPage />,
        path: "recherche/:catSlug?/:villeSlug?",
      },

      // === Dashboard ===
      {
        element: (
          <DashboardLayout>
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        ),
        path: "dashboard",
        element: (
          <AuthGuard>
            <DashboardLayout>
              <Suspense fallback={<LoadingScreen />}>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          </AuthGuard>
        ),
        children: [
          { element: <DashboardMain />, index: true },

          // Commandes protégées
          {
            path: "commandes",
            children: [
              { element: <DashboardCommandes />, index: true },
              { element: <ViewCommandes />, path: ":id/view" },
            ],
          },

          { element: <DashboardDetails />, path: "details" },
          { element: <DashboardWishlist />, path: "wishlist" },
          { element: <DashboardAide />, path: "aide" },
          { element: <DashboardCadeaux />, path: "cadeau" },
          { element: <DashboardParrainage />, path: "parrainage" },
          { element: <DashboardFidelite />, path: "fidelite" },
          { element: <DashboardBonAchats />, path: "bon-achats" },

          { path: "*", element: <DashboardMain /> },
        ],
      },
    ],
  },
];
