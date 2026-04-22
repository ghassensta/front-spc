import React, { useState, useRef, useEffect } from "react";
import { IoSearchOutline, IoCloseCircle, IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSearchProduitsEtablissements } from "src/actions/serach";

export default function SearchBar({ className = "" }) {
    const [query, setQuery] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const desktopRef = useRef(null);
    const mobileInputRef = useRef(null);
    const navigate = useNavigate();

    const { suggestions, loading, setQuery: setApiQuery } =
        useSearchProduitsEtablissements();

    const filtered = suggestions;

    const handleChange = (val) => {
        setQuery(val);
        setApiQuery(val);
        setDropdownOpen(val.length > 0);
    };

    useEffect(() => {
        if (mobileOpen) {
            setTimeout(() => mobileInputRef.current?.focus(), 80);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    useEffect(() => {
        const handler = (e) => {
            if (desktopRef.current && !desktopRef.current.contains(e.target))
                setDropdownOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") closeMobile();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    const goToSearch = (item) => {
        setDropdownOpen(false);
        closeMobile();

        //  uniquement si objet avec slug
        if (item && typeof item === "object" && item.slug) {
            navigate(`/produit/${item.slug}`);
        }
    };
    const closeMobile = () => {
        setMobileOpen(false);
        setQuery("");
        setDropdownOpen(false);
        setApiQuery("");
    };

    const SuggestionList = ({ onSelect }) => (
        <ul className="py-1">
            {filtered.map((s, i) => (
                <li key={s.key || i}>
                    <button
                        type="button"
                        onClick={() => onSelect(s)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                        <IoSearchOutline size={13} className="text-gray-300" />
                        <span>{s.label}</span>
                    </button>
                </li>
            ))}
        </ul>
    );

    return (
        <>
            {/* DESKTOP */}
            <div ref={desktopRef} className={`hidden md:block relative ${className}`}>
                <form onSubmit={(e) => { e.preventDefault(); goToSearch(query); }}>
                    <div className="relative flex items-center">
                        <IoSearchOutline
                            size={15}
                            className="absolute left-3 text-gray-400"
                        />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => handleChange(e.target.value)}
                            onFocus={() => query.length > 0 && setDropdownOpen(true)}
                            placeholder="Rechercher un service, produit, ville…"
                            className="
                w-full pl-8 pr-7 py-[7px]
                text-sm bg-gray-100 rounded-full
                focus:bg-white focus:ring-1
                outline-none
              "
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => handleChange("")}
                                className="absolute right-2 text-gray-400"
                            >
                                <IoCloseCircle size={14} />
                            </button>
                        )}
                    </div>
                </form>

                {/* DROPDOWN */}
                {dropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white shadow-lg rounded-xl border z-50">
                        <div className="px-4 py-2 border-b text-xs text-gray-400">
                            Suggestions
                        </div>

                        {loading ? (
                            <div className="p-4 text-sm text-gray-400">Chargement...</div>
                        ) : (
                            <SuggestionList onSelect={goToSearch} />
                        )}

                        <button
                            onClick={() => goToSearch(query)}
                            className="w-full px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
                        >
                            Voir tous les résultats
                        </button>
                    </div>
                )}
            </div>

            {/* MOBILE ICON */}
            <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="md:hidden w-9 h-9 flex items-center justify-center"
            >
                <IoSearchOutline size={20} />
            </button>

            {/* MOBILE */}
            {mobileOpen && (
                <div className="fixed inset-0 z-[100] bg-white flex flex-col">
                    {/* top */}
                    <div className="flex items-center gap-3 px-3 py-3 border-b">
                        <button onClick={closeMobile}>
                            <IoArrowBack size={22} />
                        </button>

                        <input
                            ref={mobileInputRef}
                            value={query}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder="Rechercher..."
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none"
                        />
                    </div>

                    {/* body */}
                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-gray-400">Chargement...</div>
                        ) : filtered.length === 0 ? (
                            <div className="p-6 text-gray-400 text-center">
                                Aucun résultat
                            </div>
                        ) : (
                            <SuggestionList onSelect={goToSearch} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}