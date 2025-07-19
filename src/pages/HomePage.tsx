import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FlagDiv from "../components/FlagDiv";
import Carousel from "./Carousel";
import Comparison from "./Comparison";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL: ", BACKEND_URL);

export default function HomePage() {
  const [countries, setCountries] = useState<
    { id: string; name: string; flag_image: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

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
    </>
  );
}
