import React from "react";
import "/src/styles/DailyForecast.css";
import { useContext } from "react";
import { ContextComponent, mainContext } from "./ContextComponent";

function DailyForecast({ day, minTemp, maxTemp, icon }) {
  const { mode } = useContext(mainContext);
  return (
    <div className="main-daily-div">
      <p>{day}</p>
      {icon ? <img src={icon} alt="weather-type-icon" /> : ""}
      <div className="degrees">
        <p>
          {minTemp
            ? `${mode == "metric" ? `${minTemp}` : `${Number.isInteger(minTemp) ? `${minTemp * 1.8 + 32}` : (minTemp * 1.8 + 32).toFixed(1)}`}°`
            : ""}
        </p>
        <p>
          {maxTemp
            ? `${mode == "metric" ? `${maxTemp}` : `${Number.isInteger(maxTemp) ? `${maxTemp * 1.8 + 32}` : (maxTemp * 1.8 + 32).toFixed(1)}`}°`
            : ""}
        </p>
      </div>
    </div>
  );
}

export default DailyForecast;
