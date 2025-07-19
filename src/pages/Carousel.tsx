import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

interface College {
  id: string;
  logo_link: string;
  name: string;
  country: string;
  state: string;
  intake: string;
  year_of_establishment: number;
  recognition: string;
  duration: string;
  medium: string;
}

export default function Carousel() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [slideWidth, setSlideWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      const newCardsPerView = width < 640 ? 1 : 3;
      setCardsPerView(newCardsPerView);

      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const cardWidth = containerWidth / newCardsPerView;
        setSlideWidth(cardWidth);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/colleges`)
      .then((res) => res.json())
      .then((data) => setColleges(data.colleges || []));
  }, []);

  const maxIndex = Math.max(0, colleges.length - cardsPerView);

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const handleNext = () => {
    setCarouselIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const translateX = -(carouselIndex * slideWidth);

  return (
    <div className="w-full" style={{ background: "#9de86f" }}>
      <div className="py-12 px-4">
        {/* Heading and description OUTSIDE the sliding area */}
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Top MBBS <span className="text-[#a83232]">Universities</span>
        </h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-8">
          Explore the world's top MBBS universities with global recognition,
          advanced facilities, and affordable fees. Your dream of becoming a
          doctor starts here—discover the best options today!
        </p>
        {/* Carousel row below */}
        <div className="flex justify-center items-center gap-4 max-w-6xl mx-auto">
          <button
            className="rounded-full bg-white shadow-lg p-3 text-xl text-gray-700 hover:bg-gray-100 flex-shrink-0 z-10"
            onClick={handlePrev}
            aria-label="Previous"
            disabled={carouselIndex === 0}
          >
            &#8592;
          </button>
          <div
            ref={containerRef}
            className="relative overflow-hidden"
            style={{ width: "100%" }}
          >
            <div
              className="flex transition-transform duration-500"
              style={{
                width: `${slideWidth * colleges.length}px`,
                transform: `translateX(${translateX}px)`,
              }}
            >
              {colleges.map((college) => (
                <CarouselCard college={college} slideWidth={slideWidth} />
              ))}
            </div>
          </div>
          <button
            className="rounded-full bg-white shadow-lg p-3 text-xl text-gray-700 hover:bg-gray-100 flex-shrink-0 z-10"
            onClick={handleNext}
            aria-label="Next"
            disabled={carouselIndex === maxIndex}
          >
            &#8594;
          </button>
        </div>
        <div className="flex justify-center mt-8">
          <Link
            to="/all-country"
            className="border border-black-400 text-black-700 font-semibold py-2 px-6 rounded-full hover:bg-blue-100 flex items-center gap-2"
          >
            View All Universities <span className="text-xl">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

interface CarouselCardProps {
  college: College;
  slideWidth: number;
}

function CarouselCard({ college, slideWidth }: CarouselCardProps) {
  return (
    <div
      key={college.id}
      className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow"
      style={{ width: `${slideWidth}px`, marginRight: "16px" }}
    >
      <div className="w-full flex justify-between items-center mb-2"></div>
      <img
        src={college.logo_link}
        alt={college.name}
        className="w-20 h-20 object-contain rounded-md border mb-2"
      />
      <h3 className="text-lg font-bold text-center mb-1">{college.name}</h3>
      <div className="text-sm text-gray-500 text-center mb-2">
        {college.country}, {college.state}
      </div>
      <div className="flex flex-wrap gap-2 justify-center mb-2">
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">
          Intake: {college.intake}
        </span>
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">
          Year: {college.year_of_establishment}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mb-2">
        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-semibold">
          Duration: {college.duration}
        </span>
        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded font-semibold">
          Medium: {college.medium}
        </span>
      </div>
      <div className="text-xs text-gray-500 mb-2 text-center">
        Recognition: {college.recognition}
      </div>
      <div className="flex gap-2 w-full justify-center mt-2">
        <button
          className="text-white font-bold py-2 px-4 rounded-full text-sm"
          style={{ backgroundColor: "#9de86f", color: "black" }}
        >
          Apply Now
        </button>
        <Link
          to={`/colleges/${college.id}`}
          className="border border-green-400 text-green-700 font-semibold py-2 px-4 rounded-full text-sm hover:bg-green-50"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
