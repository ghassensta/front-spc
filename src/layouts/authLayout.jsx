import React from "react";
import { Link } from "react-router-dom";
import { paths } from "src/router/paths";
import { TranslatedText } from "src/components/translated-text/translated-text";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow-md">
        {children}
        <div className="flex justify-center mt-10">
          <Link to={paths.main} className="bg-[#B6B498] text-white rounded-full py-2 px-6 hover:bg-black duration-300 font-roboto">
            <TranslatedText text="Accueil" />
          </Link>
        </div>
      </div>
    </div>
  );
}
