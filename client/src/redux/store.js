import { configureStore } from "@reduxjs/toolkit";
import locationWeatherReducer from "./locationWeatherSlice";

export default configureStore({
  reducer: {
    locationWeather: locationWeatherReducer,
  },
});
