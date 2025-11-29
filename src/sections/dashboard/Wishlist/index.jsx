import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaEye } from 'react-icons/fa';
import { paths } from 'src/router/paths';
import { CONFIG } from 'src/config-global';
import { useToggleWishlist } from 'src/actions/wishlists';
import { toast } from 'react-toastify';

export default function Wishlist({ wishlists, loading, validating }) {
  
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    setWishlist(wishlists)
  }, [wishlists])

  const toggleLike = async(id) => {
    const promise = useToggleWishlist(id);
    
        toast.promise(promise, {
          pending: "Retirer de favoris ...",
        });
    
        try {
          await promise;
        } catch (err) {
          console.error(err);
          throw err
        }
  };

  if(loading || validating){
    return(
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gray-200 animate-pulse w-1/4 rounded mb-2" />
            <div className="h-4 bg-gray-200 animate-pulse w-1/2 rounded" />
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
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
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ma Wishlist</h1>
          <p className="text-gray-600 mt-2">
            Retrouvez tous vos soins et forfaits spa favoris
          </p>
        </div>

        {/* Contenu de la wishlist */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <FaRegHeart className="h-16 w-16 text-gray-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Votre wishlist est vide
            </h3>
            <p className="text-gray-500 mb-6">
              Ajoutez des soins et forfaits à votre wishlist pour les retrouver facilement
            </p>
            <Link
              to={paths.spa.list}
              className="bg-[#c4c0a1] rounded-full text-white px-6 py-2 uppercase tracking-wider hover:opacity-90 max-w-max"
            >
              Découvrir nos soins
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative">
                  <img 
                    loading="lazy" 
                    src={CONFIG.serverUrl+"/storage/"+item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-600 focus:outline-none"
                    >
                      <FaHeart />
                      {/* {item.isLiked ? <FaHeart /> : <FaRegHeart />} */}
                    </button>
                  </div>
                
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{item.nom}</h3>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-secondary">{item.prix} €</span>
                    <div className="flex space-x-2">
                      <Link to={paths.product(item.slug)} className="p-2 text-gray-600 hover:text-primary border border-gray-200 rounded-md">
                        <FaEye />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}