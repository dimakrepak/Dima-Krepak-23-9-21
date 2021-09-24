import ForecastCard from "../forecastCard/ForecastCard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favoritesSlice";
import "./locationCard.scss";

export default function LocationCard({ currentWeather }) {
  const [isLocationFavorite, setIsLocationFavorite] = useState(false);
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLocationFavorite(favorites.includes(currentWeather?.location.Key));
  }, [favorites, currentWeather]);

  function handleFavorites(action) {
    if (action === "add") {
      dispatch(addToFavorites(currentWeather?.location.Key));
    }
    if (action === "remove") {
      dispatch(removeFromFavorites(currentWeather?.location.Key));
    }
  }
  console.log(isLocationFavorite);
  return (
    <div className="locationCard">
      <div className="start">
        <div className="currentWeather">
          <div className="location">
            <span>
              {`${currentWeather?.location.EnglishName}, ${currentWeather?.location.Country.EnglishName}`}
            </span>
          </div>
          <div className="temperature">
            <span>{`${currentWeather?.currentConditions.Temperature.Metric.Value}° ${currentWeather?.currentConditions.Temperature.Metric.Unit}`}</span>
            <span className="weather-text">
              {currentWeather?.currentConditions.WeatherText}
            </span>
          </div>
        </div>
      </div>
      <div className="end">
        {currentWeather?.dailyForecasts.DailyForecasts.map((forecast, i) => (
          <ForecastCard key={i} day={forecast} />
        ))}
      </div>
      {!isLocationFavorite ? (
        <button
          className="add-favorites"
          onClick={() => handleFavorites("add")}
        >
          Save
        </button>
      ) : (
        <button
          className="add-favorites saved"
          onClick={() => handleFavorites("remove")}
        >
          Saved
        </button>
      )}
    </div>
  );
}
