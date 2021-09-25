import { createSlice } from "@reduxjs/toolkit";
export const conversionSlice = createSlice({
  name: "conversion",
  initialState: {
    isCelcius: JSON.parse(localStorage.getItem("conversion")) || null,
  },
  reducers: {
    changeUnit: (state, action) => {
      state.isCelcius = action.payload;
      localStorage.setItem("conversion", JSON.stringify(state.isCelcius));
    },
  },
});
export const { changeUnit } = conversionSlice.actions;
export default conversionSlice.reducer;
