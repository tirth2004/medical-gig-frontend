import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import InterestDialogBox from "../components/InterestDialogBox";

const TABS = [
  { key: "intro", label: "Introduction" },
  { key: "course_fees", label: "Courses & Fees" },
  { key: "admission_eligibility", label: "Admission & Eligibility" },
  { key: "benefits", label: "Benefits" },
  { key: "campus_info", label: "Campus Info" },
  // { key: "reviews", label: "Reviews" },
];

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
  created_at: string;
  logo_link: string;
  intake: string;
  duration: string;
  recognition: string;
  medium: string;
}

export default function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("intro");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApplyNow = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/colleges/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCollege(data.college);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (!college)
    return <div className="text-center mt-8">College not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 py-8">
      {/* Banner */}
      <div className="relative rounded-xl overflow-hidden shadow-lg mb-8">
        <img
          src={college.logo_link}
          alt={college.name}
          className="w-full h-56 object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {college.name}
          </h1>
          <div className="text-pink-200 font-semibold text-lg mt-1">
            Year Of Establishment :{" "}
            <span className="text-pink-400">
              {college.year_of_establishment}
            </span>
          </div>
          <button
            onClick={handleApplyNow}
            className="mt-4 self-end bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Tabs and Content */}
        <div className="flex-1">
          {/* Tabs */}
          <div className="flex gap-2 border-b mb-4 overflow-x-auto whitespace-nowrap -mx-2 px-2">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`px-4 py-2 font-semibold border-b-2 transition ${
                  activeTab === tab.key
                    ? "border-blue-600 text-blue-600 bg-white"
                    : "border-transparent text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow p-4 mb-6 markdown max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {String(college[activeTab as keyof College])?.replace(
                /\n/g,
                "\n"
              ) || "No data available."}
            </ReactMarkdown>
          </div>
        </div>
        {/* Right: Sidebar Form */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4">
              Get Free Counselling
            </h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Country *</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Country"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">State *</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="State"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  College of Interest *
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="College of Interest"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Interest Dialog Box */}
      <InterestDialogBox isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </div>
  );
}
