import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  BlockTypeSelect,
  tablePlugin,
  BoldItalicUnderlineToggles,
  UndoRedo,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  Separator,
  InsertCodeBlock,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

interface Blog {
  id: string;
  title: string;
  author: string;
  image_url: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("Blog ID not found");
      setFetching(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/admin");
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`
        );
        const data = await response.json();

        if (response.ok) {
          const blog = data.blog;
          setTitle(blog.title);
          setAuthor(blog.author);
          setImageUrl(blog.image_url);
          setContent(blog.content);
        } else {
          setError(data.message || "Failed to fetch blog");
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setFetching(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/blogs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            author,
            image_url: imageUrl,
            content,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Success - redirect to blogs list
        navigate("/admin/blogs");
      } else {
        setError(data.message || "Failed to update blog");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/blogs");
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error && !title) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleCancel}
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
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Blog</h1>
            <button
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>

          {/* Form */}
          <div className="bg-white shadow rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Blog Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter blog title"
                />
              </div>

              {/* Author Field */}
              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Author *
                </label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter author name"
                />
              </div>

              {/* Image URL Field */}
              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Image URL *
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
                {imageUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <img
                      src={imageUrl}
                      alt="Blog image preview"
                      className="w-32 h-24 object-cover rounded border"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Content Field - Markdown Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Content *
                </label>
                <div className="border border-gray-300 rounded-md markdown">
                  <MDXEditor
                    markdown={content}
                    onChange={(val) => setContent(val)}
                    contentEditableClassName="prose max-w-none"
                    plugins={[
                      headingsPlugin(),
                      listsPlugin(),
                      linkPlugin(),
                      linkDialogPlugin(),
                      imagePlugin(),
                      quotePlugin(),
                      thematicBreakPlugin(),
                      markdownShortcutPlugin(),
                      tablePlugin(),
                      toolbarPlugin({
                        toolbarContents: () => (
                          <>
                            <UndoRedo />
                            <Separator />
                            <BoldItalicUnderlineToggles />
                            <Separator />
                            <BlockTypeSelect />
                            <Separator />
                            <ListsToggle />
                            <Separator />
                            <CreateLink />
                            <InsertImage />
                            <Separator />
                            <InsertTable />
                            <InsertCodeBlock />
                            <Separator />
                            <InsertThematicBreak />
                          </>
                        ),
                      }),
                    ]}
                    className="min-h-[400px]"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Use the toolbar above to format your content. You can add
                  headings, lists, links, images, and more.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Update Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
