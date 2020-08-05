// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import PropTypes from "prop-types";
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
