import React from "react";
// import { illustration1, illustration2 } from "../../../assets/illustration";
import carteCadeau from "../../../assets/SPC-icone-carte-cadeau.png";
import ButtonIcon from "../../../components/button-icon/button-icon";
import { FaHandHoldingHeart } from "react-icons/fa";

export default function CarteCadeau() {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://spa-prestige-collection.com/wp-content/uploads/2025/01/SPA-image-2000x833-03.jpg)",
      }}
      className="bg-primary w-screen relative left-[calc(-50vw+50%)] mt-16 min-h-32 overflow-hidden"
    >
      {/* <img src={illustration1} alt="" className="absolute right-0 h-full hidden lg:block" />
      <img src={illustration2} alt="" className="absolute left-0 h-full hidden lg:block" /> */}
      <div className="bg-[#f3ececa8] absolute w-full h-full"></div>
      <div className="text-center w-full flex flex-col z-10 relative items-center p-4 lg:p-16">
        <img src={carteCadeau} alt="" className="mb-4" />
        <p className="text-secondary font-tahoma text-base font-normal lg:w-1/2 uppercase mb-4">
          JE COMMANDE une CARTE cadeau à utiliser dans un établissement SPA &
          PRESTIGE COLLECTION et je cumule des avantages
        </p>
        <ButtonIcon title="OFFRIR" icon={<FaHandHoldingHeart />} />
      </div>
    </div>
  );
}
