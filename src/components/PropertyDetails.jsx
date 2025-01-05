import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { properties } from '../data/properties';
import ImageGallery from './ImageGallery';

import PropertyMap from "./PropertyMap"
function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('description');

  if (!property) {
    return <div className="container">Property not found</div>;
  }
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          {/* <img
            src={property.Main}
            alt={property.title}
            className="property-detail-image mb-4"
          /> */}
          
          <ImageGallery images={property.images} />
        </div>

        <div className="col-md-4">
          <h2>{property.title}</h2>
          <h3 className="text-primary">£{property.price.toLocaleString()}</h3>
          <p>{property.description}</p>
          <ul className="list-unstyled">
            <li>Bedrooms: {property.bedrooms}</li>
            <li>Bathrooms: {property.bathrooms}</li>
            <li>Area: {property.area} sq ft</li>
            <li>Postcode: {property.postcode}</li>
          </ul>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'map' ? 'active' : ''}`}
                onClick={() => setActiveTab('map')}
              >
                Map
              </button>
            </li>
          </ul>

          <div className="tab-content mt-3">
            {activeTab === 'description' && (
              <div>{property.longDescription}</div>
            )}
            {activeTab === 'map' && (
              // <div style={{ height: '400px', width: '100%' }}>
              //   <GoogleMapReact
              //     bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
              //     defaultCenter={property.location}
              //     defaultZoom={15}
              //   >
              //     <div
              //       lat={property.location.lat}
              //       lng={property.location.lng}
              //       className="map-marker"
              //     />
              //   </GoogleMapReact>
              // </div>
              <PropertyMap
               location={property.location} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail; 