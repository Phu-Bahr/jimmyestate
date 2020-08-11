import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "../components/App";
import ReactGA from "react-ga";

ReactGA.initialize(
  [
    {
      trackingId: "UA-173933096-2"
    },
    {
      trackingId: "UA-174405415-1"
    }
  ]
  // { debug: true, alwaysSendToDefaultTracker: false }
);
ReactGA.pageview(window.location.pathname + window.location.search);

document.addEventListener("DOMContentLoaded", () => {
  render(<App />, document.body.appendChild(document.createElement("div")));
});
