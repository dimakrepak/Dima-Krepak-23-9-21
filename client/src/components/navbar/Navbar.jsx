import "./navbar.scss";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        <span>Weather App</span>
      </div>
      <div className="right">
        <div className="navigation">
          <button className="routes">Home</button>
          <button className="routes">Favorites</button>
        </div>
      </div>
    </div>
  );
}
