import Navbar from "../../components/navbar/Navbar";
import "./favorites.scss";
import { useSelector } from "react-redux";
import FavoriteCard from "../../components/favoritesCard/FavoriteCard";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <div className="favorites">
      <Navbar />
      <div className="favorites-container">
        {favorites.map((favorite) => (
          <FavoriteCard key={favorite} favoriteLocationKey={favorite} />
        ))}
      </div>
    </div>
  );
}
