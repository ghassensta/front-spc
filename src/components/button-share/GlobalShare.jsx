import { Share2 } from "lucide-react";
import { useCallback } from "react";

export default function GlobalShare({ url, title }) {
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.error("Share cancelled or failed");
      }
    } else {
      window.open(url, "_blank");
    }
  }, [url, title]);

  return (
    <div className="mt-6 border-t pt-4">
      <button
        onClick={handleShare}
        className="flex items-center gap-3 text-base uppercase font-roboto font-[400] hover:opacity-70 transition"
      >
        <Share2 size={18} />
        <span>Partager</span>
      </button>
    </div>
  );
}
