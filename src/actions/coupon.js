import { endpoints, poster } from "src/utils/axios";
import { mutate } from "swr";

export const useValidateCoupon = () => {
  return async (code, total_ttc) => {
    try {
      const url = endpoints.coupons.validate;

      const params = { code, total_ttc }; // plus besoin de 'items'
      const res = await poster(url, params);

      mutate(endpoints.coupons.validate); // actualiser le cache SWR
      return res;
    } catch (error) {
      console.error("Erreur lors de la validation du coupon:", error);
      throw error;
    }
  };
};
