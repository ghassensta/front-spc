import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "react-i18next";

// ── Styles partagés (= ButtonLink design system) ──────────────────────
const baseBtn =
  "w-full sm:w-auto px-4 py-2 uppercase text-sm font-normal tracking-widest rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

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
        <TranslatedText text="Ajouter un code promo" />
      </h2>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          className="flex-1 border rounded-md p-2 w-full"
          placeholder={t("Saisissez votre code promo")}
          value={couponCode}
          onChange={(e) => onCodeChange(e.target.value.toUpperCase())}
          disabled={couponApplied || couponLoading}
        />

        {couponApplied ? (
          /* TERTIARY — gris → hover gris moyen */
          <button
            onClick={onRemove}
            className={baseBtn}
            style={{ backgroundColor: "#F5F5F5", color: "#444444" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#E5E5E5")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#F5F5F5")
            }
          >
            <TranslatedText text="Supprimer" />
          </button>
        ) : (
          /* PRIMARY — noir → hover doré */
          <button
            onClick={onApply}
            disabled={couponLoading || !couponCode}
            className={baseBtn}
            style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}
            onMouseEnter={(e) => {
              if (!couponLoading && couponCode)
                e.currentTarget.style.backgroundColor = "#b8955a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1a1a1a";
            }}
          >
            {couponLoading ? (
              t("Validation...")
            ) : (
              <TranslatedText text="Appliquer" />
            )}
          </button>
        )}
      </div>

      {couponApplied && couponData && (
        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
          ✓ <TranslatedText text="Code" />{" "}
          <strong>{couponData.code}</strong>{" "}
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
        <label
          htmlFor="newsletter"
          className="text-sm text-gray-600 cursor-pointer"
        >
          <TranslatedText text="Inscription à la newsletter" />
        </label>
      </div>
    </div>
  );
}