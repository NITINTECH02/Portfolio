import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "@/styles/index.css";
import { LazyMotion, domAnimation } from "motion/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LazyMotion features={domAnimation}>
      <App />
    </LazyMotion>
  </React.StrictMode>
);
