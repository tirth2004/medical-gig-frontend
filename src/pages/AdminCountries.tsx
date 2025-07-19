import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Country {
  id: string;
  name: string;
  flag_image: string;
}

export default function AdminCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
      return;
    }

    // Fetch countries
    fetch(`${import.meta.env.VITE_BACKEND_URL}/countries`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.countries || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin");
  };

  const handleAddCountry = () => {
    navigate("/admin/countries/add");
  };

  const handleEditCountry = (countryId: string) => {
    navigate(`/admin/countries/edit/${countryId}`);
  };

  const handleDeleteCountry = async (countryId: string) => {
    if (!window.confirm("Are you sure you want to delete this country?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/countries/${countryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Remove the country from the local state
        setCountries(countries.filter((country) => country.id !== countryId));
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete country");
      }
    } catch {
      alert("Network error. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading countries...</div>
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
              Manage Countries
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

          {/* Add Country Button */}
          <div className="mb-6">
            <button
              onClick={handleAddCountry}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Add Country
            </button>
          </div>

          {/* Countries List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {countries.map((country) => (
                <li key={country.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={country.flag_image}
                        alt={`${country.name} flag`}
                        className="w-12 h-8 object-cover rounded mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {country.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          ID: {country.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCountry(country.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCountry(country.id)}
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

          {countries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No countries found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
