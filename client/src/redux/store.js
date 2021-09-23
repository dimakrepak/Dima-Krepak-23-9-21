import { configureStore } from "@reduxjs/toolkit";
import locationWeatherReducer from "./locationWeatherSlice";
import favoritesReducer from "./favoritesSlice";

export default configureStore({
  reducer: {
    locationWeather: locationWeatherReducer,
    favorites: favoritesReducer,
  },
});
