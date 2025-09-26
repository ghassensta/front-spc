import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { registerAccount } from "src/actions/auth";
import Logo from "src/components/logo/logo";
import { useRouter } from "src/hooks";
import { paths } from "src/router/paths";

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

  // Autofill referral_code from query string
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
    setErrors((prev) => ({ ...prev, [e.target.name]: null })); // clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const promise = registerAccount(form);

    toast.promise(promise, {
      pending: "Inscription en cours...",
      success: "Compte créé avec succès !",
    //   error: "Échec de l'inscription. Vérifiez vos informations.",
    });

    try {
      await promise;
    //   router.push(paths.dashboard.root);
    router.refresh()
    } catch (error) {
      console.error("Error during registration:", error);
        if (error?.message){
            toast.error(error.message)
        }
      if (error?.errors) {
        setErrors(error.errors); // Laravel errors (mapped by field)
      }
    }
  };

  // helper to render error under input
  const renderError = (field) =>
    errors[field] ? (
      <p className="absolute text-xs text-red-500 mt-1">{errors[field][0]}</p>
    ) : null;

  return (
    <div className="font-tahoma">
      <div className="flex items-center w-full justify-center mb-4">
        <Link to={paths.main}>
          <Logo />
        </Link>
      </div>
      <h1 className="text-xl font-semibold text-center mb-6">Inscription</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="relative">
            <label htmlFor="name" className="text-sm text-gray-600">
              Prénom *
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

          {/* Last name */}
          <div className="relative">
            <label htmlFor="lastName" className="text-sm text-gray-600">
              Nom
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

          {/* Displayed name */}
          <div className="relative">
            <label htmlFor="displayedName" className="text-sm text-gray-600">
              Nom affiché
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

          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="text-sm text-gray-600">
              Email *
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

          {/* Referral code */}
          <div className="col-span-2 relative">
            <label htmlFor="referral_code" className="text-sm text-gray-600">
              Code
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

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="text-sm text-gray-600">
              Mot de passe *
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

          {/* Confirm Password */}
          <div className="relative">
            <label
              htmlFor="password_confirmation"
              className="text-sm text-gray-600"
            >
              Confirmer le mot de passe *
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
          S'inscrire
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">
        Vous avez déjà un compte ?{" "}
        <Link to={paths.auth.root} className="text-blue-500 hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
