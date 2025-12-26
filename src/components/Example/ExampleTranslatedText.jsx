import React from 'react';
import { Translation } from '../Translation/Translation';

export const ExampleTranslatedText = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        <Translation text="Exemple de traduction" />
      </h1>
      
      <div className="space-y-4">
        <p>
          <Translation text="Ceci est un exemple de texte qui sera traduit automatiquement." />
        </p>
        
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">
            <Translation text="Comment utiliser le composant Translation" />
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><Translation text="Importez le composant : `import { Translation } from 'src/components/Translation'`" /></li>
            <li><Translation text="Entourez votre texte avec `<Translation>`" /></li>
            <li><Translation text="Le texte sera automatiquement traduit dans la langue sélectionnée" /></li>
          </ul>
        </div>
        
        <div className="mt-6 p-4 border rounded bg-blue-50">
          <p className="font-medium">
            <Translation text="Astuce : Changez la langue en utilisant les boutons dans la barre de navigation pour voir la traduction en action !" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExampleTranslatedText;
