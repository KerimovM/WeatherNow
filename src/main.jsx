import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  ContextComponent,
  mainContext,
} from "./components/ContextComponent.jsx";
createRoot(document.getElementById("root")).render(
  <ContextComponent>
    <App />
  </ContextComponent>,
);
