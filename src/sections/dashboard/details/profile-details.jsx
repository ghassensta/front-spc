import React, { useState } from "react";
import { toast } from "react-toastify";
import { editUser } from "src/actions/auth";
import { useAuthContext } from "src/auth/hooks/use-auth-context";

export default function ProfileDetails() {
  const { user, checkUserSession } = useAuthContext();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    displayedName: user?.displayedName || "",
    email: user?.email || "",
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
    date_naissance: user?.date_naissance || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Le nom est requis");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("L’adresse e-mail est requise");
      return;
    }

    const isChangingPassword =
      formData.current_password ||
      formData.new_password ||
      formData.new_password_confirmation;

    if (isChangingPassword) {
      if (
        !formData.current_password ||
        !formData.new_password ||
        !formData.new_password_confirmation
      ) {
        toast.error("Veuillez remplir tous les champs de mot de passe");
        return;
      }

      if (formData.new_password.length < 8) {
        toast.error(
          "Le nouveau mot de passe doit contenir au moins 8 caractères"
        );
        return;
      }

      if (formData.new_password !== formData.new_password_confirmation) {
        toast.error("Les nouveaux mots de passe ne correspondent pas");
        return;
      }
    }

    // ✅ Envoi de la requête
    const promise = editUser(formData);

    toast.promise(promise, {
      pending: "Mise à jour en cours...",
      success: "Profil mis à jour avec succès !",
      error: "Erreur lors de la mise à jour",
    });

    try {
      await promise;
      checkUserSession?.();

      // Réinitialiser uniquement les champs de mot de passe
      setFormData((prev) => ({
        ...prev,
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      }));
    } catch (err) {
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      {}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm text-secondary">
          Nom
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border rounded p-1"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      {}
      <div className="flex flex-col">
        <label htmlFor="lastName" className="text-sm text-secondary">
          Prénom
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="border rounded p-1"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      {}
      <div className="flex flex-col">
        <label htmlFor="displayedName" className="text-sm text-secondary">
          Nom affiché
        </label>
        <input
          type="text"
          id="displayedName"
          name="displayedName"
          className="border rounded p-1"
          value={formData.displayedName}
          onChange={handleChange}
        />
      </div>

      {}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm text-secondary">
          Adresse e-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border rounded p-1"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col w-full">
        <label htmlFor="dateNaissance" className="text-sm text-secondary">
          Date de naissance
        </label>
        <input
          type="date"
          id="dateNaissance"
          name="date_naissance"
          className="border rounded p-1"
          value={
            formData.date_naissance
              ? new Date(formData.date_naissance).toISOString().split("T")[0]
              : ""
          }
          onChange={handleChange}
          disabled={!!user?.date_naissance}
        />
        {user?.date_naissance && (
          <small className="text-xs text-gray-500 mt-1">
            La date de naissance ne peut pas être modifiée.
          </small>
        )}
      </div>

      {}
      <div className="col-span-2 mt-4 grid grid-cols-2 gap-2 border p-4">
        <div className="flex flex-col col-span-2 md:col-span-1">
          <label htmlFor="currentPassword" className="text-sm text-secondary">
            Mot de passe actuel
          </label>
          <input
            type="password"
            name="current_password"
            id="currentPassword"
            className="border rounded p-1"
            value={formData.current_password}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col col-span-2 md:col-span-1">
          <label htmlFor="newPassword" className="text-sm text-secondary">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            id="newPassword"
            name="new_password"
            className="border rounded p-1"
            value={formData.new_password}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="confirmPassword" className="text-sm text-secondary">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="new_password_confirmation"
            className="border rounded p-1"
            value={formData.new_password_confirmation}
            onChange={handleChange}
          />
        </div>
      </div>

      {}
      <div className="col-span-2 flex justify-end">
        <button
          type="button"
          className="inline-flex font-tahoma rounded-full items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-[#B6B499] hover:bg-black text-white"
          onClick={handleSubmit}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
