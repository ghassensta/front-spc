// src/lib/stripe.js
import { loadStripe } from "@stripe/stripe-js";
import { CONFIG } from "src/config-global";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(CONFIG.stripePublicKey);
  }
  return stripePromise;
};

export default getStripe;