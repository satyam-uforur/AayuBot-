import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  Pill,
  Stethoscope,
  ExternalLink,
  Heart,
  Bot,
} from "lucide-react";
import { Link, Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink, Element } from "react-scroll";

const categories = ["Medicine", "Diseases", "Pandemic Virus"];

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(categories[0]); // Default to "Medicine"

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        apikey: import.meta.env.VITE_NEWS_API_KEY,
        q: query,
        language: "en",
      });

      const response = await fetch(`https://newsdata.io/api/1/news?${params}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.results || !Array.isArray(data.results)) {
        throw new Error("Invalid API response format");
      }

      setNews(data.results.slice(0, 9));
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to fetch news. Please try again.");
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [query]); // Fetch news when query changes

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 ">
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

      <div className="max-w-7xl mx-auto">
        <div className="flex mt-4 justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bot className="w-10 h-10 text-red-900" />
              <Heart className="w-4 h-4 text-red-500 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-900 text-transparent bg-clip-text">
              AayuVeda News
            </h1>
          </div>

          <select
            className="px-4 py-2 border border-black rounded-lg text-red-700 hover:text-red-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button
            onClick={fetchNews}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-red-400 to-red-400 text-white px-6 py-3 rounded-full hover:text-white hover:shadow-lg transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            Refresh News
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="flex flex-col items-center gap-4">
              <Pill className="w-12 h-12 text-red-600 animate-pulse" />
              <div className="text-2xl text-gray-600">
                Loading latest {query} news...
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-xl text-red-400">{error}</div>
          </div>
        ) : news.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-xl text-gray-600">
              No news articles available
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <div
                key={`${article.title}-${index}`}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={
                      article.image_url ||
                      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.source_id}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(article.pubDate).toLocaleDateString()}
                    </span>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-red-600 hover:text-blue-800 transition-colors"
                    >
                      Read More <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
