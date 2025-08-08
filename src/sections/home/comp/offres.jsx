import React from 'react'
import CardLarge from '../../../components/card-large/card-large'
import ButtonIcon from '../../../components/button-icon/button-icon'
import { FaRegArrowAltCircleRight } from 'react-icons/fa'

export default function Offres() {
  return (
    <>
        <div className='max-w-6xl mx-auto'>
            <h2 className='text-4xl font-bold text-center'>Saint-Valentin : notre sélection <div className='text-[#777676]'>Des offres pensées pour célébrer l'amour</div></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
                <Card
  type="large"
  to="/spa/paris"
  title="Le Spa by Sothys Paris République 5*"
  description="Le Spa Sothys, niché au sein du Renaissance Paris République Hotel, incarne l’exclusivité et le raffinement des rituels de bien-être."
  image="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg"
  location="75011 PARIS - ÎLE-DE-FRANCE - FRANCE"
/>
                <Card
  type="large"
  to="/spa/paris"
  title="Le Spa by Sothys Paris République 5*"
  description="Le Spa Sothys, niché au sein du Renaissance Paris République Hotel, incarne l’exclusivité et le raffinement des rituels de bien-être."
  image="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg"
  location="75011 PARIS - ÎLE-DE-FRANCE - FRANCE"
/>
                <Card
  type="large"
  to="/spa/paris"
  title="Le Spa by Sothys Paris République 5*"
  description="Le Spa Sothys, niché au sein du Renaissance Paris République Hotel, incarne l’exclusivité et le raffinement des rituels de bien-être."
  image="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg"
  location="75011 PARIS - ÎLE-DE-FRANCE - FRANCE"
/>
                <Card
  type="large"
  to="/spa/paris"
  title="Le Spa by Sothys Paris République 5*"
  description="Le Spa Sothys, niché au sein du Renaissance Paris République Hotel, incarne l’exclusivité et le raffinement des rituels de bien-être."
  image="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg"
  location="75011 PARIS - ÎLE-DE-FRANCE - FRANCE"
/>
            </div>
            <div className="text-center">
                <ButtonIcon
                    icon={<FaRegArrowAltCircleRight />}
                    title="Découvrir"
                />
            </div>
        </div>
    </>
  )
}
