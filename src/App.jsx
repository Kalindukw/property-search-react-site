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
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/SignUp';

// Filter properties utility function
const filterProperties = (properties, filters) => {
  console.log("properties", properties);
  console.log("filters", filters);
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
  // Initialize filtered properties state
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);
  
  // Initialize favorites with proper error handling
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return [];
    }
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log('Favorites saved:', favorites);
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  const handleSearch = (filters) => {
    const filtered = filterProperties(propertiesData, filters);
    setFilteredProperties(filtered);
  };

  const handleFavoriteToggle = (property) => {
    console.log('Received property:', property); // Check the full property object
    if (!property || !property.id) {
      console.error('Invalid property object passed to toggle:', property);
      return;
    }
  
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === property.id);
      if (isAlreadyFavorite) {
        console.log('Removing favorite:', property.id);
        return prevFavorites.filter((fav) => fav.id !== property.id);
      } else {
        console.log('Adding favorite:', property.id);
        return [...prevFavorites, property];
      }
    });
  };
  
  

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
    console.log('Favorites cleared');
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
        <Route path="/" element={<Home handleFavoriteToggle={handleFavoriteToggle} />} />
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
        <Route path="/property/:id" element={<PropertyDetail />} />
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
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;