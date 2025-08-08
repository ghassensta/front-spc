import React from "react";
import { illustration1, illustration2 } from "../../../assets/illustration";
import ButtonIcon from "../../../components/button-icon/button-icon";
import { FaStar } from "react-icons/fa";

export default function Header() {
  return (
    <div className="text-center w-full flex flex-col z-10 relative items-center p-4 ">
      <p className="text-secondary text-2xl font-medium lg:w-3/4 mb-4">
        Rejoignez la Communauté Privée Spa & Prestige Collection ! Plongez dans
        un univers d’exception et{" "}
        <span className="underline">
          laissez-vous séduire par des privilèges rares et uniques…
        </span>
      </p>
      <ButtonIcon title="CARTE CADEAU" />
    </div>
  );
}
