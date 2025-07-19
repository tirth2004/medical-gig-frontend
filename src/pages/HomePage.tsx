import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FlagDiv from "../components/FlagDiv";
import Carousel from "./Carousel";
import Comparison from "./Comparison";

interface Blog {
  id: string;
  title: string;
  author: string;
  image_url: string;
  created_at: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL: ", BACKEND_URL);

export default function HomePage() {
  const [countries, setCountries] = useState<
    { id: string; name: string; flag_image: string }[]
  >([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    // Fetch countries
    fetch(`${BACKEND_URL}/countries`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setCountries(result.countries || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

    // Fetch blogs
    fetch(`${BACKEND_URL}/blogs`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("Blogs result:", result);
        setBlogs(result.blogs || []);
        setBlogsLoading(false);
      })
      .catch((error) => {
        console.error("Blogs error:", error);
        setBlogsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="w-full flex justify-between items-center px-4 sm:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center">
          {/* Replace with your SVG or image if you have a logo */}
          <span
            className="font-bold text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "Wise Sans, sans-serif" }}
          >
            GradGlobe
          </span>
        </div>
        {/* Desktop Contact Section */}
        <div className="hidden sm:flex flex-row items-center gap-6">
          {/* Call Us */}
          <div className="flex items-center gap-2">
            <PhoneIcon className="text-blue-600" fontSize="medium" />
            <div>
              <div className="font-semibold text-blue-700">Call Us Now</div>
              <div className="font-bold text-black">+91 8860031900</div>
            </div>
          </div>
          {/* Divider */}
          <div className="h-8 w-px bg-gray-300 mx-2" />
          {/* WhatsApp Us */}
          <div className="flex items-center gap-2">
            <WhatsAppIcon className="text-green-500" fontSize="medium" />
            <div>
              <div className="font-semibold text-green-600">Whatsapp Us</div>
              <div className="font-bold text-black">+91 8860031900</div>
            </div>
          </div>
        </div>
        {/* Mobile Contact Section */}
        <div className="flex sm:hidden flex-row items-center gap-6">
          <PhoneIcon className="text-blue-600" fontSize="medium" />
          <WhatsAppIcon className="text-green-500" fontSize="medium" />
        </div>
      </div>
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center justify-center text-center pt-16 mb-8 px-4 sm:px-12 md:px-32">
        <h1
          className="font-black text-3xl sm:text-5xl md:text-7xl text-black tracking-tighter"
          style={{
            fontFamily: "Wise Sans, sans-serif",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.1em",
          }}
        >
          COLLEGES ACROSS BORDERS.
          <br />
          DREAMS ACROSS CONTINENTS.
        </h1>
        <p
          className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 font-normal max-w-2xl"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Simplifying study abroad, one country at a time.
        </p>
      </div>
      {/* Countries Section */}
      <div className="w-full flex flex-col items-center justify-center text-center mb-12 px-2">
        <h2
          className="font-bold text-2xl sm:text-3xl mb-8"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Top Countries,{" "}
          <span className="text-[#a83232] font-semibold">
            Unlimited Opportunities
          </span>
        </h2>
        {loading ? (
          <div className="text-gray-500">Loading countries...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-5xl mx-auto">
            {countries.map((country) => (
              <FlagDiv
                key={country.id}
                id={country.id}
                name={country.name}
                flag_image={country.flag_image}
                onClick={() => navigate(`/countries/${country.id}`)}
              />
            ))}
          </div>
        )}
      </div>
      <Carousel />
      <Comparison />

      {/* Latest Blogs Section */}
      <div className="w-full py-16 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Latest Blogs
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
          </div>

          {/* Blogs Grid */}
          {blogsLoading ? (
            <div className="text-center py-12">
              <div className="text-gray-500">Loading blogs...</div>
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogs.slice(0, 3).map((blog) => (
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
              <p className="text-gray-500">No blogs available at the moment.</p>
            </div>
          )}

          {/* View All Blogs Button */}
          <div className="text-center">
            <button
              onClick={() => navigate("/allblogs")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg border-2 border-white transition-colors duration-300 flex items-center gap-2 mx-auto"
            >
              View All Latest Blogs
              <span className="text-xl">→</span>
              <span className="text-sm">||</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
