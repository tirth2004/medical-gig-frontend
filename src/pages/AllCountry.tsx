import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface College {
  id: string;
  logo_link: string;
  name: string;
  country: string;
  state: string;
  intake: string;
  year_of_establishment: number;
  recognition: string;
  duration: string;
  medium: string;
}

export default function AllCountry() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/colleges`)
      .then((res) => res.json())
      .then((data) => {
        setColleges(data.colleges || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Country counts
  const countryCounts = colleges.reduce((acc, c) => {
    acc[c.country] = (acc[c.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const countryList = Object.entries(countryCounts).map(([country, count]) => ({
    country,
    count,
  }));

  // Filtered colleges
  const filteredColleges = colleges
    .filter(
      (c) =>
        selectedCountries.length === 0 || selectedCountries.includes(c.country)
    )
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  // Filter UI
  const filterSidebar = (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">Filters</h2>
        <button
          className="text-blue-600 text-sm font-semibold"
          onClick={() => setSelectedCountries([])}
        >
          Reset
        </button>
      </div>
      <div className="text-gray-500 text-sm mb-4">
        Total {filteredColleges.length} Universities
      </div>
      <hr className="mb-4" />
      <div>
        <div className="font-bold mb-2">Country</div>
        <div className="flex flex-col gap-2">
          {countryList.map(({ country, count }) => (
            <label key={country} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCountries.includes(country)}
                onChange={() => {
                  setSelectedCountries((selectedCountries) =>
                    selectedCountries.includes(country)
                      ? selectedCountries.filter((c) => c !== country)
                      : [...selectedCountries, country]
                  );
                }}
                className="mr-2 accent-blue-600"
              />
              <span
                className={
                  selectedCountries.includes(country)
                    ? "font-bold text-blue-700"
                    : ""
                }
              >
                {country} ({count})
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-6 py-8">
      <h1
        className="text-3xl sm:text-5xl font-black mb-8 text-center"
        style={{ fontFamily: "Wise Sans, sans-serif" }}
      >
        All Colleges
      </h1>
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search college name"
          className="w-full md:w-80 px-4 py-2 border rounded shadow-sm"
        />
      </div>
      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          className="flex items-center gap-2 px-4 py-2 border rounded text-blue-700 border-blue-300 font-semibold"
          onClick={() => setShowMobileFilter(true)}
        >
          <svg
            className="w-5 h-5 mr-1 inline"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 017 17V13.414a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
          Filters
        </button>
      </div>
      {/* Mobile Filter Modal */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end">
          <div className="w-80 bg-white h-full shadow-lg p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                className="text-blue-600 text-sm font-semibold"
                onClick={() => setShowMobileFilter(false)}
              >
                Close
              </button>
            </div>
            {filterSidebar}
          </div>
          <div className="flex-1" onClick={() => setShowMobileFilter(false)} />
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-72 flex-shrink-0">
          {filterSidebar}
        </aside>
        {/* Main Content */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center text-gray-500">Loading colleges...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredColleges.map((college) => (
                <Link
                  key={college.id}
                  to={`/colleges/${college.id}`}
                  className="block"
                >
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-lg transition-shadow">
                    <img
                      src={college.logo_link}
                      alt={college.name}
                      className="w-24 h-24 object-contain rounded-md border mb-4 sm:mb-0"
                    />
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h2 className="text-xl font-bold mb-1 sm:mb-0">
                          {college.name}
                        </h2>
                        <span className="text-sm text-gray-500 font-medium">
                          {college.country}, {college.state}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-700 mb-2">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Intake: {college.intake}
                        </span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                          Year: {college.year_of_establishment}
                        </span>
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                          Duration: {college.duration}
                        </span>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          Medium: {college.medium}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Recognition: {college.recognition}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
