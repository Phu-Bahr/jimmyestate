import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "center",
  padding: "0"
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
  const center = {
    lat: props.lat,
    lng: props.lng
  };
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
