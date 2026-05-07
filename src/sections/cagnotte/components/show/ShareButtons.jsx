import { useCallback, useState } from "react";
import { Share2, Copy, Check } from "lucide-react";

const ShareButtons = ({ cagnotte, cleanUrl, handleCopyPublic, t }) => {
  const [copiedPublic, setCopiedPublic] = useState(false);

  const handleShare = useCallback(async () => {
    const shareText = t(
      'Participez à la cagnotte "{titre}" pour {destinataire} !',
      {
        titre: cagnotte.titre,
        destinataire:
          cagnotte.destinataire?.nom || t("un cadeau spécial"),
      }
    );

    if (navigator.share) {
      try {
        await navigator.share({
          title: cagnotte.titre,
          text: shareText,
          url: cleanUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  }, [cagnotte, cleanUrl, t]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cleanUrl);
    setCopiedPublic(true);
    setTimeout(() => setCopiedPublic(false), 2000);
  };

  return (
    <div className="mb-8 pb-8 border-b border-gray-200">
      <h3 className="font-bold text-lg mb-4">
        {t("Partager cette cagnotte")}
      </h3>

      <div className="flex gap-3">
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 bg-[#b8955a] text-white py-3 px-5 rounded-lg hover:opacity-90 transition font-bold"
        >
          <Share2 size={20} />
          {t("Partager")}
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 border-2 border-[#b8955a] text-[#b8955a] py-3 px-5 rounded-lg hover:bg-[#b8955a] hover:text-white transition font-bold"
        >
          {copiedPublic ? <Check size={20} /> : <Copy size={20} />}
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
