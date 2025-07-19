import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AdminUser {
  id: string;
  username: string;
}

export default function AdminHome() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem("adminToken");
    const userStr = localStorage.getItem("adminUser");

    if (!token || !userStr) {
      navigate("/admin");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      setAdminUser(user);
    } catch {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin");
  };

  if (!adminUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Hello, {adminUser.username}!
              </h2>
              <p className="text-gray-600">
                Welcome to the admin dashboard. Here you can manage countries
                and colleges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
