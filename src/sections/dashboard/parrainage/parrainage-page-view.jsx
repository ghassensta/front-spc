import React, { useState } from "react";
import { Handshake, Gift, Users, Copy, Mail } from "lucide-react";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { paths } from "src/router/paths";
import { toast } from "react-toastify";
import { useSendInvites } from "src/actions/parrainage";
import { CONFIG } from "src/config-global";

export default function ParrainagePageView({
  filleuls = [],
  total_filleuls = 0,
}) {
  const { user } = useAuthContext();
  const [referralCode] = useState(user?.parrainage_code || "");
  const [referralLink] = useState(
    `${CONFIG.frontUrl}${paths.auth.register}?code=${referralCode}`
  );

  const [copied, setCopied] = useState(false);
  const [emails, setEmails] = useState([""]);
  const [isSending, setIsSending] = useState(false);

  const maxInvites = 10;
  const remaining = maxInvites - total_filleuls;

  // Validation email
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleEmailChange = (index, value) => {
    const updated = [...emails];
    updated[index] = value;
    setEmails(updated);
  };

  const addEmailField = () => {
    if (emails.filter(Boolean).length >= remaining) {
      toast.error(`Limite de ${maxInvites} filleuls atteinte`);
      return;
    }
    setEmails([...emails, ""]);
  };

  // ENVOI INVITATIONS – TOUT DYNAMIQUE
  const handleSendInvites = async () => {
    const filledEmails = emails.map((e) => e.trim()).filter(Boolean);

    if (filledEmails.length === 0) {
      toast.error("Veuillez saisir au moins un email");
      return;
    }

    const invalidEmails = filledEmails.filter((e) => !isValidEmail(e));
    if (invalidEmails.length > 0) {
      toast.error(`Email(s) invalide(s) : ${invalidEmails.join(", ")}`);
      return;
    }

    const userEmail = user?.email?.toLowerCase();
    const selfEmails = filledEmails.filter(
      (e) => e.toLowerCase() === userEmail
    );
    if (selfEmails.length > 0) {
      toast.warn(`Invitation ignorée (vous-même) : ${selfEmails.join(", ")}`);
    }

    const emailsToSend = filledEmails.filter(
      (e) => e.toLowerCase() !== userEmail
    );
    if (emailsToSend.length === 0) {
      toast.info("Aucun email valide à envoyer");
      return;
    }

    setIsSending(true);

    try {
      const response = await useSendInvites({
        emails: emailsToSend,
        referralLink,
      });

      console.log("API Response (Succès) :", response);

      // TOUT VIENT DE L'API
      const data = response; // ou response.data si ton hook retourne { data }

      if (data.success) {
        toast.success(data.message); // "Invitations envoyées avec succès"

        if (data.invited?.length > 0) {
          toast.success(`Invités : ${data.invited.join(", ")}`);
        }
        if (data.ignored_existing_users?.length > 0) {
          toast.info(
            `Déjà inscrits : ${data.ignored_existing_users.join(", ")}`
          );
        }
        if (data.ignored_already_filleuls?.length > 0) {
          toast.info(
            `Déjà filleuls : ${data.ignored_already_filleuls.join(", ")}`
          );
        }

        setEmails([""]);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.error("API Error Response :", error);
      console.error("Error data :", error?.response?.data);
      console.error("Status :", error?.response?.status);

      const data = error?.response?.data || {};

      // MESSAGE EXACT DE L'API
      if (data.message) {
        toast.error(data.message); // ← Affiche "Tous les emails sont déjà inscrits..."
      } else if (data.errors) {
        const messages = Object.values(data.errors).flat().join(" ");
        toast.error(messages);
      } else {
        toast.error("Erreur inconnue");
      }
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      {/* Card Parrainage */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Handshake className="w-5 h-5 text-[#b6b499]" />
            <h2 className="text-lg font-semibold text-gray-800">Parrainage</h2>
          </div>
          <span className="text-xs text-cyan-600 bg-cyan-50 px-2 py-1 rounded">
            Limité à {remaining} filleul{remaining > 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            value={referralCode}
            disabled
            className="flex-1 border rounded-md px-3 py-2 bg-gray-50 text-gray-700 text-sm"
          />
          <button
            onClick={() => handleCopy(referralCode)}
            className="px-3 py-2 border rounded-md text-sm bg-gray-50 hover:bg-gray-100 flex items-center gap-1"
          >
            <Copy className="w-4 h-4" />
            Copier
          </button>
        </div>
        {copied && (
          <p className="text-xs text-green-600 mb-2">
            Copié dans le presse-papier
          </p>
        )}

        <p className="text-sm text-gray-600 mb-6">
          Partagez ce code par vos propres moyens.
        </p>

        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-[#b6b499]" />
            <h3 className="text-md font-semibold text-gray-800">Récompenses</h3>
          </div>
          <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1">
            <li>5€ en bon d’achat par filleul qui valide une commande</li>
            <li>Bons cumulables, valables 12 mois</li>
            <li>Non remboursables, non sécables, utilisables une seule fois</li>
          </ul>
        </div>
      </div>

      {/* Filleuls + Inviter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Filleuls */}
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-gray-700" />
            <h3 className="text-md font-semibold text-gray-800">Filleuls</h3>
          </div>
          <div className="space-y-2 min-h-32">
            {filleuls.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Aucun filleul pour le moment
              </p>
            ) : (
              filleuls.map((f, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border rounded px-3 py-2 text-sm"
                >
                  <span>{f.name}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      f.recompense_donnee
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {f.recompense_donnee ? "Validée" : "En attente"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Inviter */}
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h3 className="text-md font-semibold text-gray-800 mb-3">
            Inviter via un lien
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={referralLink}
              disabled
              className="flex-1 border rounded-md px-3 py-2 bg-gray-50 text-gray-700 text-xs"
            />
            <button
              onClick={() => handleCopy(referralLink)}
              className="px-3 py-2 border rounded-md text-sm bg-gray-50 hover:bg-gray-100 flex items-center gap-1"
            >
              <Copy className="w-4 h-4" />
              Copier
            </button>
          </div>

          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Inviter par email
          </h4>
          {emails.map((email, idx) => (
            <input
              key={idx}
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(idx, e.target.value)}
              placeholder="exemple@domaine.com"
              className={`w-full border rounded-md px-3 py-2 mb-2 text-sm ${
                email && !isValidEmail(email) ? "border-red-500" : ""
              }`}
            />
          ))}

          {emails.filter(Boolean).length < remaining && (
            <button
              onClick={addEmailField}
              className="flex items-center gap-2 text-sm text-gray-600 border px-3 py-1 rounded mb-3 hover:bg-gray-50"
            >
              <Mail className="w-4 h-4" /> Ajouter un ami
            </button>
          )}

          <button
            onClick={handleSendInvites}
            disabled={isSending || emails.filter(Boolean).length === 0}
            className="w-full bg-[#b6b499] text-white font-medium py-2 rounded-md hover:bg-[#b6b499] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Envoi...
              </>
            ) : (
              "Envoyer les invitations"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
