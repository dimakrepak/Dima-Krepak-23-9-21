import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import "./favorites.scss";
import FavoriteCard from "../../components/forecastCard/ForecastCard";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites.favorites);
  console.log(favorites);
  return (
    <div className="favorites">
      <Navbar />
      <div className="favorites-container">
        {favorites.map((favorite) => {
          // <FavoriteCard favoriteLocationKey={favorite} />;
        })}
      </div>
    </div>
  );
}
