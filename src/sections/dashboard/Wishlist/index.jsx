import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye, FaTimes } from 'react-icons/fa';
import { API_URL_base } from 'src/api/data';

export default function Wishlist() {
  // Données de démonstration pour les favoris
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Massage Relaxant aux Huiles Essentielles",
      price: 120,
      image: `${API_URL_base}storage/spa-treatments/massage-relaxant.jpg`,
      category: "Soins",
      duration: "60 min",
      isLiked: true,
      inStock: true
    },
    {
      id: 2,
      name: "Soin Visage Anti-Âge Prestige",
      price: 180,
      image: `${API_URL_base}storage/spa-treatments/soin-anti-age.jpg`,
      category: "Soins Visage",
      duration: "90 min",
      isLiked: true,
      inStock: true
    },
    {
      id: 3,
      name: "Pack Détente Complète - Journée Spa",
      price: 350,
      image: `${API_URL_base}storage/spa-treatments/journee-spa.jpg`,
      category: "Forfaits",
      duration: "6 heures",
      isLiked: true,
      inStock: false
    },
    {
      id: 4,
      name: "Coffret Cadeau Évasion Romantique",
      price: 250,
      image: `${API_URL_base}storage/spa-treatments/evasion-romantique.jpg`,
      category: "Coffrets Cadeaux",
      duration: "",
      isLiked: true,
      inStock: true
    }
  ]);

  // Fonction pour retirer un élément des favoris
  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  // Fonction pour basculer le statut "like"
  const toggleLike = (id) => {
    setWishlistItems(wishlistItems.map(item => 
      item.id === id ? { ...item, isLiked: !item.isLiked } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ma Wishlist</h1>
          <p className="text-gray-600 mt-2">
            Retrouvez tous vos soins et forfaits spa favoris
          </p>
        </div>

        {/* Navigation secondaire */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <nav className="flex space-x-6">
            <Link 
              to="/dashboard" 
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              Tableau de bord
            </Link>
            <Link 
              to="/dashboard/commandes" 
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              Mes commandes
            </Link>
            <Link 
              to="/dashboard/wishlist" 
              className="text-primary font-medium border-b-2 border-primary"
            >
              Ma wishlist
            </Link>
            <Link 
              to="/dashboard/parametres" 
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              Paramètres
            </Link>
          </nav>
        </div>

        {/* Contenu de la wishlist */}
        {wishlistItems.length === 0 ? (
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
              to="/spa"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Découvrir nos soins
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-600 focus:outline-none"
                    >
                      {item.isLiked ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>
                  {!item.inStock && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-gray-600 text-white text-xs rounded-md">
                        Rupture de stock
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{item.category}</span>
                    {item.duration && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{item.duration}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-primary">{item.price} €</span>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 hover:text-primary border border-gray-200 rounded-md">
                        <FaEye />
                      </button>
                      <button 
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                          item.inStock 
                            ? 'bg-primary text-white hover:bg-primary-dark' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!item.inStock}
                      >
                        <FaShoppingCart className="mr-1" />
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Suggestions */}
        {wishlistItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vous pourriez aussi aimer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Exemple de suggestion */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src={`${API_URL_base}storage/spa-treatments/suggestion-1.jpg`} 
                  alt="Soin Détente"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">Enveloppement Algues Marines</h3>
                  <p className="text-sm text-gray-500 mb-2">Soins Corps</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">95 €</span>
                    <button className="text-gray-400 hover:text-red-500">
                      <FaRegHeart />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src={`${API_URL_base}storage/spa-treatments/suggestion-2.jpg`} 
                  alt="Soin Détente"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">Massage Aux Pierres Chaudes</h3>
                  <p className="text-sm text-gray-500 mb-2">Massages</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">140 €</span>
                    <button className="text-gray-400 hover:text-red-500">
                      <FaRegHeart />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src={`${API_URL_base}storage/spa-treatments/suggestion-3.jpg`} 
                  alt="Soin Détente"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">Rituel Hammam Authentique</h3>
                  <p className="text-sm text-gray-500 mb-2">Rituels</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">110 €</span>
                    <button className="text-gray-400 hover:text-red-500">
                      <FaRegHeart />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src={`${API_URL_base}storage/spa-treatments/suggestion-4.jpg`} 
                  alt="Soin Détente"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">Forfait Bien-être Duo</h3>
                  <p className="text-sm text-gray-500 mb-2">Forfaits</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">290 €</span>
                    <button className="text-gray-400 hover:text-red-500">
                      <FaRegHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}