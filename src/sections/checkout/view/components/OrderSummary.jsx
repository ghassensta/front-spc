import { TranslatedText } from "src/components/translated-text/translated-text";

export default function OrderSummary({ subtotalHT, tax, totalDiscount, grandTotal }) {
  return (
    <div className="flex flex-col items-end mt-6 space-y-1 text-sm font-medium">
      <div>
        <TranslatedText text="Sous-total HT" /> : {subtotalHT.toFixed(2)} €
      </div>
      <div>
        <TranslatedText text="Taxe 20 %" /> : {tax.toFixed(2)} €
      </div>
      {totalDiscount > 0 && (
        <div className="text-green-600 font-semibold">
          <TranslatedText text="Réduction" /> : -{totalDiscount.toFixed(2)} €
        </div>
      )}
      <div className="text-base font-bold border-t pt-2 mt-2 w-48">
        <TranslatedText text="Total TTC" /> : {grandTotal.toFixed(2)} €
      </div>
    </div>
  );
}