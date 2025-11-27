import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { GuestGuard } from "src/auth/guard/guest-guard";
import AuthLayout from "src/layouts/authLayout";

const Login = lazy(() => import("../pages/auth/login"));
const Register = lazy(() => import("../pages/auth/register"));
const Forgot = lazy(() => import("../pages/auth/forgot"))
const Reset = lazy(() => import("../pages/auth/reset"))

export const authRoutes = [
  {
    path: "/auth",
    element: (
      <GuestGuard>
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      </GuestGuard>
    ),
    children: [
      { element: <Login />, index: true },
      { element: <Register />, path: "register" },
      { element: <Forgot />, path: "forget-password"},
      { element: <Reset />, path: "reset-password"}
    ],
  },
];
