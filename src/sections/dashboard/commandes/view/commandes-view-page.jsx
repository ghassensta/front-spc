import React from 'react'
import { useCheckoutContext } from 'src/sections/checkout/context'

export default function CommandesViewPage() {
    const checkout = useCheckoutContext()
  return (
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
                {checkout.items.map(item => (  
                  <tr key={item.id} className="border-t">  
                    <td className="border p-2">{item.name}</td>  
                    <td className="border p-2">{item.quantity}</td>  
                    <td className="border p-2">{(item.price * item.quantity).toFixed(2)} €</td>  
                  </tr>  
                ))}  
              </tbody>  
            </table>  
            {/* Totals under the table */}  
            <div className="mt-4 border-t pt-2">  
              <div className="flex justify-between">  
                <span>Sous-total :</span>  
                <span>{checkout.subtotal.toFixed(2)} €</span>  
              </div>  
              <div className="flex justify-between">  
                <span>Frais de livraison :</span>  
                <span>{checkout.shipping.toFixed(2)} €</span>  
              </div>  
              {checkout.discount > 0 && (  
                <div className="flex justify-between">  
                  <span>Remise :</span>  
                  <span>-{checkout.discount.toFixed(2)} €</span>  
                </div>  
              )}  
              <div className="flex justify-between font-bold">  
                <span>Total :</span>  
                <span>{checkout.total.toFixed(2)} €</span>  
              </div>  
            </div>  
          </div>  

          {/* Expediteur Information - Right Column */}  
          <div className="border p-4">  
            <h3 className="font-bold text-xl">Expéditeur</h3>  
            <div className="mt-2">  
              <div>{checkout.expediteur.fullName}</div>  
              <div>{checkout.expediteur.address}</div>  
              {checkout.expediteur.address2 && <div>{checkout.expediteur.address2}</div>}  
              <div>{checkout.expediteur.city}</div>  
              <div>{checkout.expediteur.state}</div>  
              <div>{checkout.expediteur.postalCode}</div>  
              <div>{checkout.expediteur.country}</div>  
              <div>{checkout.expediteur.phone}</div>  
            </div>  
            <div className="mt-4">  
              <span>{checkout.expediteur.email}</span>  
            </div>  
          </div>  
        </div>
  )
}
