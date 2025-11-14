import React from 'react'
import { useCheckoutContext } from 'src/sections/checkout/context'

export default function CommandesViewPage({ order }) {
    const checkout = useCheckoutContext()

   // console.log(order)
  return (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">  
          {/* Items List - Left Column */}  
          <div className="border p-4 col-span-3">  
            <h4 className="mt-4 font-semibold text-xl">Articles commandés :</h4>  
            <table className="w-full mt-2 border-collapse">  
              <thead>  
                <tr>  
                  <th className="border p-2 text-left">Produit</th>  
                  <th className="border p-2 text-left">Quantité</th>  
                  <th className="border p-2 text-left">Prix (TTC)</th>  
                </tr>  
              </thead>  
              <tbody>  
                {order?.lignes.map(item => (  
                  <tr key={item.id} className="border-t">  
                    <td className="border p-2">{item.produit?.nom || item.produit}</td>  
                    <td className="border p-2">{item.quantite}</td>  
                    <td className="border p-2">{parseFloat(item.prix_unitaire).toFixed(2)} €</td>  
                  </tr>  
                ))}  
              </tbody>  
            </table>  
            {/* Totals under the table */}  
            <div className="mt-4 border-t pt-2">  
              <div className="flex justify-between">  
                <span>Sous-total (HT) :</span>  
                <span>{order?.total_ht.toFixed(2)} €</span>  
              </div>  
              <div className="flex justify-between">  
                <span>TAX (20%) :</span>  
                <span>{order?.taxe.toFixed(2)} €</span>  
              </div>  
              {order?.discount > 0 && (  
                <div className="flex justify-between">  
                  <span>Remise :</span>  
                  <span>-{order?.discount.toFixed(2)} €</span>  
                </div>  
              )}  
              <div className="flex justify-between font-bold">  
                <span>Total (TTC) :</span>  
                <span>{order?.total_ttc.toFixed(2)} €</span>  
              </div>  
            </div>  
          </div>  

          {/* Expediteur Information - Right Column */}  
         
        </div>
  )
}
