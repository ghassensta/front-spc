import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "react-i18next";

export default function CouponSection({
  couponCode,
  couponApplied,
  couponLoading,
  couponData,
  expediteurNewsletter,
  onCodeChange,
  onApply,
  onRemove,
  onNewsletterChange,
}) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-md p-4 md:p-6 shadow">
      <h2 className="text-base font-semibold mb-3 md:mb-4">
        <TranslatedText text="Code Promo" />
      </h2>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          className="flex-1 border rounded-md p-2 w-full"
          placeholder={t("Entrez votre code coupon")}
          value={couponCode}
          onChange={(e) => onCodeChange(e.target.value.toUpperCase())}
          disabled={couponApplied || couponLoading}
        />

        {couponApplied ? (
          <button
            onClick={onRemove}
            className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            <TranslatedText text="Supprimer" />
          </button>
        ) : (
          <button
            onClick={onApply}
            disabled={couponLoading || !couponCode}
            className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {couponLoading ? t("Validation...") : <TranslatedText text="Appliquer" />}
          </button>
        )}
      </div>

      {couponApplied && couponData && (
        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
          ✓ <TranslatedText text="Code" /> <strong>{couponData.code}</strong>{" "}
          <TranslatedText text="appliqué" />
        </div>
      )}

      <div className="flex items-center gap-3 mt-4">
        <input
          type="checkbox"
          id="newsletter"
          checked={expediteurNewsletter}
          onChange={(e) => onNewsletterChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
        />
        <label htmlFor="newsletter" className="text-sm text-gray-600 cursor-pointer">
          <TranslatedText text="Inscription à la newsletter" />
        </label>
      </div>
    </div>
  );
}