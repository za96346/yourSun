import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class Attend_map extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
    center={

        shop_lat:25.05595911252863,
        shop_lon:121.52555348811515,
        zoom:4
        }

  render() {
    return (
      <Map containerStyle={{
                width: "50%",
                height: "50%"
            }}
            style={{
                width: "100%",
                height: "100%"
            }}
            google={this.props.google}
           initialCenter={{
             lat: this.center.shop_lat,
             lng: this.center.shop_lon
           }}
           zoom={14.75}
           onClick={this.onMapClicked}>
        <Marker onClick={this.onMarkerClick}
                name={'羽上茶飲林森店'}
                position={{lat: this.center.shop_lat, lng: this.center.shop_lon}}/>
        <Marker onClick={this.onMarkerClick}
                name={'羽上茶飲林森店'}
                position={{lat: 24.9918924, lng: 121.5180396}}/>
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h3>{this.state.selectedPlace.name}</h3>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDxuIeRuXiCcfg9lAnICI23rWyyfYuqJj8")
})(Attend_map)