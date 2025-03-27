import React from "react";
// import { TypeAnimation } from 'react-type-animation';
// import { Link as ScrollLink, Element } from 'react-scroll';
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import HospitalMap from "./pages/HospitalMap";
import MedicineSearch from "./pages/MedicineSearch";
import MedicalStore from "./pages/MedicalStore";
import News from "./pages/News";
import Weather from "./pages/Weather";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/hospitalmap" element={<HospitalMap />} />
        <Route path="/medicine-search" element={<MedicineSearch />} />
        <Route path="/medical-store" element={<MedicalStore />} />
        <Route path="/news" element={<News />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </>
  );
}
export default App;
