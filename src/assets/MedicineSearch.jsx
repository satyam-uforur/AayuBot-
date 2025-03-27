import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import MedicalStore from "./MedicalStore";
import { Link as ScrollLink, Element } from "react-scroll";

function MedicineSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMedicines(1);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        searchMedicines(searchTerm, 1);
      } else {
        fetchMedicines(1);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const fetchMedicines = async (page) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://aayuveda-hackathon1.onrender.com/api/medicines?page=${page}`
      );
      if (!response.ok) throw new Error("Failed to fetch medicines");
      const data = await response.json();
      setMedicines(data.medicines);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setError(null);
    } catch (err) {
      setError("Failed to load medicines. Please try again later.");
      console.error("Error fetching medicines:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const searchMedicines = async (query, page) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://:5000/api/medicines/search?query=${encodeURIComponent(
          query
        )}&page=${page}`
      );
      if (!response.ok) throw new Error("Failed to search medicines");
      const data = await response.json();
      setMedicines(data.medicines);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setError(null);
    } catch (err) {
      setError("Failed to search medicines. Please try again later.");
      console.error("Error searching medicines:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (searchTerm) {
      searchMedicines(searchTerm, page);
    } else {
      fetchMedicines(page);
    }
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for medicines by name or brand..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-4 h-[calc(100vh-16rem)] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Medicine List</h2>
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                <ul className="space-y-2">
                  {medicines.map((medicine) => (
                    <li
                      key={medicine["Medicine Name"]}
                      className={`p-3 rounded-lg cursor-pointer transition-all transform hover:scale-102 ${
                        selectedMedicine?.["Medicine Name"] ===
                        medicine["Medicine Name"]
                          ? "bg-blue-100 text-blue-800 shadow-md"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedMedicine(medicine)}
                    >
                      <div className="font-medium">
                        {medicine["Medicine Name"]}
                      </div>
                      <div className="text-sm text-gray-500">
                        {medicine["Brand Name"]}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="md:col-span-2 bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6 h-[calc(100vh-16rem)] overflow-y-auto">
            {selectedMedicine ? (
              <div className="animate-fadeIn">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-red-600">
                      {selectedMedicine["Medicine Name"]}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Brand: {selectedMedicine["Brand Name"]}
                    </p>
                    <p className="text-gray-600">
                      {selectedMedicine["Manufacturer"]}
                    </p>
                  </div>
                  {selectedMedicine["Image URL"] && (
                    <img
                      src={selectedMedicine["Image URL"]}
                      alt={selectedMedicine["Medicine Name"]}
                      className="w-32 h-32 object-cover rounded-lg shadow-md"
                    />
                  )}
                </div>

                <div className="mt-6 space-y-6">
                  <div className="bg-white/50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Composition
                    </h3>
                    <p className="mt-1 text-gray-600">
                      {selectedMedicine["Composition"]}
                    </p>
                  </div>

                  <div className="bg-white/50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Uses
                    </h3>
                    <p className="mt-1 text-gray-600">
                      {selectedMedicine["Uses"]}
                    </p>
                  </div>

                  <div className="bg-white/50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Side Effects
                    </h3>
                    <p className="mt-1 text-gray-600">
                      {selectedMedicine["Side_effects"]}
                    </p>
                  </div>

                  {selectedMedicine.Predicted_Effects && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="text-yellow-600" size={20} />
                        <h3 className="text-lg font-semibold text-gray-900">
                          AI-Predicted Potential Effects
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(selectedMedicine.Predicted_Effects).map(
                          ([effect, predicted]) =>
                            predicted && (
                              <div
                                key={effect}
                                className="flex items-center gap-2 text-gray-700"
                              >
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                {effect}
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Substitute Medicines
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      (Same composition, different brands)
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedMedicine.Substitutes.map((substitute) => (
                        <div
                          key={substitute["Medicine Name"]}
                          className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                          <h4 className="font-medium text-blue-900">
                            {substitute["Medicine Name"]}
                          </h4>
                          <p className="text-sm text-blue-700">
                            {substitute["Manufacturer"]}
                          </p>
                          <p className="text-sm font-medium text-blue-800 mt-1">
                            {substitute["Price"]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Alternative Medicines
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      (Different composition, similar uses)
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedMedicine.Alternatives.map((alternative) => (
                        <div
                          key={alternative["Medicine Name"]}
                          className="bg-green-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                          <h4 className="font-medium text-green-900">
                            {alternative["Medicine Name"]}
                          </h4>
                          <p className="text-sm text-green-700">
                            {alternative["Composition"]}
                          </p>
                          <p className="text-sm text-green-700">
                            {alternative["Uses"]}
                          </p>
                          <p className="text-sm font-medium text-green-800 mt-1">
                            {alternative["Price"]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Reviews
                    </h3>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedMedicine["Excellent Review %"]}%
                        </div>
                        <div className="text-sm text-gray-500">Excellent</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">
                          {selectedMedicine["Average Review %"]}%
                        </div>
                        <div className="text-sm text-gray-500">Average</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">
                          {selectedMedicine["Poor Review %"]}%
                        </div>
                        <div className="text-sm text-gray-500">Poor</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <RouterLink
                      to="/medical-store"
                      className="text-purple-800 flex text-xl"
                    >
                      Near By Medical Shop
                    </RouterLink>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a medicine to view details
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
export default MedicineSearch;
