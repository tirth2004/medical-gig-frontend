import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function BlogDetailedView() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("Blog ID not found");
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/blogs/${id}`);
        const data = await response.json();

        if (response.ok) {
          setBlog(data.blog);
        } else {
          setError(data.message || "Failed to fetch blog");
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error || "Blog not found"}</p>
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
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <span>←</span>
            Back to Blogs
          </button>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64 sm:h-80 md:h-96">
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
          </div>

          {/* Blog Header */}
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">By</span>
                  <span className="font-semibold text-gray-900">
                    {blog.author}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>
                  Published: {new Date(blog.created_at).toLocaleDateString()}
                </span>
                {blog.updated_at !== blog.created_at && (
                  <span>
                    Updated: {new Date(blog.updated_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            {/* Blog Content */}
            <div className="markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {blog.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
