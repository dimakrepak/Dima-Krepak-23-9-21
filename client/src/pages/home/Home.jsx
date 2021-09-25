import Navbar from "../../components/navbar/Navbar";
import Searchbar from "../../components/searchbar/Searchbar";
import { useLocation, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { updateLocationWeather } from "../../redux/apiCalls";
import { useEffect, useState } from "react";
import axios from "axios";
import "./home.scss";
import LocationCard from "../../components/locationCard/LocationCard";

export default function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const locationWeather = useSelector((state) => state.locationWeather);
  const [geoLocation, setGeoLocation] = useState({
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setGeoLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Location Not Available");
    }
  }, []);
  useEffect(() => {
    async function getCurrentPositionLocation() {
      try {
        const res = await axios({
          method: "GET",
          url: "/api/geolocation/",
          params: {
            q: `${geoLocation.latitude},${geoLocation.longitude}`,
          },
        });
        updateLocationWeather(res.data.Key, dispatch);
      } catch (e) {
        console.log(e);
      }
    }
    if (geoLocation.longitude && geoLocation.latitude) {
      if (!location.state.fromFavorite) {
        getCurrentPositionLocation();
      } else {
        history.replace("/", { fromFavorite: false });
      }
    }
  }, [geoLocation]);


  return (
    <div className="home">
      <Navbar />
      <div className="home-container">
        <Searchbar />
        {!locationWeather.weather || locationWeather.pending ? (
          <CircularProgress style={{ marginTop: "50px" }} />
        ) : (
          <LocationCard currentWeather={locationWeather.weather} />
        )}
      </div>
    </div>
  );
}
