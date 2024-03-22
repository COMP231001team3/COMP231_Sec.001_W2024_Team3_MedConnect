import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './header.css';


{/*the header of the application where there is a search bar*/}

function Header() {
  return (
    <header className="header">
      <div className="headerContainer">
        <div className="headerImg"></div>
          <form className="d-flex">
            <div className="search-bar">  
            <input className="searchInput" type="search" placeholder="Search" aria-label="Search" />
            <button className="btnsearch" type="submit">Search</button>
            </div>
          </form>
        </div>
    </header>
  );
}

export default Header;

