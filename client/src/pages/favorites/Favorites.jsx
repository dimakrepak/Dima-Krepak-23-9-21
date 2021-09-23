import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import "./favorites.scss";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  console.log(favorites);
  return (
    <div className="favorites">
      <Navbar />
      <div className="favorites-container">
        <div className="card"></div>
      </div>
    </div>
  );
}
