function Footer() {
  return (
    <footer className="bg-white border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h2 className="text-xl font-bold mb-4">
              Nexus<span className="text-blue-500">Tech</span>
            </h2>
            <p className="text-gray-400 mb-6">
              Building digital experiences that help businesses thrive in the
              modern world.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 flex items-center justify-center bg-gray-900 hover:bg-blue-600 rounded-full text-gray-600 hover:text-black transition-colors"
              >
                🐦
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="w-10 h-10 flex items-center justify-center bg-gray-900 hover:bg-blue-600 rounded-full text-gray-600 hover:text-black transition-colors"
              >
                🐙
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center bg-gray-900 hover:bg-blue-600 rounded-full text-gray-600 hover:text-black transition-colors"
              >
                📷
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#web"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#mobile"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Mobile Apps
                </a>
              </li>
              <li>
                <a
                  href="#design"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  UI/UX Design
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#blog"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#docs"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#support"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} NexusTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
