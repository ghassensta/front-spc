import React, { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";

export default function CheckoutDetails({ checkout }) {
  useEffect(() => {
    localStorage.removeItem("app-checkout");
    checkout.resetCheckout?.();
  }, [checkout]);

  if (!checkout)
    return <div className="text-center mt-10">Aucune commande disponible.</div>;

  const {
    id,
    nbcmd,
    items = [],
    subtotal = 0,
    shipping = 0,
    discount = 0,
    credits,
    total = 0,
    date,
    expediteur = {},
  } = checkout;

  //

  localStorage.removeItem("app-checkout");
  checkout.resetCheckout?.();
  return (
    <div className="max-w-6xl m-auto font-tahoma px-2">
      {}
      <div className="flex justify-between items-start flex-col lg:flex-row">
        <div className="flex flex-col">
          <div className="flex gap-4 items-center">
            <h2 className="text-2xl font-bold text-wrap">
              Commande{Array.isArray(nbcmd) && nbcmd.length > 1 ? "s" : ""}
              {Array.isArray(nbcmd)
                ? nbcmd.map((item, index) => (
                    <>
                      {index > 0 ? ", #" : " #"}
                      {item.slice("CMD")}
                    </>
                  ))
                : ` #${nbcmd.slice("CMD")}`}
            </h2>
            <div className="flex gap-2">
              <div className="bg-secondary text-nowrap text-primary rounded px-2 leading-4 py-1 text-xs">
                {parseFloat(total).toFixed(2)} €
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            <span>{date ? new Date(date).toLocaleDateString() : "-"}</span> -{" "}
            <span>{expediteur.email || "-"}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-2 lg:mt-0">
          <ButtonIcon
            title="Mon Tableau de bord"
            icon={<MdDashboard />}
            link={paths.dashboard.root}
            size="sm"
          />
          <ButtonIcon
            sx="text-lg"
            icon={<FaHome />}
            variant="link"
            link={paths.main}
            size="lg"
          />
        </div>
      </div>

      {}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="border p-4 col-span-2">
          <h4 className="mt-4 font-semibold text-xl">Articles commandés :</h4>
          <table className="w-full mt-2 border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-left">Produit</th>
                <th className="border p-2 text-left">Quantité</th>
                <th className="border p-2 text-left">Prix</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.id || item.name}>
                    <td className="border p-2">{item.name || "-"}</td>
                    <td className="border p-2">{item.quantity || 0}</td>
                    <td className="border p-2">
                      {(
                        parseFloat(item.price || 0) * (item.quantity || 1)
                      ).toFixed(2)}{" "}
                      €
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center p-2">
                    Aucun article
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {}
          <div className="mt-4 border-t pt-2">
            <div className="flex justify-between">
              <span>Sous Total:</span>
              <span>{parseFloat(subtotal).toFixed(2)} €</span>
            </div>
            {credits > 0 && (
              <div className="flex justify-between">
                <span>Remise :</span>
                <span>-{parseFloat(credits).toFixed(2)} €</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Total:</span>
              <span>{parseFloat(total).toFixed(2)} €</span>
            </div>
          </div>
        </div>

        {}
        <div className="border p-4">
          {expediteur.fullName || expediteur.nom ? (
            <>
              <h3 className="font-bold text-xl">Expéditeur</h3>
              <div className="mt-2 space-y-1">
                <div>{expediteur.fullName || expediteur.nom}</div>
                {expediteur.address && <div>{expediteur.address}</div>}
                {expediteur.address2 && <div>{expediteur.address2}</div>}
                {expediteur.city && <div>{expediteur.city}</div>}
                {expediteur.state && <div>{expediteur.state}</div>}
                {expediteur.postalCode && <div>{expediteur.postalCode}</div>}
                {expediteur.country && <div>{expediteur.country}</div>}
                {expediteur.phone && <div>{expediteur.phone}</div>}
              </div>
              <div className="mt-4">
                <span>{expediteur.email || "-"}</span>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
