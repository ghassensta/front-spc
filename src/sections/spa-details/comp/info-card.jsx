import React from 'react'
import theImage from 'src/assets/images/SPC-Eva-Maison-Blanche-portrait.jpg';

export default function InfoCard() {
  return (
    <div className='grid grid-cols-1 font-roboto lg:grid-cols-3 mt-8 lg:mt-16 gap-6 lg:gap-2'>
        <div className="bg-primary text-secondary relative rounded-xl">
            <span className='absolute bg-secondary px-3 rounded text-primary left-2 -top-3'>Informations Générales</span>
            <ul className='p-8 text-lg font-normal'> 
                <li className='mb-2'><span className='text-base font-bold'>Adresse :</span>100 chemin de la chapelle – 42300 Villerest</li>
                <li className='mb-2'><span className='text-base font-bold'>Email :</span>contact@davidgrandspa.fr</li>
                <li className=''><span className='text-base font-bold'>Tél. :</span>+33 (0)4 77 23 01 98</li>
            </ul>
        </div>
        <div className="bg-secondary text-primary relative rounded-xl">
            <span className='absolute bg-primary px-3 rounded text-secondary left-2 -top-3'>Informations Utiles</span>
            <div className="p-8">
                <span className='font-bold'>Jours et Horaires d’ouverture</span>
                <p>Lundi : fermé ; mardi à jeudi : 9h à 19h ; Vendredi : 9 à 20h ; Samedi 9h à 20h; dimanche de 9h à 14h (sur réservation).</p>
            </div>
        </div>
        <div className="bg-primary text-secondary relative rounded-xl">
            <span className='absolute bg-secondary px-3 rounded text-primary left-2 -top-3'>Marque(s) Partenaire(s)</span>
            <div className="p-8 flex justify-center items-center gap-4">
                <img lazyload="lazy" src={theImage} alt="" className="rounded-full w-20 h-20" />
                <div>
                    <h6 className='text-2xl font-bold'>David Grand</h6>
                    <span>Spa Manager et fondateur du Spa.</span>
                </div>
            </div>
        </div>
    </div>
  )
}
