import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

function CreditOption() {
  const credits = [
    { id: 1, montant: 15, type: 'euros', utilise: false, date_expiration: '2025-12-31' },
    { id: 2, montant: 10, type: 'euros', utilise: false, date_expiration: null },
    { id: 2, montant: 10, type: 'euros', utilise: false, date_expiration: null },
    { id: 2, montant: 10, type: 'euros', utilise: false, date_expiration: null },
    { id: 2, montant: 10, type: 'euros', utilise: false, date_expiration: null },
    { id: 2, montant: 10, type: 'euros', utilise: false, date_expiration: null },
   
    { id: 3, montant: 5, type: 'euros', utilise: true, date_expiration: null },
    { id: 3, montant: 5, type: 'euros', utilise: true, date_expiration: null },
    { id: 3, montant: 5, type: 'euros', utilise: true, date_expiration: null },
  ];

  const [selectedCredits, setSelectedCredits] = useState(new Set());

  const availableCredits = credits.filter(
    (credit) =>
      !credit.utilise &&
      (!credit.date_expiration || new Date(credit.date_expiration) > new Date())
  );

  const toggleCredit = (creditId) => {
    const newSelected = new Set(selectedCredits);
    newSelected.has(creditId) ? newSelected.delete(creditId) : newSelected.add(creditId);
    setSelectedCredits(newSelected);
  };

  if (availableCredits.length === 0) {
    return <div className="text-center py-8 text-gray-500">Aucun crédit disponible.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
      <div className="grid grid-cols-2 gap-3">
        {availableCredits.map((credit) => {
          const isSelected = selectedCredits.has(credit.id);
          const displayValue =
            credit.type === 'points'
              ? `${credit.montant} pts`
              : `${credit.montant} €`;

          return (
            <div
              key={credit.id}
              onClick={() => toggleCredit(credit.id)}
              className={`relative p-4 text-center rounded-xl font-semibold cursor-pointer transition-all duration-200 ${
                isSelected ? 'shadow-lg' : 'shadow-sm hover:shadow-md'
              }`}
              style={{
                backgroundColor: isSelected ? '#b6b499' : '#f9f9f9',
                color: isSelected ? '#fff' : '#373737',
                border: `2px solid ${isSelected ? '#b6b499' : '#e5e5e5'}`,
              }}
            >
              <span className="text-base">{displayValue}</span>
              {isSelected && (
                <CheckCircle
                  className="absolute top-1 right-1 text-white"
                  size={16}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CreditOption;
