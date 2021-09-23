import {
  updateStart,
  updateSuccess,
  updateError,
} from "./locationWeatherSlice";
import axios from "axios";

export const updateLocationWeather = async (city, dispatch) => {
  dispatch(updateStart());
  try {
    const res = await axios({
      method: "GET",
      url: "/api/weather/" + city?.Key,
    });
    console.log(res.data);
    dispatch(updateSuccess(res.data));
  } catch (err) {
    dispatch(updateError(err));
  }
};
