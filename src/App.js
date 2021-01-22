import React from 'react';
import Utama from './Component/utama';
import './App.css';
import { Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link"><Link to="/agenda">Agenda</Link></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" ><Link to="/keranjang">Keranjang</Link></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" ><Link to="/Buku">Buku</Link></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" ><Link to="/latihan">Latihan</Link></a>
            </li>
          </ul>
        </div>
      </nav>
      <p><Utama /></p>
    </div>
  );
}

export default App;
