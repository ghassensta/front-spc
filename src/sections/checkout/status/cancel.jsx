import React from "react";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { paths } from "src/router/paths";

const buttonStyle = "w-auto mx-auto mt-4 px-4 py-3 bg-black leading-4 rounded-2xl text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma flex items-center justify-center gap-2";

export default function PaymentCancelled() {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center font-tahoma">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="ml-3">
            <h2 className="text-2xl font-bold text-red-700">Paiement annulé</h2>
            <p className="mt-2 text-red-600">Votre paiement a été annulé. Aucun montant n'a été débité.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <p className="text-gray-600">
          Si vous souhaitez réessayer votre achat, vous pouvez retourner à votre panier.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to={paths.checkout} className={`${buttonStyle}`}>
            <FaShoppingCart /> Panier
          </Link>
          
          <Link to={paths.main} className={buttonStyle}>
            <FaHome /> Accueil
          </Link>
          
          <Link to={paths.dashboard.root} className={buttonStyle}>
            <MdDashboard /> Tableau de bord
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Besoin d'aide ? <a href={`mailto:contact@ecom-fr.com`} className="text-primary hover:underline">Contactez notre service client</a>
          </p>
        </div>
      </div>
    </div>
  );
}
