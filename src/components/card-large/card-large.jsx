import React from "react";
import Card from "../card/card";
import theImage from "src/assets/images/SPC-Essence-1975x1318-02_(1).jpg";
import { TranslatedText } from "../translated-text/translated-text";

export default function CardLarge() {
  return (
<Card
  type="large"
  to="/spa/paris"
  title={<TranslatedText text="Le Spa by Sothys Paris République 5*" />}
  description={<TranslatedText text="Le Spa Sothys, niché au sein du Renaissance Paris République Hotel, incarne l'exclusivité et le raffinement des rituels de bien-être." />}
  image={theImage}
  location={<TranslatedText text="75011 PARIS - ÎLE-DE-FRANCE - FRANCE" />}
/>
  );
}
