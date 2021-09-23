import "./searchbar.scss";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../redux/locationWeatherSlice";
import axios from "axios";

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  const [autocomplete, setAutocomplete] = useState([]);
  const [city, setCity] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAutocomplete() {
      try {
        if (searchValue) {
          const res = await axios({
            method: "POST",
            url: "/api/autocomplete/",
            data: { searchValue },
            params: {
              q: searchValue,
            },
          });
          console.log(res.data);
          setAutocomplete(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getAutocomplete();
  }, [searchValue]);

  function handleSearch(city) {
    console.log(city);
    dispatch(update({  city }));
  }
  return (
    <div className="searchbar">
      <div className="searchbar-wrapper">
        <input
          type="text"
          className="input"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="btn-container">
          <button className="search-btn">Search</button>
        </div>
      </div>
      {autocomplete.length > 0 && searchValue && (
        <div className="autocomplete">
          <ul className="cities">
            {autocomplete.map((city) => (
              <li
                className="autocomplete-city"
                key={city.Key}
                onClick={() => handleSearch(city)}
              >
                {city.LocalizedName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
