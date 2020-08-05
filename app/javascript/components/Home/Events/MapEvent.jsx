import React, { Component } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const Map = props => {
  const WrappedMap = withScriptjs(
    withGoogleMap(() => {
      return (
        <GoogleMap
          defaultZoom={14}
          defaultCenter={{ lat: props.lat, lng: props.lng }}
        >
          <Marker position={{ lat: props.lat, lng: props.lng }} />
        </GoogleMap>
      );
    })
  );

  return (
    <React.Fragment>
      <div className="event-map">
        <div style={{ width: "100%" }}>
          <WrappedMap
            googleMapURL={
              "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAgrEtHoYMPR-67ZUVvtqCiwU-fSc5Ty6c"
            }
            loadingElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
          ></WrappedMap>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Map;
