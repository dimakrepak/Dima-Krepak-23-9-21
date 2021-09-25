import "./favoriteCard.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLocationWeather } from "../../redux/apiCalls";

import { removeFromFavorites } from "../../redux/favoritesSlice";
import { useState, useEffect } from "react";
import { DeleteOutline } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";

export default function FavoriteCard({ favoriteLocationKey }) {
  const isCelcius = useSelector((state) => state.conversion.isCelcius);
  const [currentWeather, setCurrentWeather] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleOpenClick() {
    updateLocationWeather(favoriteLocationKey, dispatch);
    history.push("/", { fromFavorite: true });
  }
  function handleDeleteClick() {
    dispatch(removeFromFavorites(favoriteLocationKey));
  }
  useEffect(() => {
    async function getCurrentWeather() {
      try {
        setIsLoading(true);
        const res = await axios({
          method: "GET",
          url: "/api/weather/" + favoriteLocationKey,
          params: {
            type: "current",
          },
        });
        setCurrentWeather(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(true);
      }
    }
    getCurrentWeather();
  }, [favoriteLocationKey]);
  return (
    <div className="favoriteCard">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="city">
            <span>{`${currentWeather?.location?.LocalizedName}, ${currentWeather?.location?.Country?.EnglishName}`}</span>
          </div>
          <div className="currentWeather">
            {isCelcius ? (
              <>
                <span>{`${Math.round(
                  ((currentWeather?.currentConditions?.Temperature.Imperial
                    .Value -
                    32) *
                    5) /
                    9
                )}° `}</span>
                <span>{`C`}</span>
              </>
            ) : (
              <>
                <span>{`${currentWeather?.currentConditions?.Temperature.Imperial.Value}° `}</span>
                <span>{`${currentWeather?.currentConditions?.Temperature.Imperial.Unit}`}</span>
              </>
            )}
          </div>
          <button className="open" onClick={handleOpenClick}>
            Open
          </button>
          <DeleteOutline className="delete" onClick={handleDeleteClick} />
        </>
      )}
    </div>
  );
}
