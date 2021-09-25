import moment from "moment";
import "./forecastCard.scss";
import { useSelector } from "react-redux";

export default function FavoriteCard({ day }) {
  const isCelcius = useSelector((state) => state.conversion.isCelcius);
  return (
    <div className="forecastCard">
      <div className="day">
        <span className="week-day">
          {moment(day?.Date, "YYYY-MM-DD HH:mm:ss").format("dddd")}
        </span>
        <span className="small">{`Day: ${day?.Day.IconPhrase}`}</span>
        <span className="small">{`Night: ${day?.Night.IconPhrase}`}</span>
      </div>
      <div className="temperature">
        {isCelcius ? (
          <>
            <span className="t-max">
              {Math.round(((day?.Temperature.Maximum.Value - 32) * 5) / 9) +
                "°"}
            </span>
            <span className="t-min">
              {Math.round(((day?.Temperature.Minimum.Value - 32) * 5) / 9) +
                "°"}
            </span>
          </>
        ) : (
          <>
            <span className="t-max">
              {day?.Temperature.Maximum.Value + "°"}
            </span>
            <span className="t-min">
              {day?.Temperature.Minimum.Value + "°"}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
