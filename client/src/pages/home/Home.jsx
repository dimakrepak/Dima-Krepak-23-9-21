import Navbar from "../../components/navbar/Navbar";
import Searchbar from "../../components/searchbar/Searchbar";
import { useSelector } from "react-redux";
import "./home.scss";

export default function Home() {
  const locationWeather = useSelector((state) => state.locationWeather);
  console.log(locationWeather);
  return (
    <div className="home">
      <Navbar />
      <div className="home-container">
        <Searchbar />
        <div className="results"></div>
      </div>
    </div>
  );
}
