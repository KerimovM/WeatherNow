import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { mainContext } from "./ContextComponent";
import "/src/styles/Search.css";
import ErrorCard from "./ErrorCard";
function Search() {
  const {
    recentSearches,
    setRecentSearches,
    input,
    setInput,
    error,
    setError,
    mainWeatherPropsObject,
    setMainWeatherPropsObject,
    optionSelectedBoolean,
    setOptionSelectedBoolean,
    selectedCountry,
    setSelectedCountry,
    apiError,
    setApiError,
    setResultNotFound,
    resultNotFound,
  } = useContext(mainContext);
  const [hideError, setHideError] = useState(false);
  const [response, setResponse] = useState([]);
  const inputRef = useRef(null);
  useEffect(() => {
    getWeatherProps();
    setResultNotFound(false);
  }, [selectedCountry]);
  // useEffect(() => {
  //    if (!mainWeatherPropsObject) return;
  //    console.log(mainWeatherPropsObject);
  // }, mainWeatherPropsObject);
  function submitHandler(e) {
    e.preventDefault();

    if (inputRef.current) {
      inputRef.current.focus();
    }
    !input
      ? (setError(true),
        setTimeout(() => {
          setError(false);
        }, 1430))
      : getCoordinates();
  }
  function selectingCountry(e) {
    setSelectedCountry(response[e.target.id]);
    getWeatherProps();
    setOptionSelectedBoolean(true);
    setResponse([]);
    setInput("");
  }

  const getCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=4&language=en&format=json`,
      );
      setResponse(response.data.results);
    } catch (error) {
      setApiError(true);
    }
  };

  const getWeatherProps = async () => {
    if (!selectedCountry) return;
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedCountry.latitude}&longitude=${selectedCountry.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&hourly=temperature_2m,apparent_temperature,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=7&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm`,
      );
      setMainWeatherPropsObject(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="search">
      {error ? <ErrorCard /> : null}
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="search-bar">
          <img
            src="/images/icon-search.svg"
            alt="search-icon"
            id="searchIcon"
          />
          <input
            type="text"
            id="input"
            ref={inputRef}
            value={input}
            placeholder="Search for a place..."
            onChange={(e) => setInput(e.target.value)}
          />

          {response ? (
            response.length > 0 ? (
              <div className="search-dropdown">
                <ul onClick={(e) => selectingCountry(e)}>
                  {response &&
                    response.map((city, index) => (
                      <li id={index} key={index}>
                        {city.name}, {city.country}
                      </li>
                    ))}
                </ul>
              </div>
            ) : (
              <div className="search-dropdown">
                <img src="/images/icon-loading.svg" alt="loading-icon" />
                Search in progress
              </div>
            )
          ) : (
            setResultNotFound(true) //!this part is where response length == 0
          )}
        </div>

        <div className="btn-div">
          <input type="submit" id="submit-btn" value={"Search"} />
        </div>
      </form>
    </div>
  );
}

export default Search;
