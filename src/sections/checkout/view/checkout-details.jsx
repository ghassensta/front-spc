import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";
import { useCheckoutContext } from "../context";

export default function CheckoutDetails() {
  const checkout = useCheckoutContext();
  const [ checkoutBackup, setCheckoutBackup] = useState(null);

  useEffect(() => {
    setCheckoutBackup(checkout);

   
  }, [])
   if(checkoutBackup){
      checkout.onReset()
    }
  return (
    <>
      <div className="max-w-6xl m-auto font-tahoma">
        <div className="flex justify-between items-start flex-col lg:flex-row">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <h2 className="text-2xl font-bold">Commande #777676</h2>
              <div className="flex gap-2">
                <div className="bg-secondary text-primary rounded px-2 leading-4 py-1 text-xs">
                  {checkoutBackup?.total.toFixed(2)} € {/* Display total */}
                </div>
                
              </div>
            </div>
            <div className="text-xs text-gray-500">
              <span>{new Date().toLocaleDateString()}</span> -{" "}
              <span>contact@ecom-fr.com</span>
            </div>
          </div>
          <div className="flex gap-2">
            <ButtonIcon
              title="Renvoyer l'e-mail de la carte-cadeau"
              variant="outlined"
              size="sm"
            />
            <ButtonIcon
              title="Mon Tableau de bord"
              icon={<MdDashboard />}
              link={paths.dashboard.root}
              variant=""
              size="sm"
            />
            <ButtonIcon
              sx="text-lg"
              icon={<FaHome />}
              variant="link"
              link={paths.main}
              size="sm"
            />
          </div>
        </div>

        {/* Summary and Items Section */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Items List - Left Column */}
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
                {checkoutBackup?.items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">
                      {(parseFloat(item.price || 0) * item.quantity).toFixed(2)}{" "}
                      €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Totals under the table */}
            <div className="mt-4 border-t pt-2">
              <div className="flex justify-between">
                <span>Sous-total :</span>
                <span>{checkoutBackup?.subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison :</span>
                <span>{checkoutBackup?.shipping.toFixed(2)} €</span>
              </div>
              {checkoutBackup?.discount > 0 && (
                <div className="flex justify-between">
                  <span>Remise :</span>
                  <span>-{checkoutBackup?.discount.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between font-bold">
                <span>Total :</span>
                <span>{checkoutBackup?.total.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Expediteur Information - Right Column */}
          <div className="border p-4">
            <h3 className="font-bold text-xl">Expéditeur</h3>
            <div className="mt-2">
              <div>{checkoutBackup?.expediteur.fullName}</div>
              <div>{checkoutBackup?.expediteur.address}</div>
              {checkoutBackup?.expediteur.address2 && (
                <div>{checkoutBackup?.expediteur.address2}</div>
              )}
              <div>{checkoutBackup?.expediteur.city}</div>
              <div>{checkoutBackup?.expediteur.state}</div>
              <div>{checkoutBackup?.expediteur.postalCode}</div>
              <div>{checkoutBackup?.expediteur.country}</div>
              <div>{checkoutBackup?.expediteur.phone}</div>
            </div>
            <div className="mt-4">
              <span>{checkoutBackup?.expediteur.email}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
