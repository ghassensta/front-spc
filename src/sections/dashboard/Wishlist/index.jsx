import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaEye, FaShareAlt } from "react-icons/fa";
import { paths } from "src/router/paths";
import { CONFIG } from "src/config-global";
import { useToggleWishlist } from "src/actions/wishlists";
import { toast } from "react-toastify";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "react-i18next";
import ShareModal from "src/components/wishlist-modal/modal";

export default function Wishlist({ wishlists, loading, validating }) {
  const { t } = useTranslation();
  const [wishlist, setWishlist] = useState([]);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [remainingTimes, setRemainingTimes] = useState({}); // pour stocker countdown par produit

  useEffect(() => {
    setWishlist(wishlists || []);
  }, [wishlists]);

  // ================= COUNTDOWN OFFRE FLASH =================
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimes = {};
      wishlist.forEach((item) => {
        if (item.offre_flash === 1 && item.date_fin) {
          const diff = new Date(item.date_fin) - new Date();
          if (diff <= 0) {
            newTimes[item.id] = t("Expiré");
          } else {
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff / 3600000) % 24);
            const m = Math.floor((diff / 60000) % 60);
            const s = Math.floor((diff / 1000) % 60);
            newTimes[item.id] = `${d}j ${h}h ${m}m ${s}s`;
          }
        }
      });
      setRemainingTimes(newTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [wishlist, t]);

  const toggleLike = async (id) => {
    const promise = useToggleWishlist(id);
    toast.promise(promise, { pending: t("Retirer de favoris...") });
    await promise;
  };

  const openShareModal = (item) => {
    setSelectedProduct(item);
    setShareModalOpen(true);
  };

  const closeShareModal = () => {
    setShareModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading || validating) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              <TranslatedText text="Ma Wishlist" />
            </h1>
            <p className="text-gray-600 mt-2">
              <TranslatedText text="Retrouvez tous vos soins et forfaits spa favoris" />
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="relative">
                  <div className="w-full h-48 bg-gray-200 animate-pulse" />
                  <div className="absolute top-3 right-3">
                    <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="h-5 bg-gray-200 animate-pulse w-3/4 rounded" />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="h-5 bg-gray-200 animate-pulse w-1/4 rounded" />
                    <div className="flex space-x-2">
                      <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            <TranslatedText text="Ma Wishlist" />
          </h1>
          <p className="text-gray-600 mt-2">
            <TranslatedText text="Retrouvez tous vos soins et forfaits spa favoris" />
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <FaRegHeart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              <TranslatedText text="Votre wishlist est vide" />
            </h3>
            <Link
              to={paths.spa.list}
              className="bg-[#c4c0a1] rounded-full text-white px-6 py-2 uppercase"
            >
              <TranslatedText text="Découvrir nos soins" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => {
              const isOfferActive =
                item.offre_flash === 1 &&
                item.date_fin &&
                new Date(item.date_fin) > new Date();

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  <div className="relative">
                    <Link to={paths.product(item.slug)}>
                      <img
                        src={`${CONFIG.serverUrl}/storage/${item.image}`}
                        alt={item.nom}
                        className="w-full h-48 object-cover"
                      />

                      {/* OFFRE FLASH */}
                      {isOfferActive && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow flex flex-col items-center">
                          <TranslatedText text="Offre flash" />
                          <span className="text-[10px] font-bold mt-1">
                            {remainingTimes[item.id]}
                          </span>
                        </div>
                      )}

                      {/* EXCLUSIVITÉ */}
                      {item?.type_exclusivite?.image_path && (
                        <div className="absolute bottom-2 right-2 w-14 h-14 bg-white rounded-full p-1 shadow">
                          <img
                            src={`${CONFIG.serverUrl}/storage/${item.type_exclusivite.image_path}`}
                            alt="exclusivité"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      )}
                    </Link>
                    {/* LIKE */}
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow text-red-500"
                    >
                      <FaHeart />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {item.nom}
                    </h3>

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">{item.prix} €</span>

                      <div className="flex gap-2">
                        <Link
                          to={paths.product(item.slug)}
                          className="p-2 border rounded-md"
                        >
                          <FaEye />
                        </Link>
                        <button
                          onClick={() => openShareModal(item)}
                          className="p-2 border rounded-md"
                        >
                          <FaShareAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        product={selectedProduct}
        onClose={closeShareModal}
      />
    </div>
  );
}
