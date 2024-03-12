import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/login.jsx'
import SignUp from './components/signup.jsx'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/sign-in" element={ <Login /> } />
          <Route path="/sign-up" element={ <SignUp /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
