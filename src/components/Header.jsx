import React from "react";

const Header = () => {
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
          </ul>
        </nav>
        <div>
          <a
            href="#contact"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
