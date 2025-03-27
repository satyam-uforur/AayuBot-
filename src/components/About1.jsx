function About1() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:gap-16">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About Our Company
            </h2>
            <p className="text-gray-600 mb-6">
              Founded in 2015, we've been at the forefront of digital
              innovation, helping businesses of all sizes transform their online
              presence.
            </p>
            <p className="text-gray-600 mb-6">
              Our team of experts combines technical excellence with creative
              thinking to deliver solutions that not only meet but exceed our
              clients' expectations.
            </p>
            <a
              href="#about"
              className="inline-block bg-transparent hover:bg-gray-800 text-black border border-gray-700 font-medium py-2 px-4 rounded transition-colors"
            >
              Learn More About Us
            </a>
          </div>
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-900 p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-blue-500 mb-2">250+</h3>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-blue-500 mb-2">180+</h3>
                <p className="text-gray-600">Happy Clients</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-blue-500 mb-2">25+</h3>
                <p className="text-gray-600">Team Members</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-blue-500 mb-2">10+</h3>
                <p className="text-gray-600">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About1;
