import { Link as ScrollLink } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

function Hero() {
  return (
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
  );
}
export default Hero;
