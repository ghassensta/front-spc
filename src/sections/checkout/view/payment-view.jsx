import React, { useState } from 'react';
import { useCheckoutContext } from '../context';
import { Link } from 'react-router-dom';
import { paths } from 'src/router/paths';
import ButtonIcon from 'src/components/button-icon/button-icon';
import { FaChevronLeft } from 'react-icons/fa';

export default function PaymentView() {
    const checkout = useCheckoutContext();
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="container font-tahoma mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Side - Form */}
      <div className="col-span-2 space-y-6">
        
        {/* Contact Info */}
        <div className="bg-white rounded-md p-6 shadow">
          <h2 className="text-base font-semibold mb-4">Coordonnées</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Adresse e-mail</label>
            <input
              type="email"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="contact@example.com"
              value={checkout.expediteur.email}
              onChange={(e)=>checkout.onCreateExpediteur({...checkout.expediteur, email: e.target.value})}
            />
          </div>
        </div>

        {/* Billing Address */}
        <div className="bg-white rounded-md p-6 shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold">Adresse de facturation</h2>
            <button 
              onClick={() => setIsEditingAddress(!isEditingAddress)}
            >
              <ButtonIcon size='sm' title={isEditingAddress ? 'Terminer' : 'Modifier'} />
            </button>
          </div>

          {!isEditingAddress ? (
            // Show address summary
            <div className="space-y-1 text-sm">
              <p>{checkout.expediteur.fullName}</p>
              <p>{checkout.expediteur.address}</p>
              {checkout.expediteur.address2 && <p>{checkout.expediteur.address2}</p>}
              <p>{checkout.expediteur.city} {checkout.expediteur.state} {checkout.expediteur.postalCode}</p>
              <p>{checkout.expediteur.country}</p>
              {checkout.expediteur.phone && <p>Téléphone : {checkout.expediteur.phone}</p>}
            </div>
          ) : (
            // Show address form
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium">Nom complet</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={checkout.expediteur.fullName}
                  onChange={(e) => checkout.onCreateExpediteur({ ...checkout.expediteur, fullName: e.target.value })}
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Adresse</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={checkout.expediteur.address}
                  onChange={(e) => checkout.onCreateExpediteur({ ...checkout.expediteur, address: e.target.value })}
                  placeholder="15 rue Jean Maridor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Complément d'adresse</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={checkout.expediteur.address2 || ''}
                  onChange={(e) => checkout.onCreateExpediteur({ ...checkout.expediteur, address2: e.target.value })}
                  placeholder="Appartement, étage, etc."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Ville</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={checkout.expediteur.city}
                    onChange={(e) => checkout.onCreateExpediteur({ ...checkout.expediteur, city: e.target.value })}
                    placeholder="Paris"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">État / Province</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={checkout.expediteur.state}
                    onChange={(e) => checkout.onCreateExpediteur({ ...checkout.expediteur, state: e.target.value })}
                    placeholder="Île-de-France"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Code postal</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={checkout.expediteur.postalCode}
                    onChange={(e) => checkout.onCreateExpediteur({ ...checkout.expediteur, postalCode: e.target.value })}
                    placeholder="75015"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Pays</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={checkout.expediteur.country}
                    onChange={(e) => checkout.onCreateExpediteur({ ...checkout.expediteur, country: e.target.value })}
                    placeholder="France"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Téléphone</label>
                <input
                  type="tel"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={checkout.expediteur.phone}
                  onChange={(e) => checkout.onCreateExpediteur({ ...checkout.expediteur, phone: e.target.value })}
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>
          )}
        </div>

        {/* Payment Options */}
        <div className="bg-white rounded-md p-6 shadow">
  <h2 className="text-base font-semibold mb-4">Options de paiement</h2>
  <div className="space-y-4">
    {/* Cash Option */}
    <div className="flex items-center">
      <input
        type="radio"
        name="payment"
        value="cash"
        className="mr-2"
        checked={paymentMethod === 'cash'}
        onChange={() => setPaymentMethod('cash')}
      />
      <span>Payer en espèces à la livraison</span>
    </div>
    {/* Card Option */}
    <div className="flex items-center">
      <input
        type="radio"
        name="payment"
        value="card"
        className="mr-2"
        checked={paymentMethod === 'card'}
        onChange={() => setPaymentMethod('card')}
      />
      <span>Carte de crédit / débit</span>
    </div>

    

    {/* Card Form - only show if card is selected */}
    {paymentMethod === 'card' && (
      <div className="space-y-2 mt-4">
        <div>
          <label className="block text-sm font-medium">Numéro de carte</label>
          <input
            type="text"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Date d'expiration</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="MM/AA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Code de sécurité</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="CVC"
            />
          </div>
        </div>

        <div className="flex items-center mt-4">
          <input type="checkbox" className="mr-2" />
          <span>Enregistrer les informations de paiement pour mes prochains achats</span>
        </div>
      </div>
    )}
  </div>


 
</div>


        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <Link to={paths.checkout} className="flex items-center gap-2"><FaChevronLeft />Retour au panier</Link>
          <ButtonIcon title="Commander" link={paths.checkoutDetails}/>
        </div>
      </div>

      {/* Right Side - Order Summary */}
      <div>
          <div className="bg-white rounded-md p-6 shadow space-y-4 mb-3">
            <h2 className="text-base font-semibold mb-4">Résumé de la commande</h2>
            {/* List of Products */}
            <div className="space-y-4">
                {checkout.items.map((item) => (
                    <div className="flex justify-between">
                    <div>
                    <p className="font-medium">{item.name}</p>
                    <div className='flex justify-between'>
                        <p className="text-sm text-gray-500">X {item.quantity}</p>
                        <p className='font-bold'>{(item.price * item.quantity).toFixed(2)} €</p>
                    </div>
                    </div>
          
                </div>
                ))}
          </div>
            {/* Promo code */}
            {/* <div className="mt-6">
              <input
                type="text"
                placeholder="Ajouter un code promo"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div> */}
            {/* Subtotal + Total */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Sous-total</span>
                <span>{checkout.subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{checkout.total.toFixed(2)} €</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md p-6 shadow">
            <h2 className="text-base font-semibold mb-4">Note de commande</h2>
            <div>
              <label className="block text-sm font-medium">Ajouter une note (optionnel)</label>
              <textarea
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ex : Laisser la commande devant la porte..."
          value={checkout.expediteur.note || ''}
          onChange={(e) => checkout.onCreateExpediteur({ ...checkout.expediteur, note: e.target.value })}
          rows={4}
              />
            </div>
          </div>
      </div>
    </div>
  );
}
