import React from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';

function Home() {
  const handleSearch = (criteria) => {
    
    console.log('Search criteria:', criteria);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="text-center mb-5">
            <h1 className="display-4 mb-4">Find Your Dream Home</h1>
            <p className="lead">
              Search through our extensive collection of properties
            </p>
          </div>
          
          <SearchForm onSearch={handleSearch} />

          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card text-center mb-4">
                <div className="card-body">
                  <h3>Buy a Home</h3>
                  <p>Find your place with an immersive photo experience</p>
                  <Link to="/properties" className="btn btn-primary">
                    Browse Homes
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-center mb-4">
                <div className="card-body">
                  <h3>Sell a Home</h3>
                  <p>List your property with us for the best exposure</p>
                  <button className="btn btn-primary">Contact Us</button>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-center mb-4">
                <div className="card-body">
                  <h3>Saved Homes</h3>
                  <p>View your favorite properties all in one place</p>
                  <Link to="/favorites" className="btn btn-primary">
                    View Favorites
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 