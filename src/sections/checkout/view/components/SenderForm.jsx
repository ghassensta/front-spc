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

    // ── Styles communs aux boutons (= ButtonLink shape) ──────────────
    const baseBtn =
        "w-full inline-flex justify-center items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm rounded-full";

    if (!user) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-3">
                {/* PRIMARY — noir → hover doré */}
                <button
                    onClick={() =>
                        router.push(
                            `${paths.auth.register}?returnTo=${encodeURIComponent("/checkout")}`,
                        )
                    }
                    className={baseBtn}
                    style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#b8955a")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#1a1a1a")
                    }
                >
                    <TranslatedText text="Se connecter et continuer" />
                </button>

                {/* TERTIARY — gris clair → hover gris moyen */}
                <button
                    onClick={onCheckout}
                    className={baseBtn}
                    style={{ backgroundColor: "#F5F5F5", color: "#444444" }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#E5E5E5")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#F5F5F5")
                    }
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

            {/* PRIMARY — noir → hover doré (cohérent avec le reste) */}
            <button
                onClick={onCheckout}
                className={`${baseBtn} mt-4`}
                style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#b8955a")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#1a1a1a")
                }
            >
                <TranslatedText text="Payer" />
            </button>
        </div>
    );
}