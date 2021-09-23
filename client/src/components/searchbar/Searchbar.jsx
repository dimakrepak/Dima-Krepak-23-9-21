import "./searchbar.scss";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { updateLocationWeather } from "../../redux/apiCalls";

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  const [autocomplete, setAutocomplete] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAutocomplete() {
      try {
        if (searchValue) {
          const res = await axios({
            method: "GET",
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

  async function handleSearch(city) {
    updateLocationWeather(city, dispatch);
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
