import { setSession } from "../utils/auth";
import axios, { endpoints } from "src/utils/axios";

export const signInWithPassword = async ({ email, password }) => {
  try {
    const params = { email, password };

    const res = await axios.post(endpoints.auth.signIn, params);
    console.log(res);
    const { token } = res.data;

    if (!token) {
      throw new Error("Access token not found in response");
    }

    setSession(token);
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error;
  }
};

export const registerAccount = async ({
  email,
  first_name,
  last_name,
  company,
  country,
  street_number,
  apartment,
  zip,
  city,
  phone,
}) => {
  try {
    const params = {
      email,
      first_name,
      last_name,
      company,
      country,
      street_number,
      apartment,
      zip,
      city,
      phone,
    };

    const res = await axios.post(endpoints.auth.signUp, params);
    console.log("Registration success:", res);

    const { token } = res.data;

    if (!token) {
      throw new Error("Access token not found in registration response");
    }

    setSession(token);
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
