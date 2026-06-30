import React from "react";
import "/src/styles/WeatherPerHour.css";
import { useContext } from "react";
import { ContextComponent, mainContext } from "./ContextComponent";
import { useState } from "react";
function WeatherPerHour({ day, temp, time, icon }) {
  return (
    <div className="weather-per-hour">
      <div className="icon-and-hour-div">
        {icon ? <img src={icon ? `${icon}` : ""} alt="overcast-icon" /> : ""}
        <div className="hour">{time && `${time}`}</div>
      </div>
      <div className="degree-per-hour">{temp && `${temp}`}</div>
    </div>
  );
}

export default WeatherPerHour;
