import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface College {
  id: string;
  name: string;
  country: string;
  state: string;
  logo_link: string;
  year_of_establishment: number;
  duration: string;
  recognition: string;
  medium: string;
  intake: string;
}

export default function Comparison() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedColleges, setSelectedColleges] = useState<(College | null)[]>([
    null,
    null,
    null,
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeSearchIndex, setActiveSearchIndex] = useState<number | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/colleges`)
      .then((res) => res.json())
      .then((data) => setColleges(data.colleges || []));
  }, []);

  const filteredColleges = colleges.filter(
    (college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCollege = (index: number) => {
    setActiveSearchIndex(index);
    setShowDropdown(true);
    setSearchTerm("");
    setErrorMessage("");
  };

  const handleSelectCollege = (college: College) => {
    if (activeSearchIndex !== null) {
      const newSelectedColleges = [...selectedColleges];
      newSelectedColleges[activeSearchIndex] = college;
      setSelectedColleges(newSelectedColleges);
      setActiveSearchIndex(null);
      setShowDropdown(false);
      setSearchTerm("");
      setErrorMessage("");
    }
  };

  const handleRemoveCollege = (index: number) => {
    const newSelectedColleges = [...selectedColleges];
    newSelectedColleges[index] = null;
    setSelectedColleges(newSelectedColleges);
    setErrorMessage("");
  };

  const handleCompareNow = () => {
    const selectedCount = selectedColleges.filter(
      (college) => college !== null
    ).length;

    if (selectedCount < 2) {
      setErrorMessage("Please select at least 2 colleges to compare");
      return;
    }

    const selectedCollegesData = selectedColleges.filter(
      (college) => college !== null
    );
    navigate("/compare-colleges", {
      state: { colleges: selectedCollegesData },
    });
  };

  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Compare <span className="text-[#a83232]">Colleges</span>
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Choosing the right college is a crucial decision that can
            significantly impact your future. With numerous colleges offering
            diverse courses and facilities, comparing them helps you identify
            the best fit for your academic and personal goals. Compare your top
            university choices using our free tool given below.
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-center mb-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded inline-block">
              {errorMessage}
            </div>
          </div>
        )}

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((index) => (
            <div key={index} className="relative">
              {selectedColleges[index] ? (
                // College Card
                <div className="bg-white rounded-lg shadow-md p-4 border">
                  <button
                    onClick={() => handleRemoveCollege(index)}
                    className="absolute top-2 right-2 text-green-600 hover:text-green-800 text-xl font-bold"
                  >
                    ×
                  </button>
                  <img
                    src={selectedColleges[index]?.logo_link}
                    alt={selectedColleges[index]?.name}
                    className="w-47 h-47 object-contain rounded mb-3 mx-auto"
                  />
                  <h3 className="font-bold text-lg mb-2">
                    {selectedColleges[index]?.name}
                  </h3>
                  <p className="text-gray-600">
                    {selectedColleges[index]?.country},{" "}
                    {selectedColleges[index]?.state}
                  </p>
                </div>
              ) : (
                // Add College Button
                <div className="bg-white rounded-lg shadow-md p-6 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center min-h-[300px]">
                  <div className="text-4xl text-gray-400 mb-2">+</div>
                  <div className="text-gray-600 font-semibold mb-4">
                    Add College
                  </div>
                  <button
                    onClick={() => handleAddCollege(index)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add College
                  </button>
                </div>
              )}

              {/* Search Dropdown */}
              {activeSearchIndex === index && showDropdown && (
                <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg mt-2">
                  <div className="p-3 border-b">
                    <input
                      type="text"
                      placeholder="Search college by name"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredColleges.map((college) => (
                      <div
                        key={college.id}
                        onClick={() => handleSelectCollege(college)}
                        className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-semibold">{college.name}</div>
                        <div className="text-sm text-gray-600">
                          {college.country}
                        </div>
                      </div>
                    ))}
                    {filteredColleges.length === 0 && (
                      <div className="p-3 text-gray-500 text-center">
                        No colleges found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Compare Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleCompareNow}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full flex items-center gap-2"
          >
            Compare Now <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
