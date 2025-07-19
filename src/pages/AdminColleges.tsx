import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface College {
  id: string;
  name: string;
  country: string;
  state: string;
  year_of_establishment: number;
  intro: string;
  course_fees: string;
  admission_eligibility: string;
  benefits: string;
  campus_info: string;
  logo_link: string;
  intake: string;
  duration: string;
  recognition: string;
  medium: string;
}

export default function AdminColleges() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
      return;
    }

    // Fetch colleges
    fetch(`${import.meta.env.VITE_BACKEND_URL}/colleges`)
      .then((res) => res.json())
      .then((data) => {
        setColleges(data.colleges || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin");
  };

  const handleAddCollege = () => {
    navigate("/admin/colleges/add");
  };

  const handleEditCollege = (collegeId: string) => {
    navigate(`/admin/colleges/edit/${collegeId}`);
  };

  const handleDeleteCollege = async (collegeId: string) => {
    if (!window.confirm("Are you sure you want to delete this college?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/colleges/${collegeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Remove the college from the local state
        setColleges(colleges.filter((college) => college.id !== collegeId));
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete college");
      }
    } catch {
      alert("Network error. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading colleges...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Colleges
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/admin/home")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Back to Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Add College Button */}
          <div className="mb-6">
            <button
              onClick={handleAddCollege}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Add College
            </button>
          </div>

          {/* Colleges List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {colleges.map((college) => (
                <li key={college.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={college.logo_link}
                        alt={`${college.name} logo`}
                        className="w-12 h-12 object-cover rounded mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {college.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {college.country}, {college.state}
                        </p>
                        <p className="text-sm text-gray-500">
                          Established: {college.year_of_establishment} |
                          Duration: {college.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCollege(college.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCollege(college.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {colleges.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No colleges found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
