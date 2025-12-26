import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { registerAccount } from "src/actions/auth";
import Logo from "src/components/logo/logo";
import { useRouter } from "src/hooks";
import { paths } from "src/router/paths";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "react-i18next";

export default function RegisterPageView({ code }) {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    displayedName: "",
    referral_code: code || "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const referralCode = params.get("code");
    if (referralCode) {
      setForm((prev) => ({ ...prev, referral_code: referralCode }));
    }
  }, [location]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const promise = registerAccount(form);

    toast.promise(promise, {
      pending: t("Inscription en cours..."),
      success: t("Compte créé avec succès !"),
    });

    try {
      await promise;
      router.refresh();
    } catch (error) {
      if (error?.message) {
        toast.error(t(error.message));
      }
      if (error?.errors) {
        setErrors(error.errors);
      }
    }
  };

  const renderError = (field) =>
    errors[field] ? (
      <p className="absolute text-xs text-red-500 mt-1">{errors[field][0]}</p>
    ) : null;

  return (
    <div className="font-tahoma max-w-lg mx-auto p-4">
      <div className="flex items-center w-full justify-center mb-4">
        <Link to={paths.main}>
          <Logo />
        </Link>
      </div>
      <h1 className="text-xl font-semibold text-center mb-6">
        <TranslatedText text="Créer un compte pour laisser un avis" />
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="name" className="text-sm text-gray-600">
              <TranslatedText text="Prénom *" />
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border rounded p-2"
              required
              value={form.name}
              onChange={handleChange}
            />
            {renderError("name")}
          </div>

          <div className="relative">
            <label htmlFor="lastName" className="text-sm text-gray-600">
              <TranslatedText text="Nom" />
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full border rounded p-2"
              value={form.lastName}
              onChange={handleChange}
            />
            {renderError("lastName")}
          </div>

          <div className="relative">
            <label htmlFor="displayedName" className="text-sm text-gray-600">
              <TranslatedText text="Nom affiché" />
            </label>
            <input
              type="text"
              id="displayedName"
              name="displayedName"
              className="w-full border rounded p-2"
              value={form.displayedName}
              onChange={handleChange}
            />
            {renderError("displayedName")}
          </div>

          <div className="relative">
            <label htmlFor="email" className="text-sm text-gray-600">
              <TranslatedText text="Email *" />
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded p-2"
              required
              value={form.email}
              onChange={handleChange}
            />
            {renderError("email")}
          </div>

          <div className="col-span-1 md:col-span-2 relative">
            <label htmlFor="referral_code" className="text-sm text-gray-600">
              <TranslatedText text="Code de parrainage" />
            </label>
            <input
              disabled={!!code}
              type="text"
              id="referral_code"
              name="referral_code"
              className="w-full border rounded p-2 disabled:bg-gray-100"
              value={form.referral_code}
              onChange={handleChange}
            />
            {renderError("referral_code")}
          </div>

          <div className="relative">
            <label htmlFor="password" className="text-sm text-gray-600">
              <TranslatedText text="Mot de passe *" />
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded p-2"
              required
              value={form.password}
              onChange={handleChange}
            />
            {renderError("password")}
          </div>

          <div className="relative">
            <label htmlFor="password_confirmation" className="text-sm text-gray-600">
              <TranslatedText text="Confirmer le mot de passe *" />
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              className="w-full border rounded p-2"
              required
              value={form.password_confirmation}
              onChange={handleChange}
            />
            {renderError("password_confirmation")}
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          <TranslatedText text="S'inscrire" />
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">
        <TranslatedText text="Vous avez déjà un compte ?" />{" "}
        <Link to={paths.auth.root} className="text-[#B6B499] hover:underline">
          <TranslatedText text="Se connecter" />
        </Link>
      </p>
    </div>
  );
}
