import { useContext, useState, useEffect } from "react";
import "./styles/App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import MainHero from "./components/MainHero";
import StatsBox from "./components/StatsBox";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import { ContextComponent, mainContext } from "./components/ContextComponent";
import "./styles/Responsive.css";
function App() {
  const {
    mainWeatherPropsObject,
    mode,
    apiError,
    selectedCountry,
    resultNotFound,
    setResultNotFound,
  } = useContext(mainContext);
  const [todayDate, setTodayDate] = useState();
  useEffect(() => {
    if (!mainWeatherPropsObject) return;
    console.log(mainWeatherPropsObject);
    const date = new Date(mainWeatherPropsObject.daily.time[0]);

    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    setTodayDate(formattedDate);
  }, [mainWeatherPropsObject]);

  function getWeatherIcon(code) {
    switch (code) {
      case 0:
        return "/images/icon-sunny.webp";

      case 1:
      case 2:
        return "/images/icon-partly-cloudy.webp";

      case 3:
        return "/images/icon-overcast.webp";

      case 45:
      case 48:
        return "/images/icon-fog.webp";

      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return "/images/icon-drizzle.webp";

      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
      case 80:
      case 81:
      case 82:
        return "/images/icon-rain.webp";

      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return "/images/icon-snow.webp";

      case 95:
      case 96:
      case 99:
        return "/images/icon-storm.webp";

      default:
        return "/images/icon-overcast.webp";
    }
  }
  return (
    <>
      {apiError ? (
        <div className="api-error-div">
          <img src="/images/icon-error.svg" alt="error-icon" width={"32px"} />
          <h1>Something went wrong</h1>
          <p>
            We couldn't connect to the server (API error). Please try again a
            few moments.
          </p>
          <button onClick={() => location.reload()}>
            <img src="/images/icon-retry.svg" alt="icon-retry" /> Retry
          </button>
        </div>
      ) : (
        <>
          <div className="top-part-app">
            <Header />
            <p id="main-title">How's the sky looking today?</p>
            <Search />
          </div>

          {resultNotFound ? (
            <p id="not-found-text">No search result found!</p>
          ) : (
            <div className="bars">
              <div className="left-bars">
                <MainHero
                  currentTemp={mainWeatherPropsObject?.current.temperature_2m}
                  formattedDate={todayDate}
                  getWeatherIcon={getWeatherIcon}
                />
                <div className="stats-bars">
                  <StatsBox
                    statName="Feels Like"
                    statValue={`${mode == "metric" ? `${mainWeatherPropsObject?.current?.temperature_2m}` : `${Number.isInteger(mainWeatherPropsObject?.current?.temperature_2m) ? `${mainWeatherPropsObject?.current?.temperature_2m * 1.8 + 32}` : (mainWeatherPropsObject?.current?.temperature_2m * 1.8 + 32).toFixed(1)}`}°`}
                  />
                  <StatsBox
                    statName="Humidity"
                    statValue={`${mainWeatherPropsObject?.current?.relative_humidity_2m}%`}
                  />
                  <StatsBox
                    statName="Wind"
                    statValue={`${mainWeatherPropsObject?.current?.wind_speed_10m} ${mode === "metric" ? "km/h" : "mph"}`}
                  />
                  <StatsBox
                    statName="Precipitation"
                    statValue={`${mainWeatherPropsObject?.current?.precipitation} ${mode === "metric" ? "mm" : "in"}`}
                  />
                </div>
                <p id="daily-forec-text">Daily forecast</p>

                <div className="daily-forcasts">
                  {mainWeatherPropsObject
                    ? mainWeatherPropsObject?.daily?.time.map((day, index) => (
                        <DailyForecast
                          key={day}
                          day={new Date(day).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                          minTemp={
                            mainWeatherPropsObject.daily.temperature_2m_min[
                              index
                            ]
                          }
                          maxTemp={
                            mainWeatherPropsObject.daily.temperature_2m_max[
                              index
                            ]
                          }
                          icon={getWeatherIcon(
                            mainWeatherPropsObject.daily.weather_code[index],
                          )}
                        />
                      ))
                    : Array.from({ length: 7 }).map((_, index) => (
                        <DailyForecast key={index} />
                      ))}
                </div>
              </div>

              <div className="side-bar">
                <HourlyForecast getWeatherIcon={getWeatherIcon} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
