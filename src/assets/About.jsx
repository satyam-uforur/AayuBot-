import React from "react";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink, Element } from "react-scroll";

const About = () => {
  return (
    <div className="min-h-screen bg-red-50 text-red-600 font-sans">
      <header className="sticky top-0 bg-white border-b-2 border-red-600 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex flex-shrink-0 items-center">
            <img src="/logo2.jpg" className="w-14 h-14" />
            <h1 className="text-xl font-bold text-black">
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

      {/* Hero Section */}
      <div className="relative py-16">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-0">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            About AayuVeda
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Revolutionizing Healthcare with AI-Powered Medical Assistance
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-red-500">
          <p className="text-lg text-black mb-12 leading-relaxed centre">
            In today's fast-paced world, access to accurate and reliable medical
            information is more important than ever. AayuVeda is an advanced
            AI-powered chatbot designed to transform the way we diagnose medical
            conditions and access essential healthcare information.
          </p>

          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
              Key Features
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="group bg-red-50 rounded-xl p-6 shadow-lg hover:shadow-red-600 transition-all duration-300 hover:-translate-y-1 border border-red-800 hover:border-red-800">
              <div className="rounded-full bg-red-600 w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-700 mb-3 group-hover:text-red-500">
                Instant Medical Information
              </h3>
              <p className="text-black group-hover:text-black">
                Quick and accurate responses to medical queries, providing
                real-time results for medicine information.
              </p>
            </div>

            <div className="group bg-red-50 rounded-xl p-6 shadow-lg hover:shadow-red-600 transition-all duration-300 hover:-translate-y-1 border border-red-800 hover:border-red-800">
              <div className="rounded-full bg-red-600 w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-700 mb-3 group-hover:text-red-500">
                Comprehensive Database
              </h3>
              <p className="text-black group-hover:text-black">
                Extensive collection of medical and pharmaceutical data with
                detailed insights.
              </p>
            </div>

            <div className="group bg-red-50 rounded-xl p-6 shadow-lg hover:shadow-red-600 transition-all duration-300 hover:-translate-y-1 border border-red-800 hover:border-red-800">
              <div className="rounded-full bg-red-600 w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-700 mb-3 group-hover:text-red-500">
                24/7 Availability
              </h3>
              <p className="text-black group-hover:text-black">
                Access medical information anytime, anywhere without waiting for
                appointments.
              </p>
            </div>

            <div className="group bg-red-50 rounded-xl p-6 shadow-lg hover:shadow-red-600 transition-all duration-300 hover:-translate-y-1 border border-red-800 hover:border-red-800">
              <div className="rounded-full bg-red-600 w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-700 mb-3 group-hover:text-red-500">
                Personalized Health Insights
              </h3>
              <p className="text-black group-hover:text-black">
                Tailored recommendations based on your health profile and
                history.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
                Who Can Benefit?
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              <div className="flex items-start p-4 rounded-lg bg-red-50 border border-red-700 hover:border-red-800 transition-all duration-300">
                <div className="rounded-full bg-red-600 w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-xl">•</span>
                </div>
                <div>
                  <h3 className="font-medium text-red-700 mb-1">Patients</h3>
                  <p className="text-black">
                    Seeking reliable medical information
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 rounded-lg bg-red-50 border border-red-700 hover:border-red-800 transition-all duration-300">
                <div className="rounded-full bg-red-600 w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-xl">•</span>
                </div>
                <div>
                  <h3 className="font-medium text-red-700 mb-1">
                    Healthcare Professionals
                  </h3>
                  <p className="text-black">Needing quick reference</p>
                </div>
              </div>

              <div className="flex items-start p-4 rounded-lg bg-red-50 border border-red-700 hover:border-red-800 transition-all duration-300">
                <div className="rounded-full bg-red-600 w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-xl">•</span>
                </div>
                <div>
                  <h3 className="font-medium text-red-700 mb-1">
                    Medical Students
                  </h3>
                  <p className="text-black">Enhancing their knowledge</p>
                </div>
              </div>

              <div className="flex items-start p-4 rounded-lg bg-red-50 border border-red-700 hover:border-red-800 transition-all duration-300">
                <div className="rounded-full bg-red-600 w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white text-xl">•</span>
                </div>
                <div>
                  <h3 className="font-medium text-red-700 mb-1">Caregivers</h3>
                  <p className="text-black">Managing medications for others</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-red-200 rounded-xl p-8 mb-12 shadow-lg border border-red-500">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">
                The Future of AayuVeda
              </h3>
              <p className="text-red-600 leading-relaxed">
                AayuVeda is continuously evolving with upcoming features
                including voice assistance, multilingual support, and
                integration with wearable health devices. Our mission is to make
                reliable healthcare information accessible to everyone.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white bg-red-600 rounded-lg group">
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-black rounded-full group-hover:w-full group-hover:h-56"></span>
              <span className="relative font-semibold tracking-wide">
                Try AayuVeda Now
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-800 py-8">
        <p className="text-gray-500 text-sm text-center">
          &copy; {new Date().getFullYear()} AayuVeda All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
