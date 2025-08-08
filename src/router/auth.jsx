import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import AuthLayout from "src/layouts/authLayout";

const Login = lazy(() => import("../pages/auth/login"));


export const authRoutes = [
    {
        path: "/auth",
        element:(<AuthLayout><Outlet /></AuthLayout>),
        children: [
            { element: <Login />, index: true}
        ]
    }
]