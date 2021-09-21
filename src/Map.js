import React from "react";
import { MapContainer , TileLayer,useMap } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./utl";
function ChangeMap({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map({ countries, casesType, center, zoom }) {
  return (
   
      <MapContainer className="map">
      <ChangeMap center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/*/Circle shown on Map*/ }
        {showDataOnMap(countries, casesType)}
      </MapContainer>
   
  );
}

export default Map;