import React from "react";
import "/src/styles/MainHero.css";
import { useContext } from "react";
import { ContextComponent, mainContext } from "./ContextComponent";
function MainHero({ currentTemp, formattedDate, getWeatherIcon }) {
  const { mainWeatherPropsObject, selectedCountry, mode } =
    useContext(mainContext);
  return (
    <div>
      {mainWeatherPropsObject ? (
        <div className="mainHero">
          <picture>
            <source
              media="(max-width: 480px)"
              srcSet="/images/bg-today-small.svg"
              className="hero-weather-icon"
            />

            <img
              src="/images/bg-today-large.svg"
              alt="Weather background"
              className="hero-weather-icon"
            />
          </picture>
          <div className="today">
            <div className="place-name">
              {selectedCountry.name}, {selectedCountry.country}
            </div>
            <div className="todays-date">{formattedDate}</div>
          </div>
          <div className="degree-div">
            <img
              src={getWeatherIcon(
                mainWeatherPropsObject?.current?.weather_code,
              )}
              alt="weather-icon"
              width={"100px"}
            />
            <p>
              {currentTemp
                ? `${mode == "metric" ? `${currentTemp}` : `${Number.isInteger(currentTemp) ? `${currentTemp * 1.8 + 32}` : (currentTemp * 1.8 + 32).toFixed(1)}`}°`
                : ""}
            </p>
          </div>
        </div>
      ) : (
        <div className="mainHeroLoading">
          <img
            src="/images/loading-dots.svg"
            alt="loading-animation"
            width={"120px"}
          />
          <p id="loading-txt">Search for a place...</p>
        </div>
      )}
    </div>
  );
}

export default MainHero;
