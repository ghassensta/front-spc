import React from 'react'
import { Link } from 'react-router-dom'
import ButtonIcon from 'src/components/button-icon/button-icon'

export default function LoginPageView() {
  return (
    <>
        <div className="font-tahoma">
            <h1 className="text-xl font-semibold text-center mb-6">Connexion</h1>
                  <form className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="text-sm text-gray-600">Email</label>
              <input type="email" id="email" className="w-full border rounded p-2" required />
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-gray-600">Mot de passe</label>
              <input type="password" id="password" className="w-full border rounded p-2" required />
            </div>
            <button
              type="submit"
            >
              <ButtonIcon sx='w-full text-center flex justify-center' title="Se Connecter" />
            </button>
            {/* <p className="text-center text-sm mt-4">
              Pas de compte ?{" "}
              <Link to="/register" className="text-secondary hover:underline">
                Créer un compte
              </Link>
            </p> */}
                  </form>
        </div>
    </>
  )
}
