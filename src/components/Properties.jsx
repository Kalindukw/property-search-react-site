import React from 'react';

const Properties = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Our Properties</h1>
      <div className="row g-4">
        {/* Sample Property Card */}
        <div className="col-md-4">
          <div className="card property-card">
            <img 
              src="https://via.placeholder.com/300x200" 
              className="card-img-top" 
              alt="Property"
            />
            <div className="card-body">
              <h5 className="card-title">Modern Apartment</h5>
              <p className="card-text">3 Bed | 2 Bath | 1,500 sqft</p>
              <p className="price">$350,000</p>
              <button className="btn btn-primary w-100">View Details</button>
            </div>
          </div>
        </div>

        {/* Add more property cards as needed */}
      </div>
    </div>
  );
};

export default Properties; 