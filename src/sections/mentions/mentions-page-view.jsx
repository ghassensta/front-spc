import React from "react";

export default function MentionsPageView() {
  return (
    <div className="px-6 md:px-20 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Mentions légales</h1>

      <section className="space-y-6 text-justify font-bricolage">
        <div>
          <h2 className="font-bold">1. Éditeur du site :</h2>
          <p>
            Le présent site <a href="https://www.spa-prestige-collection.com/" className="text-blue-600 underline">https://www.spa-prestige-collection.com/</a> est édité par Prestige Global Solutions, société par actions simplifiée au capital social de 1.000 Euros, immatriculée au Registre du Commerce et des Sociétés de Meaux sous le numéro 930 239 397, dont le siège social est situé 12 rue des Marguerites 77230 Moussy le Neuf, représentée par Monsieur Romain Dupont, en qualité de président.
          </p>
          <p>Numéro de TVA intracommunautaire : FR 73930239397</p>
          <p>
            E-mail : <a href="mailto:contact@spa-prestige-collection.com" className="text-blue-600 underline">nous contacter</a>
          </p>
          <p>Le Directeur de la publication est Monsieur Romain Dupont, Président de Prestige Global Solutions.</p>
        </div>

        <div>
          <h2 className="font-bold">2. Hébergement du site :</h2>
          <p>
            L’hébergement du Site est assuré par la société IONOS SARL, 7 place de la gare BP 70109, 57201 Sarreguemines Cedex, immatriculée au Registre du Commerce et des Sociétés de Meaux sous le numéro B 431 303 775
          </p>
          <p>Numéro de TVA intracommunautaire : FR 13 43130377</p>
        </div>

        <div>
          <h2 className="font-bold">3. Propriété intellectuelle :</h2>
          <p>
            Tout le contenu du site (textes, images, logos, vidéos, etc.) est la propriété exclusive de Prestige Global Solutions, ou des tiers ayant autorisé leur utilisation. Toute reproduction ou représentation, en tout ou en partie, de ce contenu est interdite sans l'accord préalable de l'éditeur du site.
          </p>
        </div>

        <div>
          <h2 className="font-bold">4. Données personnelles :</h2>
          <p>
            Prestige Global Solutions est responsable du traitement des données. Celles-ci sont collectées pour la gestion des commandes ainsi que le marketing. Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 et au Règlement Général sur la Protection des Données (RGPD), les utilisateurs disposent des droits suivants sur leurs données :
          </p>
          <ul className="list-disc list-inside">
            <li>Droit d’accès, de rectification, de suppression des données personnelles.</li>
            <li>Droit à la portabilité des données.</li>
            <li>Droit d’opposition.</li>
            <li>Droit à la limitation du traitement.</li>
          </ul>
          <p>
            Pour exercer ces droits, les utilisateurs doivent en faire la demande par mail sur{" "}
            <a href="mailto:contact@spa-prestige-collection.com" className="text-blue-600 underline">
              contact@spa-prestige-collection.com
            </a>
          </p>
          <p>
            Le site utilise des cookies pour améliorer l’expérience de navigation. Les utilisateurs peuvent refuser les cookies via leurs paramètres de navigateur.
          </p>
        </div>

        <div>
          <h2 className="font-bold">5. Conditions d’utilisation du site :</h2>
          <p>
            L’utilisateur s’engage à utiliser le site conformément aux lois en vigueur et aux présentes mentions légales. Toute utilisation abusive du site, ou comportement illicite ou nuisible à la sécurité du site peut entraîner la suspension ou la fermeture de l’accès au site sans préavis.
          </p>
        </div>

        <div>
          <h2 className="font-bold">6. Responsabilité :</h2>
          <p>
            Prestige Global Solutions ne saurait être tenu responsable des dommages directs ou indirects liés à l’utilisation du site, des erreurs ou omissions dans le contenu, des dysfonctionnements techniques, ou des pertes de données. Les liens externes proposés sur le site ne sont pas sous le contrôle de l’éditeur, et il décline toute responsabilité quant à leur contenu.
          </p>
        </div>

        <div>
          <h2 className="font-bold">7. Loi applicable et juridiction compétente :</h2>
          <p>
            Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront compétents.
          </p>
        </div>
      </section>
    </div>
  );
}