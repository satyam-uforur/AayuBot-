import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Link as ScrollLink, Element } from "react-scroll";
import { Link, Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

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
    <motion.header 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 bg-white border-b-2 border-red-600 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex flex-shrink-0 items-center">
          <img src="/logo2.jpg" className="w-14 h-14" alt="AayuBot Logo" />
          <h1 className="text-xl font-bold">
            Aayu<span className="text-red-700">Bot</span>
          </h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-5">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/medicine-search", label: "Medicine Search" },
              { to: "/hospitalmap", label: "Hospital Map" },
              { to: "/news", label: "News" },
              { to: "/weather", label: "Weather" }
            ].map((item) => (
              <li key={item.to}>
                <RouterLink
                  to={item.to}
                  className="text-black hover:bg-red-600 hover:text-white transition-colors p-2 rounded-full px-3"
                >
                  {item.label}
                </RouterLink>
              </li>
            ))}
          </ul>
        </nav>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ScrollLink
            to="section1"
            smooth={true}
            className="inline-block bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white font-medium py-3 px-6 rounded-full transition-colors shadow-lg hover:shadow-xl"
          >
            Get Started
          </ScrollLink>
        </motion.div>
      </div>
    </motion.header>
  );
}

function Hero() {
  return (
    <Element name="start">
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        id="home" 
        className="py-24 md:py-32 bg-white"
      >
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
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
          >
            An intelligent platform powered by AayuBot for personalized medicine 
            suggestions and dynamic health assistance. Get the right care, 
            instantly and effortlessly.
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ScrollLink
                to="section1"
                smooth={true}
                className="inline-block bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white font-medium py-3 px-6 rounded-full transition-colors shadow-lg hover:shadow-xl"
              >
                Get Started
              </ScrollLink>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#services"
                className="inline-block bg-transparent hover:bg-red-600 text-black hover:text-white border border-red-700 font-medium py-3 px-6 rounded-full transition-colors shadow-md hover:shadow-lg"
              >
                Learn More
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </Element>
  );
}

function Services() {
  const serviceItems = [
    {
      to: "/about",
      icon: "✪",
      title: "About AayuBot",
      description: "Learn More about AayuBot"
    },
    {
      to: "/medicine-search",
      icon: "📱",
      title: "Medicine Search",
      description: "Intelligent Medicine Assistance"
    },
    {
      to: "/hospitalmap",
      icon: "🏥",
      title: "Hospital Map",
      description: "Locate Nearest Healthcare Facilities"
    },
    {
      to: "/news",
      icon: "📰",
      title: "Healthcare News",
      description: "Latest Health Insights"
    },
    {
      to: "/weather",
      icon: "🛰️",
      title: "Health Precautions",
      description: "AI-Powered Weather Guidance"
    },
    {
      to: "start",
      icon: "⬆️",
      title: "Back to Top",
      description: "Return to Beginning"
    }
  ];

  return (
    <Element name="section1">
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        id="services" 
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-red-600 font-bold mb-4">
              Explore AayuBot Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.5 
                }}
                whileHover={{ scale: 1.05 }}
              >
                {item.to.startsWith('/') ? (
                  <RouterLink to={item.to}>
                    <ServiceCard {...item} />
                  </RouterLink>
                ) : (
                  <ScrollLink to={item.to}>
                    <ServiceCard {...item} />
                  </ScrollLink>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </Element>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white shadow-xl p-8 rounded-lg transition-transform hover:-translate-y-2">
      <div className="text-red-600 text-8xl flex justify-center items-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4 flex justify-center items-center">
        {title}
      </h3>
      <p className="text-gray-600 flex justify-center items-center text-center">
        {description}
      </p>
    </div>
  );
}

function About1() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      id="about" 
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:gap-16">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h2 className="text-3xl text-red-600 md:text-4xl font-bold mb-6">
              About Our Team
            </h2>
            <p className="text-gray-600 mb-6">
              At AayuBot, our team is more than just experts – we are passionate 
              technologists, innovators, and visionaries dedicated to bringing 
              advanced AI-powered healthcare solutions into your life. With cutting-edge 
              technology and deep healthcare insights, our specialists combine 
              innovation with empathy to help you achieve better health outcomes.
            </p>

            <p className="text-gray-600 mb-6">
              We don't just develop technology – we create solutions that 
              transform healthcare experiences. Get to know our team and 
              let us guide you on a journey to smarter, more accessible healthcare! 🌐✨
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/about"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full transition-colors shadow-lg hover:shadow-xl"
              >
                Learn More About Us
              </Link>
            </motion.div>
          </div>
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "400k+", label: "Medicines Warehouse" },
                { value: "180+", label: "Happy Clients" },
                { value: "5+", label: "Team Members" },
                { value: "1+", label: "Years of Innovation" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.2,
                    duration: 0.5 
                  }}
                  className="bg-black p-6 rounded-lg text-center"
                >
                  <h3 className="text-3xl font-bold text-red-500 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-white">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-t border-gray-800 pt-2 pb-5 text-center"
    >
      &copy; {new Date().getFullYear()} AayuBot All rights reserved.
    </motion.footer>
  );
}

export default Home;