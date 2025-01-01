import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (property) => {
    const newFavorites = favorites.filter(fav => fav.id !== property.id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Favorite Properties</h2>
        {favorites.length > 0 && (
          <button 
            className="btn btn-danger"
            onClick={clearFavorites}
          >
            Clear All Favorites
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="alert alert-info">
          You haven't saved any properties to your favorites yet.
        </div>
      ) : (
        <div className="row">
          {favorites.map(property => (
            <div key={property.id} className="col-md-4">
              <PropertyCard
                property={property}
                onFavoriteToggle={toggleFavorite}
                isFavorite={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites; 
