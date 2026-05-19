import React, { useState, useRef, useEffect } from "react";
import { IoSearchOutline, IoCloseCircle, IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSearchProduitsEtablissements } from "src/actions/serach";

export default function SearchBar({ className = "" }) {
    const [query, setQuery] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const desktopRef = useRef(null);
    const mobileInputRef = useRef(null);
    const debounceRef = useRef(null);

    const navigate = useNavigate();

    const { suggestions = [], loading, setQuery: setApiQuery } =
        useSearchProduitsEtablissements();

    const handleChange = (val) => {
        setQuery(val);
        setActiveIndex(-1);

        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setApiQuery(val);
        }, 300);

        setDropdownOpen(val.length > 0);
    };

    const handleKeyDown = (e) => {
        if (!dropdownOpen) return;

        if (e.key === "ArrowDown") {
            setActiveIndex((prev) =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        }

        if (e.key === "ArrowUp") {
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
        }

        if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0) {
                goToSearch(suggestions[activeIndex]);
            }
        }
    };

    useEffect(() => {
        if (mobileOpen) {
            setTimeout(() => mobileInputRef.current?.focus(), 80);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => (document.body.style.overflow = "");
    }, [mobileOpen]);

    // fermer si click outside
    useEffect(() => {
        const handler = (e) => {
            if (desktopRef.current && !desktopRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const goToSearch = (item) => {
        setDropdownOpen(false);
        closeMobile();

        if (item && item.slug) {
            navigate(`/spa/${item.slug}`);
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
            {suggestions.map((s, i) => (
                <li key={s.id || i}>
                    <button
                        type="button"
                        onClick={() => onSelect(s)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition
                            ${i === activeIndex ? "bg-gray-100" : "hover:bg-gray-50"}
                        `}
                    >
                        {/* IMAGE */}
                        {s.image ? (
                            <img
                                src={s.image}
                                alt={s.label}
                                className="w-10 h-10 object-cover rounded-lg"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                        )}

                        {/* TEXT */}
                        <div className="flex flex-col">
                            <span className="text-gray-800">{s.label}</span>
                            {s.ville && (
                                <span className="text-xs text-gray-400">
                                    {s.ville}
                                </span>
                            )}
                        </div>
                    </button>
                </li>
            ))}
        </ul>
    );

    return (
        <>
            {/* DESKTOP */}
            <div ref={desktopRef} className={`hidden md:block relative ${className}`}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="relative flex items-center">
                        <IoSearchOutline size={15} className="absolute left-3 text-gray-400" />

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => handleChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => query && setDropdownOpen(true)}
                            placeholder="Rechercher un établissement..."
                            className="w-full pl-8 pr-7 py-[7px] text-sm bg-gray-100 rounded-full focus:bg-white focus:ring-1 outline-none"
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
                    <div className="absolute top-full right-0 mt-2 w-80 bg-white shadow-lg rounded-xl border z-50">
                        <div className="px-4 py-2 border-b text-xs text-gray-400">
                            Établissements
                        </div>

                        {loading ? (
                            <div className="p-4 text-sm text-gray-400">Chargement...</div>
                        ) : suggestions.length === 0 ? (
                            <div className="p-4 text-sm text-gray-400">Aucun résultat</div>
                        ) : (
                            <SuggestionList onSelect={goToSearch} />
                        )}
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

                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-gray-400">Chargement...</div>
                        ) : suggestions.length === 0 ? (
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