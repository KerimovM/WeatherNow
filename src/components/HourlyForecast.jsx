import React from "react";
import { mainContext, ContextComponent } from "./ContextComponent";
import { useState, useContext } from "react";
import "/src/styles/HourlyForecast.css";
import WeatherPerHour from "./WeatherPerHour";
import { useEffect } from "react";
function HourlyForecast({ getWeatherIcon }) {
  const [hourlyDropDownToggle, setHourlyDropDownToggle] = useState(false);
  const { selectedDay, setSelectedDay, mainWeatherPropsObject, mode } =
    useContext(mainContext);

  const dayIndex = mainWeatherPropsObject?.daily.time.findIndex(
    (day) =>
      new Date(day).toLocaleDateString("en-US", {
        weekday: "long",
      }) === selectedDay,
  );

  const start = dayIndex * 24;
  const end = start + 24;

  const times = mainWeatherPropsObject?.hourly.time.slice(start, end);
  const temperatures = mainWeatherPropsObject?.hourly.temperature_2m.slice(
    start,
    end,
  );
  const weatherCodes = mainWeatherPropsObject?.hourly.weather_code.slice(
    start,
    end,
  );

  function chooseDay(e) {
    if (e.target.classList.contains("day")) {
      setSelectedDay(e.target.id);
      setHourlyDropDownToggle(false);
    }
  }
  useEffect(() => {
    if (!mainWeatherPropsObject) return;
    const date = new Date(mainWeatherPropsObject?.daily.time[0]);

    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
    });
    setSelectedDay(formattedDate);
  }, [mainWeatherPropsObject]);

  return (
    <div className="main-hourly-div">
      <div className="hourly-header">
        <p>Hourly Forecast</p>
        <div id="days-selector">
          <div
            className="selected-day-div"
            onClick={() => setHourlyDropDownToggle(!hourlyDropDownToggle)}
          >
            <span>{selectedDay}</span>
            <img src="/images/icon-dropdown.svg" alt="dropdown-icon" />
          </div>
          {hourlyDropDownToggle && (
            <div
              className="days-dropdown"
              onClick={(e) => mainWeatherPropsObject && chooseDay(e)}
            >
              <div className="day" id="Monday">
                Monday
              </div>
              <div className="day" id="Tuesday">
                Tuesday
              </div>
              <div className="day" id="Wednesday">
                Wednesday
              </div>
              <div className="day" id="Thursday">
                Thursday
              </div>
              <div className="day" id="Friday">
                Friday
              </div>
              <div className="day" id="Saturday">
                Saturday
              </div>
              <div className="day" id="Sunday">
                Sunday
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="per-hour-divs">
        {mainWeatherPropsObject
          ? times?.map((dateTime, index) => (
              <WeatherPerHour
                key={dateTime}
                day={selectedDay}
                temp={
                  temperatures[index]
                    ? `${mode == "metric" ? `${temperatures[index]}` : `${Number.isInteger(temperatures[index]) ? `${temperatures[index] * 1.8 + 32}` : (temperatures[index] * 1.8 + 32).toFixed(1)}`}°`
                    : ""
                }
                time={new Date(dateTime).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  hour12: true,
                })}
                icon={getWeatherIcon(weatherCodes[index])}
              />
            ))
          : Array.from({ length: 24 }).map((_, index) => (
              <WeatherPerHour key={index} />
            ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
