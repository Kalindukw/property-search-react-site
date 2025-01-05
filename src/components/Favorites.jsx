import React from 'react';
import PropertyCard from './PropertyCard';

/**
 * Favorites component displays all favorited properties
 * @param {Object} props
 * @param {Array} props.favorites - Array of favorited properties
 * @param {function} props.onFavoriteToggle - Function to handle favorite toggling
 * @param {function} props.clearFavorites - Function to clear all favorites
 */
const Favorites = ({ favorites = [], onFavoriteToggle, clearFavorites }) => {
  if (!favorites.length) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
        <p className="text-gray-600 mb-4">
          You haven't added any properties to your favorites yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Favorites</h1>
        <button
          onClick={clearFavorites}
          className="px-4 py-2 bg-red-500 text-black rounded-md hover:bg-red-600 transition-colors mb-"
        >
          Clear All Favorites
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(property => (
          <PropertyCard
            key={property.id}
            property={property}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;