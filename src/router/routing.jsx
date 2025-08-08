import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import LayoutTheme from "../layouts/layout";
import LoadingScreen from "../components/loading-screen/loading-screen";
import DashboardLayout from "src/layouts/dashboardLayout";

const Index = lazy(() => import("../pages/home/index"));
const Details = lazy(() => import("../pages/details/index"));
const ViewProduct = lazy(() => import("../pages/product/index"));
const Chekckout = lazy(() => import("../pages/checkout/index"));
const ChekckoutPayement = lazy(() => import("../pages/checkout/checkout"));
const CheckoutDetails = lazy(() => import("../pages/checkout/details"));
const DashboardMain = lazy(() => import("../pages/dashboard/index"))
const DashboardCommandes = lazy(() => import("../pages/dashboard/commandes"))
const ViewCommandes = lazy(() => import("../pages/dashboard/viewCommandes"))
const DashboardDetails = lazy(() => import("../pages/dashboard/details"))

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
      { element: <Index />, index: true },
      {
        element: <Details />,
        path: "spa",
      },
      {
        element: <ViewProduct />,
        path: "spa/:id",
      },
      {
        element: <Chekckout />,
        path: "checkout",
      },
      {
        element: <ChekckoutPayement />,
        path: "payment",
      },
      {
        element: <CheckoutDetails />,
        path: "checkout/details",
      },
      {
        element: <DashboardLayout><Outlet /></DashboardLayout>,
        path: "dashboard",
        children: [
          {
            element: <DashboardMain />,
            index: true,
          },
          {
            path: 'commandes',
            children: [
              {
                element: <DashboardCommandes />, index: true
              },
              {
                element: <ViewCommandes />,
                path: ':id/view'
              }
            ]
          },
          {
            path: 'details',
            element: <DashboardDetails />
          },
        ]
      }
    ],
  },
];
