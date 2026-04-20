import React from "react";

export default function SpaConseil({ image, text, logo, translate }) {
  return (
    <div
      style={{
        backgroundImage: `url('${image}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="mt-8 bg-white w-screen relative left-[calc(-50vw+50%)] mb-8 py-24 overflow-hidden bg-center"
    >
      <div className="flex flex-col items-center p-5 pb-4 pt-10 text-center bg-white/80 mx-[4%] md:mx-[20%]">
        <img
          loading="lazy"
          src={logo}
          alt={translate("Logo Spa & Prestige Collection")}
          className="w-36 mb-4"
        />

        <span className="text-3xl font-bold mb-4">
          {translate("– Le conseil Spa & Prestige Collection –")}
        </span>

        <p className="text-lg font-normal font-tahoma">
          {translate(text)}
        </p>
      </div>
    </div>
  );
}