import React, { Component } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);

    const WrappedMap = withScriptjs(
      withGoogleMap(props => {
        return (
          <GoogleMap
            defaultZoom={14}
            defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
          >
            <Marker position={{ lat: this.props.lat, lng: this.props.lng }} />
          </GoogleMap>
        );
      })
    );

    return (
      <React.Fragment>
        <div
          style={{
            height: "60vh",
            width: "100%",
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "center",
            padding: 0
          }}
        >
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
  }
}

export default Map;
