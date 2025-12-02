import { mutate } from "swr";
import { setSession } from "../utils/auth";
import axios, { endpoints, putter } from "src/utils/axios";

export const signInWithPassword = async ({ email, password }) => {
  try {
    const params = { email, password };

    const res = await axios.post(endpoints.auth.signIn, params);
    const { access_token } = res.data;

    if (!access_token) {
      throw new Error("Access token not found in response");
    }

    setSession(access_token);
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error;
  }
};

export const registerAccount = async ({
  name,
  referral_code,
  lastName,
  displayedName,
  email,
  password,
  password_confirmation,
}) => {
  try {
    const params = {
      name,
      lastName,
      displayedName,
      email,
      referral_code,
      password,
      password_confirmation,
    };

    const res = await axios.post(endpoints.auth.signUp, params);

    const { access_token } = res.data;

    if (!access_token) {
      throw new Error("Access token not found in registration response");
    }

    setSession(access_token);
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
    await axios.post(endpoints.auth.logout);
    await setSession(null);
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
};

export const editUser = async (data) => {
  try {
    const params = { ...data, current_password: data.password };

    const res = await putter(endpoints.auth.edit, params);

    mutate(endpoints.auth.me);

    return res;
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du profil:", error);
    throw error;
  }
};

export const forgetPassword = async (email) => {
  try {
    const emailValue = typeof email === "string" ? email : email.email;

    const params = { email: emailValue };

    const res = await axios.post(endpoints.auth.forgotPassword, params);

    console.log("✅ Réponse forgotPassword:", res.data);

    return res.data;
  } catch (error) {
    console.error("❌ Erreur complète:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    // Extraire le message d'erreur détaillé
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.errors?.email?.[0] ||
      error.message ||
      "Une erreur est survenue lors de l'envoi de l'email.";

    throw new Error(errorMessage);
  }
};

/** **************************************
 * Reset Password - Réinitialiser le mot de passe
 *************************************** */
export const resetPassword = async (data) => {
  try {
    const params = {
      token: data.token,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation || data.confirmPassword,
    };

    const res = await axios.post(endpoints.auth.resetPassword, params);

    return res.data; // Retourner la réponse pour afficher le message de succès
  } catch (error) {
    console.error(
      "❌ Erreur lors de la réinitialisation du mot de passe:",
      error
    );

    // Extraire le message d'erreur du backend
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.errors?.password?.[0] ||
      error.response?.data?.errors?.token?.[0] ||
      "Une erreur est survenue lors de la réinitialisation du mot de passe.";

    throw new Error(errorMessage);
  }
};
