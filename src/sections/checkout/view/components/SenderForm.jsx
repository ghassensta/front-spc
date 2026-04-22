import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "react-i18next";
import { useRouter } from "src/hooks";
import { paths } from "src/router/paths";

export default function SenderForm({
    user,
    expediteurFullName,
    expediteurMessage,
    onFullNameChange,
    onMessageChange,
    onCheckout,
}) {
    const { t } = useTranslation();
    const router = useRouter();

    if (!user) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-3">
                <button
                    onClick={() =>
                        router.push(`${paths.auth.register}?returnTo=${encodeURIComponent("/checkout")}`)
                    }
                    className="w-full inline-flex justify-center items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-[#B6B499] hover:bg-black text-white rounded-full"
                >
                    <TranslatedText text="Continuer" />
                </button>
                 <button
                    onClick={onCheckout}
                    className="w-full inline-flex justify-center items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-black hover:bg-gray-900 text-white rounded-full"
                >
                    <TranslatedText text="Continuer en tant qu'invité" />
                </button> 
            </div>
        );
    }

    return (
        <div className="bg-white rounded-md p-4 md:p-6 shadow">
            <h4 className="text-xl font-semibold mb-3 md:mb-4">
                <TranslatedText text="Expéditeur" />
            </h4>

            <div className="flex flex-col gap-3 md:gap-4">
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder={t("Nom et prénom")}
                    value={expediteurFullName}
                    onChange={(e) => onFullNameChange(e.target.value)}
                />
                <textarea
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder={t("Message (optionnel)")}
                    value={expediteurMessage}
                    onChange={(e) => onMessageChange(e.target.value)}
                />
            </div>

            <button
                onClick={onCheckout}
                className="w-full mt-4 inline-flex justify-center items-center rounded-full gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-[#B6B499] hover:bg-black text-white"
            >
                <TranslatedText text="Payer" />
            </button>
        </div>
    );
}