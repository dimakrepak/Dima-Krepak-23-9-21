import "./navbar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeUnit } from "../../redux/conversionSlice";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const isCelcius = useSelector((state) => state.conversion.isCelcius);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);
  return (
    <div className="navbar">
      <div className="left">
        <span style={{ fontWeight: "600" }}>Weather</span>
      </div>
      <div className="right">
        <ToggleButtonGroup className="navigation">
          <ToggleButton
            className="unit-toggle"
            selected={isCelcius}
            onClick={() => dispatch(changeUnit(true))}
          >
            C
          </ToggleButton>
          <ToggleButton
            className="unit-toggle"
            selected={!isCelcius}
            onClick={() => dispatch(changeUnit(false))}
          >
            F
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup className="navigation">
          <Link className="link" to="/">
            <ToggleButton
              selected={location.pathname === "/"}
              className="routes"
            >
              Home
            </ToggleButton>
          </Link>
          <Link className="link" to="/favorites">
            <ToggleButton
              selected={location.pathname === "/favorites"}
              className="routes"
            >
              Favorites
            </ToggleButton>
          </Link>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
