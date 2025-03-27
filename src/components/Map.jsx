import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icons
const userIcon = new L.Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Map_marker.svg",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -40], // 🔵 Blue icon for user
});

const hospitalIcon = new L.Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg", // 🔴 Red icon for hospitals
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [1, -24],
});

const HospitalMapComponent = ({ userLocation, hospitals }) => {
  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lon]}
      zoom={14}
      style={{ height: "400px", width: "100%" }}
    >
      {/* OpenStreetMap Tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* User Location Marker (Blue) */}
      <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
        <Popup>
          <strong>Your Location</strong>
        </Popup>
      </Marker>

      {/* Hospital Markers (Red) */}
      {hospitals.map((hospital) => (
        <Marker
          key={hospital.id}
          position={[hospital.lat, hospital.lon]}
          icon={hospitalIcon}
        >
          <Popup>
            <strong>{hospital.name}</strong> <br />
            {hospital.address} <br />
            📍 {hospital.distance.toFixed(2)} meters away
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HospitalMapComponent;
