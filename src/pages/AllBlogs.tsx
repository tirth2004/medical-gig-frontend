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

export default function AllBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
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

    fetchBlogs();
  }, []);

  const handleBack = () => {
    navigate(-1);
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              <span>←</span>
              Back to Home
            </button>
            <h1 className="text-2xl font-bold text-gray-900">All Blogs</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/blogs/${blog.id}`)}
              >
                {/* Blog Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {/* Branding Overlay */}
                  <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-800">
                      NayeeDisha
                    </span>
                  </div>
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-white text-sm font-semibold line-clamp-2">
                      {blog.title}
                    </h3>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>By {blog.author}</span>
                    <span>
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Blogs Found
            </h2>
            <p className="text-gray-600">
              There are no blogs available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
