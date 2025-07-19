import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

export default function CompareCollege() {
  const location = useLocation();
  const navigate = useNavigate();
  const colleges: College[] = location.state?.colleges || [];

  if (colleges.length < 2) {
    return (
      <div className="text-center mt-8">
        <p>Please select at least 2 colleges to compare.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const attributes = [
    { key: "logo", label: "Logo" },
    { key: "name", label: "Name" },
    { key: "state", label: "State" },
    { key: "year_of_establishment", label: "Year of Establishment" },
    { key: "duration", label: "Duration" },
    { key: "recognition", label: "Recognition" },
    { key: "medium", label: "Medium" },
    { key: "intake", label: "Intake" },
    { key: "actions", label: "Actions" },
  ];

  const getAttributeValue = (college: College, key: string) => {
    switch (key) {
      case "logo":
        return (
          <img
            src={college.logo_link}
            alt={college.name}
            className="w-12 h-12 object-contain rounded"
          />
        );
      case "name":
        return college.name;
      case "state":
        return `${college.country}, ${college.state}`;
      case "year_of_establishment":
        return college.year_of_establishment;
      case "duration":
        return college.duration;
      case "recognition":
        return college.recognition;
      case "medium":
        return college.medium;
      case "intake":
        return college.intake;
      case "actions":
        return (
          <button
            onClick={() => navigate(`/colleges/${college.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
          >
            Know More
          </button>
        );
      default:
        return college[key as keyof College];
    }
  };

  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            College <span className="text-[#a83232]">Comparison</span>
          </h1>
          <p className="text-gray-600">
            Compare your selected colleges side by side
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">
                    Attributes
                  </th>
                  {colleges.map((college) => (
                    <th
                      key={college.id}
                      className="px-6 py-4 text-center text-sm font-semibold text-gray-700 border-b min-w-[200px]"
                    >
                      <div className="flex flex-col items-center">
                        <img
                          src={college.logo_link}
                          alt={college.name}
                          className="w-16 h-16 object-contain rounded mb-2"
                        />
                        <div className="font-bold text-lg">{college.name}</div>
                        <div className="text-sm text-gray-600">
                          {college.country}, {college.state}
                        </div>
                        <button
                          onClick={() => navigate(`/colleges/${college.id}`)}
                          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                        >
                          Know University in 2 Min
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attributes.slice(1, -1).map((attr, index) => (
                  <tr
                    key={attr.key}
                    className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-gray-700 border-b">
                      {attr.label}
                    </td>
                    {colleges.map((college) => (
                      <td
                        key={college.id}
                        className="px-6 py-4 text-center text-sm text-gray-700 border-b"
                      >
                        {getAttributeValue(college, attr.key)}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Actions row */}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-700 border-b">
                    Actions
                  </td>
                  {colleges.map((college) => (
                    <td
                      key={college.id}
                      className="px-6 py-4 text-center border-b"
                    >
                      {getAttributeValue(college, "actions")}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
          >
            ← Back to Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
