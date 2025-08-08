import React from 'react'
import ButtonIcon from 'src/components/button-icon/button-icon'

export default function ProfileDetails() {
  return (
    <div className="grid grid-cols-2 gap-2 p-3">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm text-secondary">Nom</label>
          <input type="text" id="name" className="border rounded p-1" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-sm text-secondary">Prénom</label>
          <input type="text" id="lastName" className="border rounded p-1" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="displayedName" className="text-sm text-secondary">Nom affiché</label>
          <input type="text" id="displayedName" className="border rounded p-1" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm text-secondary">Adresse e-mail</label>
          <input type="email" id="email" className="border rounded p-1" />
        </div>
  
        {/* Password Fields (Full Width) */}
        <div className="col-span-2 mt-4 grid grid-cols-2 gap-2 border p-4">
          <div className="flex flex-col">
            <label htmlFor="currentPassword" className="text-sm text-secondary">Mot de passe actuel</label>
            <input type="password" id="currentPassword" className="border rounded p-1" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="newPassword" className="text-sm text-secondary">Nouveau mot de passe</label>
            <input type="password" id="newPassword" className="border rounded p-1" />
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="confirmPassword" className="text-sm text-secondary">Confirmer le mot de passe</label>
            <input type="password" id="confirmPassword" className="border rounded p-1" />
          </div>
        </div>
        <div className="col-span-2 flex justify-end">
            <button>
                <ButtonIcon title="Enregistrer"/>
            </button>
        </div>
      </div>
  )
}
