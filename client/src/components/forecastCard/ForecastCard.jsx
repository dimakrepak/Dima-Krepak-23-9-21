import moment from "moment";
import "./forecastCard.scss";

export default function FavoriteCard({ day }) {
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
        <span className="t-max">{day?.Temperature.Maximum.Value + "°"}</span>
        <span className="t-min">{day?.Temperature.Minimum.Value + "°"}</span>
      </div>
    </div>
  );
}
