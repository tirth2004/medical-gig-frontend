import { useState } from "react";

interface InterestDialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  phone_number: string;
  email_address: string;
  country: string;
  state: string;
  college_of_interest: string;
}

export default function InterestDialogBox({
  isOpen,
  onClose,
}: InterestDialogBoxProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone_number: "",
    email_address: "",
    country: "",
    state: "",
    college_of_interest: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/customers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Reset form after successful submission
        setTimeout(() => {
          setSuccess(false);
          setFormData({
            name: "",
            phone_number: "",
            email_address: "",
            country: "",
            state: "",
            college_of_interest: "",
          });
          onClose();
        }, 2000);
      } else {
        setError(data.message || "Failed to submit interest form");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-sm">📋</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Apply Now</h2>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex">
          {/* Left Panel - Information */}
          <div className="bg-blue-800 text-white p-6 w-1/3">
            <h3 className="text-xl font-bold mb-6">
              How Nayee Disha helps you in Admission
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-700 p-3 rounded-lg text-center">
                <div className="text-2xl mb-2">📅</div>
                <div className="text-sm font-medium">Application Deadlines</div>
              </div>
              <div className="bg-blue-700 p-3 rounded-lg text-center">
                <div className="text-2xl mb-2">🎧</div>
                <div className="text-sm font-medium">24/7 Counselling</div>
              </div>
              <div className="bg-blue-700 p-3 rounded-lg text-center">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-sm font-medium">Check Detailed Fees</div>
              </div>
              <div className="bg-blue-700 p-3 rounded-lg text-center">
                <div className="text-2xl mb-2">🔍</div>
                <div className="text-sm font-medium">Shortlist & Apply</div>
              </div>
            </div>

            <div className="text-sm italic">
              "Our team of seasoned professionals, well-versed in the
              intricacies of international education"
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="flex-1 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Name"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={formData.email_address}
                    onChange={(e) =>
                      handleInputChange("email_address", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Email"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <div className="flex items-center px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                      <span className="text-sm">🇮🇳 +91</span>
                    </div>
                    <input
                      type="tel"
                      value={formData.phone_number}
                      onChange={(e) =>
                        handleInputChange("phone_number", e.target.value)
                      }
                      required
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter mobile number"
                    />
                  </div>
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your state"
                  />
                </div>

                {/* College of Interest */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    College of Interest
                  </label>
                  <input
                    type="text"
                    value={formData.college_of_interest}
                    onChange={(e) =>
                      handleInputChange("college_of_interest", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter college/university name"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter country name"
                  />
                </div>
              </div>

              {/* Security Message */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500">🔒</span>
                Your personal information is secure with us
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  Thank you! Your interest has been submitted successfully.
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Submitting..." : "SUBMIT"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
