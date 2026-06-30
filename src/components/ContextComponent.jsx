import React from "react";
import { createContext, useState } from "react";
const mainContext = createContext();
function ContextComponent(props) {
  const [selectedDay, setSelectedDay] = useState("—");
  const [mode, setMode] = useState("metric");
  const [recentSearches, setRecentSearches] = useState([]);
  const [input, setInput] = useState(""); //entered city name input
  const [error, setError] = useState(false);
  const [mainWeatherPropsObject, setMainWeatherPropsObject] = useState();
  const [optionSelectedBoolean, setOptionSelectedBoolean] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const [apiError, setApiError] = useState(false);
  const [resultNotFound, setResultNotFound] = useState(false);
  return (
    <div>
      <mainContext.Provider
        value={{
          selectedDay,
          setSelectedDay,
          mode,
          setMode,
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
        }}
      >
        {props.children}
      </mainContext.Provider>
    </div>
  );
}

export { ContextComponent, mainContext };
