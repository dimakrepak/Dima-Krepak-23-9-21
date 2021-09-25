import "./favoriteCard.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLocationWeather } from "../../redux/apiCalls";
import { removeFromFavorites } from "../../redux/favoritesSlice";
import { useState, useEffect } from "react";
import { DeleteOutline } from "@material-ui/icons";

export default function FavoriteCard({ favoriteLocationKey }) {
  const [currentWeather, setCurrentWeather] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  function handleOpenClick() {
    updateLocationWeather(favoriteLocationKey, dispatch);
    history.push({ pathname: "/" });
  }
  function handleDeleteClick() {
    dispatch(removeFromFavorites(favoriteLocationKey));
  }
  useEffect(() => {
    async function getCurrentWeather() {
      try {
        const res = await axios({
          method: "GET",
          url: "/api/weather/" + favoriteLocationKey,
          params: {
            type: "current",
          },
        });
        setCurrentWeather(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getCurrentWeather();
  }, []);
  return (
    <div className="favoriteCard">
      <div className="city">
        <span>{`${currentWeather?.location?.LocalizedName}, ${currentWeather?.location?.Country?.EnglishName}`}</span>
      </div>
      <div className="currentWeather">
        <span>{`${currentWeather?.currentConditions?.Temperature.Imperial.Value}° `}</span>
        <span>{`${currentWeather?.currentConditions?.Temperature.Imperial.Unit}`}</span>
      </div>
      <button className="open" onClick={handleOpenClick}>
        Open
      </button>
      <DeleteOutline className="delete" onClick={handleDeleteClick} />
    </div>
  );
}
