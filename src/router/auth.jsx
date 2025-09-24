import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { GuestGuard } from "src/auth/guard/guest-guard";
import AuthLayout from "src/layouts/authLayout";

const Login = lazy(() => import("../pages/auth/login"));

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
    children: [{ element: <Login />, index: true }],
  },
];
