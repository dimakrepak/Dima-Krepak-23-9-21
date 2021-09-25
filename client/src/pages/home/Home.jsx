import Navbar from "../../components/navbar/Navbar";
import Searchbar from "../../components/searchbar/Searchbar";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { updateLocationWeather } from "../../redux/apiCalls";
import { useEffect, useState } from "react";
import axios from "axios";
import "./home.scss";
import LocationCard from "../../components/locationCard/LocationCard";

export default function Home() {
  const locationWeather = useSelector((state) => state.locationWeather);
  const [geoLocation, setGeoLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setGeoLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
      console.log("Available");
    } else {
      console.log("Not Available");
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
        console.log(res.data.Key);
        updateLocationWeather(res.data.Key, dispatch);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    getCurrentPositionLocation();
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
