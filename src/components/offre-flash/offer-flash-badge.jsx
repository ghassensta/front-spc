import { useEffect, useState } from "react";

export default function OfferFlashSVG({
  width ,
  height ,
  tailledetime = 34,
  offre_flash = false, 
  date_debut = null, 
  date_fin = null,
}) {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    if (!offre_flash || !date_fin) {
      setRemainingTime("");
      return;
    }

    const endDate = new Date(date_fin).getTime();

    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = endDate - now;

      if (remaining <= 0) {
        clearInterval(timer);
        setRemainingTime("EXPIRÉ");
        return;
      }

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (remaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setRemainingTime(`${days}j ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [offre_flash, date_fin]);

  if (!offre_flash) return null;

  return (
  <div style={{ width: `${width}px`, height: `${height}px` }}>
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <circle cx="150" cy="150" r="145" fill="#ffffff" />
        <circle
          cx="150"
          cy="150"
          r="145"
          fill="none"
          stroke="#2d2d2d"
          strokeWidth="2.5"
        />

        {/* Demi-cercles */}
        <path
          d="M 55,150 A 95,95 0 0,1 245,150 Z"
          fill="#c8c5b8"
          stroke="#2d2d2d"
          strokeWidth="1.5"
        />
        <path
          d="M 245,150 A 95,95 0 0,1 55,150 Z"
          fill="#c8c5b8"
          stroke="#2d2d2d"
          strokeWidth="1.5"
        />

        {/* Éclairs */}
        <path
          d="M 155,85 L 145,108 L 153,108 L 143,128 L 161,103 L 153,103 Z"
          fill="#2d2d2d"
          className="animate-pulse"
          transform="translate(0,-9)"
        />
        <path
          d="M 155,172 L 145,195 L 153,195 L 143,215 L 161,190 L 153,190 Z"
          fill="#2d2d2d"
          className="animate-pulse"
          transform="translate(0,9)"
        />

        {/* Séparateur */}
        <line
          x1="55"
          y1="150"
          x2="245"
          y2="150"
          stroke="#2d2d2d"
          strokeWidth="2.5"
        />

        {/* Cadre compteur */}
        <rect x="20" y="130" width="250" height="40" fill="#ffffff" rx="4" />
        <line x1="57" y1="130" x2="243" y2="130" stroke="#2d2d2d" strokeWidth="1" />
        <line x1="57" y1="170" x2="243" y2="170" stroke="#2d2d2d" strokeWidth="1" />

        {/* Texte compteur */}
        <text
          x="150"
          y="158"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize={tailledetime}
          fontWeight="700"
          textAnchor="middle"
          fill="#000000"
        >
          {remainingTime}
        </text>

        {/* Arcs texte */}
        <path id="arcTop" d="M 35,150 A 115,115 0 0,1 265,150" fill="none" />
        <path id="arcBottom" d="M 35,150 A 78,90 0 0,0 265,150" fill="none" />

        {/* Texte haut */}
        <text
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="28"
          fontWeight="700"
          letterSpacing="3"
          fill="#2d2d2d"
        >
          <textPath href="#arcTop" startOffset="50%" textAnchor="middle">
            OFFRE FLASH
          </textPath>
        </text>

        {/* Texte bas */}
        <text
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="28"
          fontWeight="700"
          letterSpacing="4"
          fill="#2d2d2d"
        >
          <textPath href="#arcBottom" startOffset="50%" textAnchor="middle">
            OFFRE FLASH
          </textPath>
        </text>
      </svg>
    </div>
  );
}
