import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "react-i18next";
import { paths } from "src/router/paths";

export default function CartTable({
  items,
  couponApplied,
  subtotalTTC,
  totalDiscount,
  onDelete,
  onUpdateQuantity,
  onRemoveCoupon,
}) {
  const { t } = useTranslation();

  const getDisplayDiscount = (itemTotal) => {
    if (!couponApplied || subtotalTTC === 0) return 0;
    return (itemTotal / subtotalTTC) * totalDiscount;
  };

  const hasValidDestinataire = (item) => {
    if (!item.destinataires?.length) return false;
    return item.destinataires.some(
      (d) => (d.fullName || "").trim() !== "" || (d.email || "").trim() !== "",
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-sm text-left min-w-[700px] lg:min-w-full">
        <thead className="uppercase text-gray-700 bg-gray-50 border-b text-xs tracking-wide">
          <tr>
            {["Produit", "Destinataires", "Prix TTC", "QTE", "Total TTC", "Réduction", "Actions"].map(
              (col) => (
                <th key={col} className="py-4 px-3">
                  <TranslatedText text={col} />
                </th>
              ),
            )}
          </tr>
        </thead>

        <tbody>
          {items.length > 0 ? (
            items.map((item) => {
              const itemTotal = Number(item.price || 0) * item.quantity;
              const displayDiscount = getDisplayDiscount(itemTotal);
              const itemAfterDiscount = itemTotal - displayDiscount;

              return (
                <tr key={item.id} className="border-b">
                  {/* Produit */}
                  <td className="py-3 flex gap-2 items-start">
                    <img
                      loading="lazy"
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <Link
                      to={item.slug ? paths.product(item.slug) : "/carte-cadeau"}
                      className="hover:underline"
                    >
                      {item.name}
                    </Link>
                  </td>

                  {/* Destinataires */}
                  <td className="py-3">
                    {item.destinataires?.length > 0 ? (
                      <ul className="list-disc pl-4">
                        {item.destinataires.map((dest, i) => (
                          <li key={i}>
                            {dest.fullName && dest.email
                              ? `${dest.fullName} — ${dest.email}`
                              : t("Pas de destinataire défini → l'expéditeur recevra lui-même")}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      t("Pas de destinataire défini → l'expéditeur recevra lui-même")
                    )}
                  </td>

                  {/* Prix unitaire */}
                  <td className="py-3">{Number(item.price || 0).toFixed(2)} €</td>

                  {/* Quantité */}
                  <td className="py-3 px-2 text-center">
                    {hasValidDestinataire(item) ? (
                      <input
                        type="number"
                        readOnly
                        value={item.quantity}
                        className="w-16 text-center border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed text-gray-600"
                      />
                    ) : (
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const qty = parseInt(e.target.value.trim(), 10);
                          if (!isNaN(qty) && qty >= 1) {
                            onUpdateQuantity(item.id, qty);
                            if (couponApplied) onRemoveCoupon();
                          }
                        }}
                        className="w-16 text-center border border-gray-400 rounded-md focus:border-black focus:ring-1 focus:ring-black"
                      />
                    )}
                  </td>

                  {/* Total TTC */}
                  <td className="py-3">
                    <div className="flex flex-col">
                      <span className={displayDiscount > 0 ? "line-through text-gray-400 text-xs" : ""}>
                        {itemTotal.toFixed(2)} €
                      </span>
                      {displayDiscount > 0 && (
                        <span className="text-green-600 font-semibold">
                          {itemAfterDiscount.toFixed(2)} €
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Réduction */}
                  <td className="py-3 text-green-600 font-medium">
                    {displayDiscount > 0 ? `-${displayDiscount.toFixed(2)} €` : "-"}
                  </td>

                  {/* Actions */}
                  <td className="py-3">
                    <button
                      onClick={() => onDelete(item.id)}
                      className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-sm duration-150"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="py-6 text-center text-gray-400">
                <TranslatedText text="Votre panier est vide." />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}