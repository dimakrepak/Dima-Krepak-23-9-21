import "./navbar.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        <span>Weather App</span>
      </div>
      <div className="right">
        <div className="navigation">
          <Link to="/">
            <button className="routes">Home</button>
          </Link>
          <Link to="/favorites">
            <button className="routes">Favorites</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
