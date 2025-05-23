import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">🏨 Hoteles Embrujados 👻</span>
      </div>
      <div className="navbar-right">
        <ul className="navbar-menu">
          <li><Link to="/client">Inicio</Link></li>
          <li><Link to="/client">Mis reservaciones</Link></li>
        </ul>
        <input
          type="text"
          placeholder="Buscar hoteles..."
          value={query}
          onChange={handleChange}
          className="navbar-search"
        />
      </div>
    </nav>
  );
};

export default Navbar;
