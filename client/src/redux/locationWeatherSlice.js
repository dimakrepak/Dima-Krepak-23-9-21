import { createSlice } from "@reduxjs/toolkit";

export const locationWeatherSlice = createSlice({
  name: "locationWeather",
  initialState: {
    city: "Tel Aviv",
    celcius: "20c",
  },
  reducers: {
    update: (state, action) => {
      state.city = action.payload.city;
      state.celcius = action.payload.celcius;
    },
  },
});
export const { update } = locationWeatherSlice.actions;
export default locationWeatherSlice.reducer;
