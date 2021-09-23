import { createSlice } from "@reduxjs/toolkit";

export const locationWeatherSlice = createSlice({
  name: "locationWeather",
  initialState: {
    weather: JSON.parse(localStorage.getItem("defaultWeather")) || null,
    pending: false,
    error: false,
  },
  reducers: {
    updateStart: (state) => {
      state.pending = true;
    },
    updateSuccess: (state, action) => {
      state.pending = false;
      state.weather = action.payload;
    },
    updateError: (state) => {
      state.error = true;
      state.pending = false;
    },
  },
});
export const { updateStart, updateSuccess, updateError } =
  locationWeatherSlice.actions;

export default locationWeatherSlice.reducer;
