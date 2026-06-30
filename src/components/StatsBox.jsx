import React, { useContext, useEffect, useEffectEvent } from "react";
import "/src/styles/StatsBox.css";
import { mainContext } from "./ContextComponent";
function StatsBox({ statName, statValue }) {
  const { optionSelectedBoolean, mainWeatherPropsObject } =
    useContext(mainContext);

  return (
    <div className="StatsBox">
      <p id="text">{statName}</p>
      <p id="prop">{mainWeatherPropsObject ? `${statValue}` : "—"}</p>
    </div>
  );
}

export default StatsBox;
