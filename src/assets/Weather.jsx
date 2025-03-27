import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import axios from "axios";
import {
  Cloud,
  Sun,
  Droplets,
  Thermometer,
  Wind,
  Droplet,
  AlertTriangle,
  Search,
  MapPin,
  Settings as Lungs,
  Brush as Virus,
  Waves,
  Flame,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link as ScrollLink, Element } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker icons for different conditions
const createCustomIcon = (color) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Disease categories with associated icons and colors
const diseases = [
  { name: "Asthma", icon: Lungs, color: "#FF4D4D" },
  { name: "Bronchitis", icon: Virus, color: "#FF9933" },
  { name: "Sunburn", icon: Sun, color: "#FFCC00" },
  { name: "Dehydration", icon: Droplet, color: "#33CCFF" },
  { name: "Respiratory Issues", icon: Wind, color: "#99FF33" },
  { name: "Fungal Infections", icon: Cloud, color: "#CC99FF" },
  { name: "Heat Stroke", icon: Flame, color: "#FF3366" },
  { name: "Skin Cancer", icon: Waves, color: "#FF99CC" },
];

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 10);
  }, [center, map]);
  return null;
}

function Weather() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [model, setModel] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapCenter, setMapCenter] = useState([20, 0]);
  const [showWeatherInfo, setShowWeatherInfo] = useState(false);
  const searchTimeout = useRef();
  const searchRef = useRef(null);

  useEffect(() => {
    initModel();

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      if (searchTimeout.current) {
        window.clearTimeout(searchTimeout.current);
      }

      searchTimeout.current = window.setTimeout(async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=7163eee8a698345a4772cd24c2ebd66d`
          );
          setCities(response.data);
          setShowSuggestions(true);
        } catch (err) {
          console.error("Failed to fetch cities:", err);
          setCities([]);
        }
      }, 300);
    } else {
      setCities([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const initModel = async () => {
    try {
      const model = tf.sequential();

      model.add(
        tf.layers.dense({
          units: 64,
          activation: "relu",
          inputShape: [5],
        })
      );
      model.add(tf.layers.batchNormalization());
      model.add(tf.layers.dropout(0.3));

      model.add(
        tf.layers.dense({
          units: 32,
          activation: "relu",
        })
      );
      model.add(tf.layers.batchNormalization());
      model.add(tf.layers.dropout(0.2));

      model.add(
        tf.layers.dense({
          units: 16,
          activation: "relu",
        })
      );
      model.add(tf.layers.batchNormalization());

      model.add(
        tf.layers.dense({
          units: diseases.length,
          activation: "sigmoid",
        })
      );

      model.compile({
        optimizer: tf.train.adam(0.001),
        loss: "binaryCrossentropy",
        metrics: ["accuracy"],
      });

      setModel(model);
    } catch (err) {
      setError("Failed to initialize ML model");
      console.error(err);
    }
  };

  const getWeatherData = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7163eee8a698345a4772cd24c2ebd66d&units=metric`
      );
      return response.data;
    } catch (err) {
      throw new Error("Failed to fetch weather data");
    }
  };

  const predictDiseases = async (weatherData) => {
    if (!model) return [];

    const input = tf.tensor2d([
      [
        weatherData.main.temp,
        weatherData.main.humidity,
        calculateSeverityScore(weatherData),
        calculateUVIndex(weatherData),
        calculateHealthRiskScore(weatherData),
      ],
    ]);

    const predictions = await model.predict(input);
    const probabilities = await predictions.data();

    return diseases
      .filter((_, i) => probabilities[i] > 0.5)
      .map((disease) => disease.name);
  };

  const calculateSeverityScore = (data) => {
    let score = 0;
    const temp = data.main.temp;
    const humidity = data.main.humidity;

    if (temp > 35) score += 3;
    else if (temp > 30) score += 2;
    else if (temp < 10) score += 2;

    if (humidity > 80) score += 2;
    else if (humidity < 30) score += 2;

    return Math.min(score, 10);
  };

  const calculateUVIndex = (data) => {
    const clouds = data.clouds.all;
    const hour = new Date().getHours();
    let baseUV = 8;

    if (hour >= 10 && hour <= 14) {
      baseUV = 10;
    } else if (hour >= 8 && hour <= 16) {
      baseUV = 8;
    } else {
      baseUV = 4;
    }

    return Math.round(baseUV * (1 - clouds / 100));
  };

  const calculateHealthRiskScore = (data) => {
    let score = 0;
    const temp = data.main.temp;
    const humidity = data.main.humidity;

    if (temp > 35) score += 3;
    if (humidity > 80) score += 2;
    if (data.weather[0].main === "Storm") score += 2;

    return Math.min(score, 10);
  };

  const handleCitySelect = async (city) => {
    // Immediately hide suggestions
    setShowSuggestions(false);
    setCities([]);

    // Update UI states
    setSearchTerm(`${city.name}, ${city.state || city.country}`);
    setLoading(true);
    setError("");
    setMapCenter([city.lat, city.lon]);
    setShowWeatherInfo(true);

    try {
      const weather = await getWeatherData(city.lat, city.lon);
      setWeatherData(weather);
      const diseaseRisks = await predictDiseases(weather);
      setPredictions(diseaseRisks);
    } catch (err) {
      setError("Failed to get predictions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = () => {
    if (!weatherData) return null;
    const main = weatherData.weather[0].main;

    switch (main.toLowerCase()) {
      case "clear":
        return <Sun className="w-16 h-16 text-yellow-500" />;
      case "rain":
        return <Droplets className="w-16 h-16 text-blue-500" />;
      case "clouds":
        return <Cloud className="w-16 h-16 text-gray-500" />;
      default:
        return <Thermometer className="w-16 h-16 text-red-500" />;
    }
  };

  const getMarkerIcon = (prediction) => {
    const disease = diseases.find((d) => d.name === prediction);
    return disease ? createCustomIcon(disease.color) : null;
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-white-50 to-white-50">
      <header className="sticky top-0 bg-white border-b-2 border-red-600 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex flex-shrink-0 items-center">
            <img src="/logo2.jpg" className="w-14 h-14" />
            <h1 className="text-xl font-bold">
              Aayu<span className="text-red-700">Veda</span>
            </h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-5">
              <li>
                <RouterLink
                  to="/"
                  className="text-black hover:bg-red-600 hover:text-white transition-colors p-2 rounded-full px-3"
                >
                  Home
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/about"
                  className="text-black hover:bg-red-600 hover:text-white transition-colors p-2 rounded-full px-3"
                >
                  About
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/medicine-search"
                  className="text-black hover:bg-red-600 hover:text-white transition-colors p-2 rounded-full px-3"
                >
                  Medicine Search
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/hospitalmap"
                  className="text-black hover:bg-red-600 hover:text-white transition-colors p-2 rounded-full px-3"
                >
                  Hospital Map
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/news"
                  className="text-black hover:bg-red-600 hover:text-white transition-colors p-2 rounded-full px-3"
                >
                  News
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/weather"
                  className="text-black hover:bg-red-600 hover:text-white transition-colors p-2 rounded-full px-3"
                >
                  Weather
                </RouterLink>
              </li>
            </ul>
          </nav>
          <div>
            <ScrollLink
              to="section1"
              smooth={true}
              className="inline-block bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white font-medium py-3 px-6 rounded transition-colors"
            >
              Get Started
            </ScrollLink>
          </div>
        </div>
      </header>
      {/* Top section with search and info */}
      <div className="w-full glass-effect p-4 z-30">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Search section */}
          <div className="w-full max-w-2xl mx-auto" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a city..."
                className="w-full px-4 py-3 pl-12 rounded-xl border border-red-900 focus:ring-2 focus:ring-red-400 focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-200"
                onFocus={() => {
                  if (cities.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-red-900" />

              {showSuggestions && cities.length > 0 && (
                <div className="absolute w-full mt-2 glass-effect rounded-xl overflow-hidden animate-fade-in z-50">
                  {cities.map((city, index) => (
                    <button
                      key={`${city.lat}-${city.lon}-${index}`}
                      onClick={() => handleCitySelect(city)}
                      onTouchStart={() => {
                        // Immediately hide suggestions on touch
                        setShowSuggestions(false);
                        setCities([]);
                        // Then proceed with city selection
                        handleCitySelect(city);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-white/50 flex items-center gap-3 transition-colors duration-200"
                    >
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">
                        {city.name},{" "}
                        <span className="text-gray-600">
                          {city.state || city.country}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Weather and health info */}
          {showWeatherInfo && weatherData && !loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
              <div className="glass-effect rounded-xl p-6 hover-card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Current Weather
                    </h2>
                    <p className="text-gray-600">
                      {weatherData.name}, {weatherData.sys.country}
                    </p>
                  </div>
                  {getWeatherIcon()}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <Thermometer className="w-6 h-6 text-red-500" />
                    <div>
                      <p className="text-lg font-semibold">
                        {Math.round(weatherData.main.temp)}°C
                      </p>
                      <p className="text-sm text-gray-600">Temperature</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Droplet className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-lg font-semibold">
                        {weatherData.main.humidity}%
                      </p>
                      <p className="text-sm text-gray-600">Humidity</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wind className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="text-lg font-semibold">
                        {weatherData.wind.speed} m/s
                      </p>
                      <p className="text-sm text-gray-600">Wind Speed</p>
                    </div>
                  </div>
                </div>
              </div>

              {predictions.length > 0 && (
                <div className="glass-effect rounded-xl p-6 hover-card">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      Health Risks
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {predictions.map((disease, index) => {
                      const diseaseInfo = diseases.find(
                        (d) => d.name === disease
                      );
                      const Icon = diseaseInfo?.icon || AlertTriangle;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-colors duration-200"
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: diseaseInfo?.color }}
                          />
                          <span className="font-medium">{disease}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Map container */}
      <div className="flex-1 relative z-10">
        <MapContainer center={mapCenter} zoom={3} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={mapCenter} />
          {weatherData &&
            predictions.map((prediction, index) => (
              <Marker
                key={index}
                position={[
                  weatherData.coord.lat + index * 0.001,
                  weatherData.coord.lon,
                ]}
                icon={getMarkerIcon(prediction)}
              >
                <Popup>
                  <div className="text-sm space-y-1">
                    <p className="font-semibold text-gray-800">{prediction}</p>
                    <p className="text-red-600">Risk Level: High</p>
                    <p className="text-gray-600">
                      Location: {weatherData.name}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          {weatherData && (
            <Marker position={[weatherData.coord.lat, weatherData.coord.lon]}>
              <Popup>
                <div className="text-sm space-y-1">
                  <p className="font-semibold text-gray-800">
                    {weatherData.name}
                  </p>
                  <p className="capitalize text-gray-600">
                    {weatherData.weather[0].description}
                  </p>
                  <p className="font-medium">
                    {Math.round(weatherData.main.temp)}°C
                  </p>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-effect rounded-xl p-6 flex flex-col items-center animate-fade-in">
            <div className="animate-spin rounded-full h-10 w-10 border-3 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-700">Loading weather data...</p>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="glass-effect bg-red-50/90 text-red-700 px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
