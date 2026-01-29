import { useEffect, useRef } from "react";

export default function MailjetNewsletterIframe() {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Fonction pour afficher le pop-in Mailjet automatiquement
    const showMailjetPopin = () => {
      if (typeof window.mjPopin !== "undefined") {
        // Vérifie si le pop-in a déjà été affiché
        if (!localStorage.getItem("mailjetPopinShown")) {
          window.mjPopin.show("313193a0eb9e5ee168bf"); // ton data-w-token
          localStorage.setItem("mailjetPopinShown", "true");
        }
      } else {
        // Si le script n'est pas encore chargé, réessaye après 200ms
        setTimeout(showMailjetPopin, 200);
      }
    };

    // Charger le script Mailjet dynamiquement
    const script = document.createElement("script");
    script.src = "https://app.mailjet.com/pas-nc-pop-in-v1.js";
    script.async = true;
    script.onload = showMailjetPopin; // lancer dès que le script est chargé
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="https://srm3t.mjt.lu/wgt/srm3t/00si/form?c=b365bf47"
      title="Inscription newsletter"
      style={{ width: "100%", height: 520, border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allow="clipboard-write"
    />
  );
}
