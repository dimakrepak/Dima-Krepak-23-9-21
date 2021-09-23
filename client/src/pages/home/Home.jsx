import Navbar from "../../components/navbar/Navbar";
import Searchbar from "../../components/searchbar/Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { updateLocationWeather } from "../../redux/apiCalls";
import { useEffect, useState } from "react";
import "./home.scss";
import LocationCard from "../../components/locationCard/LocationCard";

export default function Home() {
  const locationWeather = useSelector((state) => state.locationWeather);
  const dispatch = useDispatch();

  useEffect(() => {
    //Tel Aviv Default
    if (JSON.parse(localStorage.getItem("defaultWeather")) === null) {
      updateLocationWeather("215854", dispatch);
      //Sending to localStorage
      localStorage.setItem(
        "defaultWeather",
        JSON.stringify(locationWeather.weather)
      );
    }
  }, [locationWeather]);
  console.log(locationWeather);
  return (
    <div className="home">
      <Navbar />
      <div className="home-container">
        <Searchbar />
        <LocationCard currentWeather={locationWeather.weather} />
      </div>
    </div>
  );
}
