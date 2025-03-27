import React, { useState } from "react";
import axios from "axios";
import { SearchBar } from "../components/SearchBar";
import HospitalMapComponent from "../components/Map";
import { HospitalList } from "../components/HospitalList";
import { Stethoscope } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink, Element } from "react-scroll";

const HospitalMap = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);

  const searchHospitals = async (query) => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Get location coordinates
      const nominatimResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );

      if (nominatimResponse.data.length === 0) {
        throw new Error("Location not found");
      }

      const { lat, lon } = nominatimResponse.data[0];
      const parsedLat = parseFloat(lat);
      const parsedLon = parseFloat(lon);
      setUserLocation({ lat: parsedLat, lon: parsedLon });

      // Step 2: Fetch hospitals using Overpass API
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:5000,${parsedLat},${parsedLon});
        );
        out body;
      `;

      const overpassResponse = await axios.get(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
          overpassQuery
        )}`
      );

      // Step 3: Process hospital data
      const nearbyHospitals = overpassResponse.data.elements
        .filter((element) => element.tags?.name && element.lat && element.lon)
        .slice(0, 5)
        .map((element) => ({
          id: element.id.toString(),
          name: element.tags.name,
          lat: element.lat,
          lon: element.lon,
          address: element.tags["addr:street"] || "Address not available",
          distance: calculateDistance(
            parsedLat,
            parsedLon,
            element.lat,
            element.lon
          ),
        }));

      setHospitals(nearbyHospitals);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
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

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-8">
            <SearchBar
              className="bg-red-500"
              onSearch={searchHospitals}
              isLoading={isLoading}
            />

            {error && (
              <div className="w-full max-w-2xl bg-red-50 text-red-700 p-4 rounded-lg">
                {error}
              </div>
            )}

            {userLocation && (
              <div className="w-full max-w-2xl">
                <HospitalMapComponent
                  userLocation={userLocation}
                  hospitals={hospitals}
                />
              </div>
            )}

            <HospitalList hospitals={hospitals} />
          </div>
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              Data provided by OpenStreetMap contributors
            </p>
          </div>
        </main>
      </div>
      <footer>
        <div className="border-t border-gray-800 pt-5 pb-5 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AayuVeda All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default HospitalMap;
