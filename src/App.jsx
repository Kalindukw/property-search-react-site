import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';  
import SearchForm from "./components/SearchForm.jsx";
import PropertyList from "./components/PropertyList.jsx";
import PropertyDetail from "./components/PropertyDetails.jsx";
import Favorites from "./components/Favorites.jsx";
import { properties as propertiesData } from "./data/properties.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Filter properties utility function
const filterProperties = (properties, filters) => {
  return properties.filter((property) => {
    const matchType =
      !filters.type || filters.type === "any" || property.type === filters.type;

    const matchPrice =
      (!filters.minPrice || property.price >= parseInt(filters.minPrice)) &&
      (!filters.maxPrice || property.price <= parseInt(filters.maxPrice));

    const matchBedrooms =
      (!filters.minBedrooms || property.bedrooms >= parseInt(filters.minBedrooms)) &&
      (!filters.maxBedrooms || property.bedrooms <= parseInt(filters.maxBedrooms));

    const matchPostcode =
      !filters.postcode ||
      property.postcode.toLowerCase().startsWith(filters.postcode.toLowerCase());

    return matchType && matchPrice && matchBedrooms && matchPostcode;
  });
};

// Layout component
const Layout = ({ properties, favorites, handleSearch, onFavoriteToggle, clearFavorites }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Navbar />
        <main className="py-4">
          <Container>
            <Outlet
              context={{
                properties,
                favorites,
                handleSearch,
                onFavoriteToggle,
                clearFavorites,
              }}
            />
          </Container>
        </main>
        <footer className="bg-light py-4 mt-auto">
          <Container>
            <div className="row">
              <div className="col-md-6">
                <p className="mb-0">© 2024 Real Estate App. All rights reserved.</p>
              </div>
              <div className="col-md-6 text-md-end">
                <a href="#" className="text-decoration-none text-muted me-3">Privacy Policy</a>
                <a href="#" className="text-decoration-none text-muted me-3">Terms of Service</a>
                <a href="#" className="text-decoration-none text-muted">Contact Us</a>
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </DndProvider>
  );
};

function App() {
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleSearch = (filters) => {
    const filtered = filterProperties(propertiesData, filters);
    setFilteredProperties(filtered);
  };

  const handleFavoriteToggle = (property) => {
    const newFavorites = favorites.find(fav => fav.id === property.id)
      ? favorites.filter(fav => fav.id !== property.id)
      : [...favorites, property];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={
          <Layout
            properties={filteredProperties}
            favorites={favorites}
            handleSearch={handleSearch}
            onFavoriteToggle={handleFavoriteToggle}
            clearFavorites={clearFavorites}
          />
        }
      >
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/properties"
          element={
            <>
              <SearchForm onSearch={handleSearch} />
              <PropertyList
                properties={filteredProperties}
                favorites={favorites}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </>
          }
        />
        <Route
          path="/property/:id"
          element={<PropertyDetail />}
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              onFavoriteToggle={handleFavoriteToggle}
              clearFavorites={clearFavorites}
            />
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App; 