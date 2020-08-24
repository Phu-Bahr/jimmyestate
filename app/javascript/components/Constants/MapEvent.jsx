import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "center",
  padding: "0",
  boxShadow: "0px 10px 13px -7px #000000"
};

const containerStyleMobile = {
  height: "300px",
  width: "100%",
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "center",
  padding: "0"
};

const Map = props => {
  let center;
  props.lat == NaN || props.lng == NaN
    ? (center = {
        lat: 35.6762,
        lng: 139.6503
      })
    : (center = {
        lat: parseFloat(props.lat),
        lng: parseFloat(props.lng)
      });

  return (
    <LoadScript googleMapsApiKey="AIzaSyAgrEtHoYMPR-67ZUVvtqCiwU-fSc5Ty6c">
      <GoogleMap
        mapContainerStyle={
          window.innerWidth < 1100 ? containerStyleMobile : containerStyle
        }
        center={center}
        zoom={16}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
