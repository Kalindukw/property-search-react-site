import React, { useState } from 'react';
import PropertyList from './PropertyList';
import propertiesData from '../data/properties.json';
import SearchForm from './SearchForm';

const Home = ({handleFavoriteToggle}) => {
  // State to manage the list of properties matching the search criteria
  const [searchResults, setSearchResults] = useState(propertiesData.properties);
  const [favorites, setFavorites] = useState([]);

  // Function to handle property search based on user input criteria
  const handleSearch = (searchCriteria) => {
    const filtered = propertiesData.properties.filter(property => {
      // Filter properties by type if a type is specified
      if (searchCriteria.type && property.type !== searchCriteria.type) {
        return false;
      }
      if (searchCriteria.minPrice && property.price < searchCriteria.minPrice) {
        return false;
      }
      if (searchCriteria.maxPrice && property.price > searchCriteria.maxPrice) {
        return false;
      }
      if (searchCriteria.minBedrooms && property.bedrooms < searchCriteria.minBedrooms) {
        return false;
      }
      if (searchCriteria.maxBedrooms && property.bedrooms > searchCriteria.maxBedrooms) {
        return false;
      }
      if (searchCriteria.postcode &&
          !property.postcode.toLowerCase().startsWith(searchCriteria.postcode.toLowerCase())) {
        return false;
      }
      // Filter properties added before the specified date
      if (searchCriteria.dateAdded) {
        const propertyDate = new Date(property.dateAdded); // Parse property date
        const searchDate = new Date(
          searchCriteria.dateAdded.year,
          searchCriteria.dateAdded.month,
          searchCriteria.dateAdded.day
        );
        if (propertyDate < searchDate) {
          return false;
        }
      }
      return true;
    });
    //Update the state with the filtered results
    setSearchResults(filtered);
  };

  

  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h1 className="display-4 mb-4">Find Your Dream Home</h1>
            <p className="lead mb-5">
              Discover the perfect property with DreamKey Realty. 
              We make finding your ideal home simple and enjoyable.
            </p>
          </div>
        </div>
        
        {/* Search Form */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <SearchForm onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">Properties Found: {searchResults.length}</h2>
            <PropertyList 
              properties={searchResults} 
              favorites={favorites} 
              onFavoriteToggle={handleFavoriteToggle} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
