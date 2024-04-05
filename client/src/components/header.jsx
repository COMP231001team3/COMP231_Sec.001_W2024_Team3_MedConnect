import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './header.css';

function Header() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // To control the dropdown display

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    if (!value) {
      // If the input is empty, hide the dropdown and clear results
      setShowDropdown(false);
      setSearchResults([]);
    } else {
      // Fetch results 
      fetchSearchResults(value);
    }
  };

  const fetchSearchResults = async (query) => {
    setIsLoading(true);
    try {
      
      const response = await fetch(`http://localhost:5000/doctors/search?query=${query}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      setSearchResults(data);
      setShowDropdown(true); // Show results
    } catch (error) {
      console.error('Search error:', error);
      setShowDropdown(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Hide dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-bar')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="headerContainer">
        <div className="headerImg"></div>
        <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
          <div className="search-bar">
            <input
              className="searchInput"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchInput}
              onChange={handleInputChange}
            />
            <Link to={`/ListDoctors?results=${encodeURIComponent(JSON.stringify(searchResults))}`}>
              Search
            </Link>
            {isLoading && <div>Loading...</div>}
            {showDropdown && (
              <div className="search-dropdown">
                {searchResults.map((doctor) => (
                  <div key={doctor._id} className="dropdown-item">
                    {doctor.name} - {doctor.specialization}
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </header>
  );
}

export default Header;
