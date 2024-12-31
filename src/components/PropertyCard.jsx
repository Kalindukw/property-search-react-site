import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBed, faBath, faRuler } from '@fortawesome/free-solid-svg-icons';

function PropertyCard({ property, onFavoriteToggle, isFavorite }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent link navigation
    onFavoriteToggle(property);
  };

  return (
    <div className="card property-card mb-4 h-100">
      <div className="position-relative">
        <img 
          src={property.mainImage} 
          className="card-img-top" 
          alt={property.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <button 
          className={`btn position-absolute top-0 end-0 m-2 ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
          onClick={handleFavoriteClick}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{property.title}</h5>
        <h6 className="card-subtitle mb-2 text-primary fw-bold">
          {formatPrice(property.price)}
        </h6>
        <p className="card-text text-muted small">
          {property.description}
        </p>
        <div className="mt-auto">
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted small">
              <FontAwesomeIcon icon={faBed} className="me-1" />
              {property.bedrooms} beds
            </span>
            <span className="text-muted small">
              <FontAwesomeIcon icon={faBath} className="me-1" />
              {property.bathrooms} baths
            </span>
            <span className="text-muted small">
              <FontAwesomeIcon icon={faRuler} className="me-1" />
              {property.area} sq ft
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="badge bg-secondary">
              {property.postcode}
            </span>
            <Link 
              to={`/property/${property.id}`} 
              className="btn btn-outline-primary"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard; 