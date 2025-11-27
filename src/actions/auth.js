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
    // toast.error("Une erreur est survenue lors de la mise à jour.");
    throw error;
  }
};


export const forgetPassword = async (data) => {
  try {
    const params = { email: data.email };

    await axios.post(endpoints.auth.forgetPassword, params);
  } catch (error) {
    console.error("Error during forget password:", error);
    throw error;
  }

}


export const resetPassword = async (data) => {
  try {
    const params = {
      token: data.token,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
    };

    const res = await axios.post(endpoints.auth.resetPassword, params);

    return res;
  } catch (error) {
    console.error("❌ Erreur lors de la réinitialisation du mot de passe:", error);
    throw error;
  }
};
