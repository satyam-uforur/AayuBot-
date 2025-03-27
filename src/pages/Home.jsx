import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Link as ScrollLink, Element } from "react-scroll";
import { Link, Link as RouterLink } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="min-h-screen bg-white text-black">
        <Header />
        <Hero />
        <Services />
        <About1 />
        <Footer />
      </div>
    </div>
  );
}

function Header() {
  return (
    
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
  );
}

function Hero() {
  return (
    <Element name="start">
    <section id="home" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <TypeAnimation
          sequence={[
            "Your Wellness, Our Priority!",
            1000,
            "Stay Informed, Stay Healthy!",
            1000,
            "Find the Right Medicine, Instantly!",
            1000,
          ]}
          wrapper="h1"
          speed={30}
          className="text-6xl font-bold text-red-500"
          repeat={Infinity}
          />
        <br />
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          An intelligent platform for personalized medicine suggestions and
          dynamic health assistance. Get the right care, instantly and
          effortlessly.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <ScrollLink
            to="section1"
            smooth={true}
            className="inline-block bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white font-medium py-3 px-6 rounded transition-colors"
            >
            Get Started
          </ScrollLink>
          <a
            href="#services"
            className="inline-block bg-transparent hover:bg-gray-800 text-black hover:text-white border border-gray-700 font-medium py-3 px-6 rounded transition-colors"
            >
            Learn More
          </a>
        </div>
      </div>
    </section>
    </Element>
  );
}

function Services() {
  return (
    <Element name="section1">
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-red-600 font-bold mb-4">
              Explore
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <RouterLink to="/about">
              <div className="bg-white shadow-xl p-8 rounded-lg transition-transform hover:-translate-y-2">
                <div className="text-red-600 text-8xl flex justify-center items-center mb-6">✪</div>
                <h3 className="text-xl font-semibold mb-4 flex justify-center items-center">About Aayuveda</h3>
                <p className="text-gray-600 flex justify-center items-center">Learn More about Aayuveda</p>
              </div>
            </RouterLink>
            <RouterLink to="/medicine-search">
              <div className="bg-white shadow-xl p-8 rounded-lg transition-transform hover:-translate-y-2">
                <div className="text-red-600 text-8xl mb-6 flex justify-center items-center">📱</div>
                <h3 className="text-xl font-semibold mb-4 flex justify-center items-center">Medicine Search</h3>
                <p className="text-gray-600 flex justify-center items-center">Search for any Medicine help</p>
              </div>
            </RouterLink>
            <RouterLink to="/hospitalmap">
              <div className="bg-white shadow-xl  p-8 rounded-lg transition-transform hover:-translate-y-2">
                <div className="text-red-600 text-8xl mb-6 flex justify-center items-center">🏥</div>
                <h3 className="text-xl font-semibold mb-4 flex justify-center items-center">Hospital Map</h3>
                <p className="text-gray-600 flex justify-center items-center">Find the nearest Hospital</p>
              </div>
            </RouterLink>

            <RouterLink to="/news">
              <div className="bg-white shadow-xl  p-8 rounded-lg transition-transform hover:-translate-y-2">
                <div className="text-red-600 text-8xl mb-6 flex justify-center items-center">📰</div>
                <h3 className="text-xl font-semibold mb-4 flex justify-center items-center">Healthcare News</h3>
                <p className="text-gray-600 flex justify-center items-center">Find latest News of Health</p>
              </div>
            </RouterLink>

            <RouterLink to="/weather">
              <div className="bg-white shadow-xl  p-8 rounded-lg transition-transform hover:-translate-y-2">
                <div className="text-red-600 text-8xl mb-6 flex justify-center items-center">🛰️</div>
                <h3 className="text-xl font-semibold mb-4 flex justify-center items-center">Weather Assistance</h3>
                <p className="text-gray-600 flex justify-center items-center">AI based precautions suggestions</p>
              </div>
            </RouterLink>

            <ScrollLink to="start">
              <div className="bg-white shadow-xl  p-8 rounded-lg transition-transform hover:-translate-y-2">
                <div className="text-red-600 text-8xl mb-6 flex justify-center items-center">⬆️</div>
                <h3 className="text-xl font-semibold mb-4 flex justify-center items-center">Back</h3>
                <p className="text-gray-600 flex justify-center items-center">Back to Top</p>
              </div>
            </ScrollLink>
          </div>
        </div>
      </section>
    </Element>
  );
}
function About1() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:gap-16">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h2 className="text-3xl text-red-600 md:text-4xl font-bold mb-6">
              About Our Team
            </h2>
            <p className="text-gray-600 mb-6">
              At AayuVeda, our team is more than just experts – we are
              passionate healers, innovators, and visionaries dedicated to
              bringing the power of Ayurveda into your life. With years of
              experience in natural wellness, our specialists combine ancient
              wisdom with modern science to help you achieve balance, vitality,
              and true well-being.
            </p>

            <p className="text-gray-600 mb-6">
              We don’t just promote Ayurveda – we live and breathe it. Get to
              know our team and let us guide you on a journey to better health,
              naturally! 🌱✨
            </p>
            <Link
              to="/about"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-black p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-red-500 mb-2">250+</h3>
                <p className="text-white">Projects Completed</p>
              </div>
              <div className="bg-black p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-red-500 mb-2">180+</h3>
                <p className="text-white">Happy Clients</p>
              </div>
              <div className="bg-black p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-red-500 mb-2">25+</h3>
                <p className="text-white">Team Members</p>
              </div>
              <div className="bg-black p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-red-500 mb-2">10+</h3>
                <p className="text-white">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="bg-white border-t border-gray-800 pt-2 pb-5 text-center">
      &copy; {new Date().getFullYear()} AayuVeda All rights reserved.
    </footer>
  );
}

export default Home;
