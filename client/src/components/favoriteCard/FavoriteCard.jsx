import moment from "moment";
import "./favoriteCard.scss";

export default function FavoriteCard({ day }) {
  console.log(day);
  return (
    <div className="favoriteCard">
      <div className="day">
        <span>{moment(day?.Date, "YYYY-MM-DD HH:mm:ss").format("dddd")}</span>
      </div>
      <div className="day">
        <span>{`Day: ${day?.Day.IconPhrase}`}</span>
      </div>
      <div className="night">
      <span>{`Night: ${day?.Night.IconPhrase}`}</span>
      </div>
      <div className="temperature">
        <span>
          {`${day?.Temperature.Maximum.Value} ${day?.Temperature.Minimum.Value} ${day?.Temperature.Minimum.Unit}`}
        </span>
      </div>
    </div>
  );
}
