import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
  author: string;
  image_url: string;
  created_at: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin");
        return;
      }

      const response = await fetch(`${BACKEND_URL}/blogs`);
      const data = await response.json();

      if (response.ok) {
        setBlogs(data.blogs || []);
      } else {
        setError(data.message || "Failed to fetch blogs");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin");
        return;
      }

      const response = await fetch(`${BACKEND_URL}/admin/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Refresh the blogs list
        fetchBlogs();
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete blog");
      }
    } catch {
      alert("Network error. Please try again.");
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/blogs/edit/${id}`);
  };

  const handleAdd = () => {
    navigate("/admin/blogs/add");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Manage Blogs</h1>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add New Blog
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Blogs Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {blogs.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <li key={blog.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {/* Blog Image */}
                          <div className="flex-shrink-0 h-16 w-16">
                            <img
                              className="h-16 w-16 rounded-lg object-cover"
                              src={blog.image_url}
                              alt={blog.title}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>

                          {/* Blog Info */}
                          <div className="ml-4 flex-1 min-w-0">
                            <h3 className="text-lg font-medium text-gray-900 truncate">
                              {blog.title}
                            </h3>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <span>By {blog.author}</span>
                              <span className="mx-2">•</span>
                              <span>
                                {new Date(blog.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(blog.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No blogs found
                </h3>
                <p className="text-gray-500 mb-4">
                  Get started by adding your first blog post.
                </p>
                <button
                  onClick={handleAdd}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add New Blog
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
