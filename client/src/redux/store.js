import { configureStore } from "@reduxjs/toolkit";
import locationWeatherReducer from "./locationWeatherSlice";
import favoritesReducer from "./favoritesSlice";
import conversionReducer from "./conversionSlice";

export default configureStore({
  reducer: {
    locationWeather: locationWeatherReducer,
    favorites: favoritesReducer,
    conversion: conversionReducer,
  },
});
