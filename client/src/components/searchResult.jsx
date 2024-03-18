import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './searchResult.css';

function SearchResult() {
  return (
    <section className='searchResultSection'> 
      <div className='searchResultDiv'>
        <div className='Filter'>
        <h3>Filter</h3>
        <button className="filtro-btn">Condition 1</button>
        <button className="filtro-btn">Condition 2</button>
        <button className="filtro-btn">Condition 3</button>
        <button className="filtro-btn">Condition 4</button>
        <button className="filtro-btn">Condition 5</button>
        </div>
        <div className='resultContent'>
          <div className="resultItem">
              <img src="logo.jpg" alt="Imagem 1"/>
              <div>
                <h3>Pedro Henrique</h3>
                <p> Location: Calgary <br/>Clinic: Get Well, MyDoc <br/>Speciality: Dermatologist</p>
                <p>Rating: 4.5/5</p>
              </div>
            </div>
            <div className="resultItem">
            <img src="logo.jpg" alt="Imagem 1"/>
            <div>
              <h3>John Doe</h3>
              <p> Location: Calgary <br/>Clinic: Get Well, MyDoc <br/>Speciality: Dermatologist</p>
              <p>Rating: 4.5/5</p>
            </div>
            </div>
            <div className="resultItem">
            <img src="logo.jpg" alt="Imagem 1"/>
            <div>
              <h3>Bruna Silva</h3>
              <p> Location: Calgary <br/>Clinic: Get Well, MyDoc <br/>Speciality: Dermatologist</p>
              <p>Rating: 4.5/5</p>
            </div>
          </div>
        </div>
        </div>
    </section>
  );
  }


  export default SearchResult ;