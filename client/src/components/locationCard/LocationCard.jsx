import FavoriteCard from "../favoriteCard/FavoriteCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favoritesSlice";
import "./locationCard.scss";

export default function LocationCard({ currentWeather }) {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  function handleFavorites() {
    console.log("click");
    dispatch(addToFavorites(currentWeather));
  }
  return (
    <div className="locationCard">
      <div className="start">
        <div className="currentWeather">
          <div className="location">
            <span>
              {`${currentWeather.location.EnglishName}, ${currentWeather.location.Country.EnglishName}`}
            </span>
          </div>
          <div className="icon">ICON</div>
          <div className="temperature">
            <span>{`${currentWeather.currentConditions.Temperature.Metric.Value} ${currentWeather.currentConditions.Temperature.Metric.Unit}`}</span>
            <span>{currentWeather.currentConditions.WeatherText}</span>
          </div>
        </div>
      </div>
      <div className="end">
        <FavoriteCard day={currentWeather.dailyForecasts.DailyForecasts[0]} />
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
      </div>
      <button className="add-favorites" onClick={handleFavorites}>
        Add to favorites
      </button>
    </div>
  );
}
