import React, { useState } from "react";
import { Handshake, Gift, Users, Copy, Mail } from "lucide-react";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { paths } from "src/router/paths";
import { toast } from "react-toastify";
import { useSendInvites } from "src/actions/parrainage";
import { CONFIG } from "src/config-global";

export default function ParrainagePageView({ filleuls, total_filleuls }) {
  const { user } = useAuthContext();
  const [referralCode] = useState(user?.parrainage_code);
  const [referralLink] = useState(
    CONFIG.frontUrl + paths.auth.register + "?code=" + referralCode
  );

  const [copied, setCopied] = useState(false);

  const [emails, setEmails] = useState([""]);

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
    if (10 - total_filleuls - emails.length <= 0) {
      toast.error("Vous avez atteint le limit");
    } else {
      setEmails([...emails, ""]);
    }
  };

  const handleSendInvites = async () => {
    if (!emails[0]) {
      toast.error("Saisir un email au moins");
      return;
    }

    const filteredEmails = emails.filter((email) => email);

    // if() VALIDATE EMAILS

    try {
      await toast.promise(useSendInvites({emails :filteredEmails, referralLink}), {
        pending: "Envoi en cours ...",
        success: "Envoi avec succéss",
        error: "Un erreur est servenu",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Parrainage Card */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Handshake className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-800">Parrainage</h2>
          </div>
          <span className="text-xs text-cyan-600 bg-cyan-50 px-2 py-1 rounded">
            Limité à {10 - total_filleuls} filleuls
          </span>
        </div>

        {/* Referral Code */}
        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            value={referralCode}
            disabled
            className="flex-1 border rounded-md px-3 py-2 bg-gray-50 text-gray-700"
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
            Copié dans le presse-papier ✅
          </p>
        )}

        <p className="text-sm text-gray-600">
          Partagez ce code par vos propres moyens (email, téléphone, réseaux
          sociaux).
        </p>

        {/* Rewards */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-yellow-500" />
            <h3 className="text-md font-semibold text-gray-800">Récompenses</h3>
          </div>
          <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1">
            <li>5€ en bon d’achat par filleul qui valide une commande</li>
            <li>Bons cumulables, valables 12 mois</li>
            <li>Non remboursables, non sécables, utilisables une seule fois</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Filleuls + Invite */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Filleuls */}
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-gray-700" />
            <h3 className="text-md font-semibold text-gray-800">Filleuls</h3>
          </div>
          <div className="space-y-2 flex-1 h-full">
            {!filleuls.length && (
              <div className="flex items-center justify-center flex-1 w-full my-auto">
                <p>Vous avez aucun personne parrainé</p>
              </div>
            )}
            {filleuls.map((f, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border rounded px-3 py-2 text-sm"
              >
                <span>{f.name}</span>
                {f.status === "validée" ? (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                    Commande validée
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">
                    En attente
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Invite */}
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h3 className="text-md font-semibold text-gray-800 mb-3">
            Inviter via un lien
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={referralLink}
              disabled
              className="flex-1 border rounded-md px-3 py-2 bg-gray-50 text-gray-700 text-sm"
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
              placeholder="Email"
              className="w-full border rounded-md px-3 py-2 mb-2 text-sm"
            />
          ))}
          <button
            onClick={addEmailField}
            className="flex items-center gap-2 text-sm text-gray-600 border px-3 py-1 rounded mb-3 hover:bg-gray-50"
          >
            <Mail className="w-4 h-4" /> Inviter plus d’amis
          </button>

          <button
            onClick={handleSendInvites}
            className="w-full bg-orange-400 text-white font-medium py-2 rounded-md hover:bg-orange-500 transition"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
