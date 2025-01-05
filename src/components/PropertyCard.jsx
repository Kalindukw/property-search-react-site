import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

/**
 * PropertyCard component displays individual property information
 * @param {Object} props
 * @param {Object} props.property - Property details
 * @param {function} props.onFavoriteToggle - Function to handle favorite toggling
 * @param {boolean} props.isFavorite - Whether the property is favorited
 */
const PropertyCard = ({ property, onFavoriteToggle, isFavorite }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle(property);
  };

  return (
    <div className="relative flex flex-col bg-white rounded-lg shadow-lg overflow-hidden h-full">
      <div className="relative">
        <img 
          src={property.mainImage || "/api/placeholder/400/300"} 
          alt={property.title}
          className="w-full h-48 object-cover"
        /> 
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
        <p className="text-xl font-bold text-blue-600 mb-2">
          {formatPrice(property.price)}
        </p>
        <p className="text-gray-600 text-sm mb-4">
          {property.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex justify-between mb-4 text-sm text-gray-600">
            <span>{property.bedrooms} beds</span>
            <span>{property.bathrooms} baths</span>
            <span>{property.area} sq ft</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="px-2 py-1 bg-gray-200 rounded-md text-sm">
              {property.postcode}
            </span>
            <Link 
              to={`/property/${property.id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;