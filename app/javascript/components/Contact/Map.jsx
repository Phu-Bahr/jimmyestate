import React, { Component, Fragment } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";

const containerStyle = {
  height: "350px",
  width: "100%",
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "center",
  padding: "0",
  boxShadow: "0px 10px 13px -7px #000000"
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      window: false
    };
  }
  onClick = () => this.setState({ window: !this.state.window });

  render() {
    let center = {
      lat: parseFloat(this.props.lat),
      lng: parseFloat(this.props.lng)
    };

    return (
      <LoadScript googleMapsApiKey="AIzaSyAgrEtHoYMPR-67ZUVvtqCiwU-fSc5Ty6c">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
          <Marker position={center} onClick={this.onClick} />
          {this.state.window && (
            <InfoWindow position={center} onCloseClick={this.onClick}>
              <Fragment>
                <div>RTN Headquarters</div>
                <div>365 Bolyston St.</div>
                <div>Brookline, MA 02445</div>
              </Fragment>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
