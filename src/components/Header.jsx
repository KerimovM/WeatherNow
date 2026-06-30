import React, { useState } from "react";
import { useContext } from "react";
import { mainContext } from "./ContextComponent";
import "/src/styles/Header.css";
function Header() {
  const { mode, setMode } = useContext(mainContext);
  const [unitsDropDownToggle, setUnitsDropDownToggle] = useState(false);
  return (
    <div className="header">
      <div className="logo">
        <img
          src="/images/logo.svg"
          alt="logo"
          onClick={() => location.reload()}
        />
      </div>
      <div className="units-div">
        <div
          className="units-button"
          tabIndex="0"
          onClick={() => setUnitsDropDownToggle(!unitsDropDownToggle)}
        >
          <img src="/images/icon-units.svg" alt="gear-icon" width={"15px"} />
          <span>
            Units
            <img src="/images/icon-dropdown.svg" alt="dropdown-icon" />
          </span>
        </div>
        {unitsDropDownToggle && (
          <div className="units-dropdown">
            <p
              id="switch-mode"
              tabIndex={1}
              onClick={() => setMode(mode == "metric" ? "imperial" : "metric")}
            >
              {mode == "metric" ? "Switch to Imperial" : "Switch to Metric"}
            </p>
            <p className="units-dropdown-title">Temperatue</p>
            <ul className="units-dropdown-list">
              {mode == "metric" ? (
                <li style={{ backgroundColor: "hsl(243, 23%, 24%)" }}>
                  Celcius (&#176;C)
                  <img src="/images/icon-checkmark.svg" alt="check-mark" />
                </li>
              ) : (
                <li>Celcius (&#176;C)</li>
              )}
              {mode == "imperial" ? (
                <li style={{ backgroundColor: "hsl(243, 23%, 24%)" }}>
                  Fahrenheit (&#176;F)
                  <img src="/images/icon-checkmark.svg" alt="check-mark" />
                </li>
              ) : (
                <li>Fahrenheit (&#176;F)</li>
              )}
            </ul>
            <p className="units-dropdown-title">Wind Speed</p>
            <ul className="units-dropdown-list">
              {mode == "metric" ? (
                <li style={{ backgroundColor: "hsl(243, 23%, 24%)" }}>
                  km/h <img src="/images/icon-checkmark.svg" alt="check-mark" />
                </li>
              ) : (
                <li>km/h</li>
              )}
              {mode == "imperial" ? (
                <li style={{ backgroundColor: "hsl(243, 23%, 24%)" }}>
                  mph <img src="/images/icon-checkmark.svg" alt="check-mark" />
                </li>
              ) : (
                <li>mph</li>
              )}
            </ul>
            <p className="units-dropdown-title">Precipitation</p>
            <ul className="units-dropdown-list">
              {mode == "metric" ? (
                <li style={{ backgroundColor: "hsl(243, 23%, 24%)" }}>
                  Millimeters (mm)
                  <img src="/src/images/icon-checkmark.svg" alt="check-mark" />
                </li>
              ) : (
                <li>Millimeters (mm)</li>
              )}
              {mode == "imperial" ? (
                <li style={{ backgroundColor: "hsl(243, 23%, 24%)" }}>
                  Inches (in)
                  <img src="/src/images/icon-checkmark.svg" alt="check-mark" />
                </li>
              ) : (
                <li>Inches (in)</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
