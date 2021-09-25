import "./searchbar.scss";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateLocationWeather } from "../../redux/apiCalls";
import { Search } from "@material-ui/icons";
import axios from "axios";

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  const [autocomplete, setAutocomplete] = useState([]);
  const [isEnglish, setIsEnglish] = useState(true);
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
          setAutocomplete(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getAutocomplete();
  }, [searchValue]);
  useEffect(() => {
    if (searchValue) {
      setIsEnglish(/^[a-z]+$/i.test(searchValue));
    }
  }, [searchValue]);

  async function handleSearch(city) {
    updateLocationWeather(city?.Key, dispatch);
    setAutocomplete([]);
    setSearchValue("");
  }

  return (
    <div className="searchbar">
      <div className="searchbar-wrapper">
        <input
          type="text"
          value={isEnglish ? searchValue : ""}
          className="input"
          placeholder={isEnglish ? "Search for a city" : "English letters only"}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="btn-container">
          <Search className="search-btn" />
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
