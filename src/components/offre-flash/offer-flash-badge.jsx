export default function OfferFlashBadge({ remainingTime }) {
  return (
    <div className="w-full flex flex-col items-center justify-center px-1 py-1 border-dashed border-2 rounded-lg font-tahoma">
      <div className="w-full border-t-2 border-b-2 border-black text-center">
        <span className="font-bold text-black tracking-[0.1em] text-sm uppercase">
          OFFRE FLASH
        </span>
        <div className="text-xs font-bold text-gray-800">
          {remainingTime}
        </div>
      </div>
    </div>
  );
}
