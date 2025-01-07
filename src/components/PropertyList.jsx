import React from "react";
import { Link } from "react-router-dom";

const PropertyList = ({ properties, favorites = [], onFavoriteToggle }) => {
  //  format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  //  format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(price);
  };

  // Check if a property is in favorites
  const isPropertyFavorite = (propertyId) => {
    return favorites.some(fav => fav.id === propertyId);
  };

  return (
    <div className="row g-4">
      {properties && properties.map((property) => (
        <div key={property.id} className="col-md-4">
          <div className="card h-100">
            <img
              src={property.images[0]}
              className="card-img-top"
              alt={property.title}
              style={{ height: '200px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />
            <div className="card-body">
              <h5 className="card-title">{property.title}</h5>
              <p className="card-text">
                <small className="text-muted">
                  {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                </small>
              </p>
              <p className="card-text">
                {property.bedrooms} bed • {property.bathrooms} bath
              </p>
              <p className="card-text">
                <strong>{formatPrice(property.price)}</strong>
              </p>
              <p className="card-text">
                <small className="text-muted">
                  Added: {formatDate(property.dateAdded)}
                </small>
              </p>
              <p className="card-text">
                <small className="text-muted">
                  {property.postcode}
                </small>
              </p>
            </div>
            <div className="card-footer bg-white border-top-0">
              <div className="d-flex justify-content-between align-items-center gap-2">
                <Link 
                  to={`/property/${property.id}`} 
                  className="btn btn-primary"
                >
                  View Details
                </Link>
                <button
                  onClick={() => onFavoriteToggle(property)}
                  className={`btn ${isPropertyFavorite(property.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                >
                  {isPropertyFavorite(property.id) ? 'Remove Favorite' : 'Add Favorite'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {(!properties || properties.length === 0) && (
        <div className="col-12">
          <div className="alert alert-info text-center">
            No properties found matching your criteria.
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyList;