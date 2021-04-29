import React, { useState } from "react";
import MapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const TOKEN =
  "pk.eyJ1Ijoiem1haG1vdWQiLCJhIjoiY2tvMDV6b25pMDd2eTJubm53bHFtZ2F3YyJ9.cBGdL-qpH6jng8iQuBOuWg";

const Map = ({ loc }) => {
  const [viewport, setViewPort] = useState({
    latitude: 33.573109,
    longitude: -7.589843,
    width: "80%",
    height: 500,
    zoom: 8,
  });
  const [position, setPosition] = useState({
    latitude: 33.573109,
    longitude: -7.589843,
  });
  const _onViewportChange = (viewport) => {
    setViewPort({ ...viewport });
  };
  const onMapClick = (event) => {
    setPosition({ longitude: event.lngLat[0], latitude: event.lngLat[1] });
    loc([event.lngLat[0], event.lngLat[1]]);
  };

  return (
    <div style={{ margin: "0 auto", padding: "5px" }}>
      <h1
        style={{ textAlign: "center", fontSize: "25px", fontWeight: "bolder" }}
      >
        GeoLocator: Click the Geolocator to Find Your Location
      </h1>

      <MapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        onViewportChange={_onViewportChange}
        onClick={onMapClick}
      >
        <Marker longitude={position.longitude} latitude={position.latitude}>
          <LocationOnIcon color="secondary" />
        </Marker>
      </MapGL>
    </div>
  );
};

export default Map;
