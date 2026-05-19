import React from "react";
import { paths } from "src/router/paths";
import ButtonLink from "src/components/button-link/ButtonLink";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow-md">
        {children}
        <div className="flex justify-center mt-0">
          <ButtonLink
            to={paths.main}
            text="Accueil"
          />
        </div>
      </div>
    </div>
  );
}
