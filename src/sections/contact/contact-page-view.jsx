import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function ContactPageView() {
  return (
    <div className="w-screen relative left-[calc(-50vw+50%)]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        
        {/* Left section - Contact info with background image */}
        <div
          className="flex flex-col justify-center px-10 py-16 relative text-white bg-center bg-cover"
          style={{
            backgroundImage: "url('https://spa-prestige-collection.com/wp-content/uploads/2025/02/SPC-Massage-1975x1318-02.jpg')", // <-- change to your actual image path
          }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Content */}
          <div className="mx-auto relative z-10">
            <h1 className="text-4xl font-serif mb-4">Contactez nous</h1>
            <p className="mb-2 font-bricolage">
              Nous serions ravis de vous parler.
              <br />
              N’hésitez pas à nous contacter en utilisant les coordonnées ci-dessous.
            </p>
            <div className="mt-6 font-bricolage text-xl">
              <div className="flex items-center mb-4">
                <span className="mr-3 text-xl">
                  <FaPhoneAlt />
                </span>
                <p className="font-semibold">+33 (0)1 82 35 01 26</p>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-xl">
                  <MdEmail />
                </span>
                <p className="font-semibold">
                  contact@spa-prestige-collection.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right section - Contact form */}
        <div className="bg-white px-10 py-16">
          <h2 className="text-2xl font-serif mb-2 text-center">
            Demande d'informations
          </h2>
          <p className="mb-6 text-center font-bricolage">
            Vous souhaitez un renseignement, n’hésitez pas à remplir le formulaire suivant :
          </p>

          <form className="space-y-4 font-bricolage max-w-[40em] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nom*" className="border p-2 w-full" />
              <input type="text" placeholder="Prénom" className="border p-2 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="email" placeholder="Email*" className="border p-2 w-full" />
              <input type="text" placeholder="Téléphone" className="border p-2 w-full" />
            </div>
            <input type="text" placeholder="Sujet" className="border p-2 w-full" />
            <textarea placeholder="Message*" rows="4" className="border p-2 w-full"></textarea>

            <div className="flex flex-col items-center gap-3">
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 uppercase tracking-wider hover:bg-gray-800 max-w-max"
              >
                Envoyer
              </button>
              <button
                type="button"
                className="bg-[#c4c0a1] text-white px-6 py-2 uppercase tracking-wider hover:opacity-90 max-w-max"
              >
                Accueil
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}