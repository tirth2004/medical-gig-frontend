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

  useEffect(() => {
    fetch("http://localhost:3000/colleges")
      .then((res) => res.json())
      .then((data) => {
        setColleges(data.colleges || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1
        className="text-3xl sm:text-5xl font-black mb-8 text-center"
        style={{ fontFamily: "Wise Sans, sans-serif" }}
      >
        All Colleges
      </h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading colleges...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {colleges.map((college) => (
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
  );
}
