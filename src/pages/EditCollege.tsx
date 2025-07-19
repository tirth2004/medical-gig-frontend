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
  logo_link: string;
  intake: string;
  duration: string;
  recognition: string;
  medium: string;
}

export default function EditCollege() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [yearOfEstablishment, setYearOfEstablishment] = useState("");
  const [intro, setIntro] = useState("");
  const [courseFees, setCourseFees] = useState("");
  const [admissionEligibility, setAdmissionEligibility] = useState("");
  const [benefits, setBenefits] = useState("");
  const [campusInfo, setCampusInfo] = useState("");
  const [logoLink, setLogoLink] = useState("");
  const [intake, setIntake] = useState("");
  const [duration, setDuration] = useState("");
  const [recognition, setRecognition] = useState("");
  const [medium, setMedium] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/admin");
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/colleges/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const college: College = data.college;
          setName(college.name);
          setCountry(college.country);
          setState(college.state);
          setYearOfEstablishment(college.year_of_establishment.toString());
          setIntro(college.intro || "");
          setCourseFees(college.course_fees || "");
          setAdmissionEligibility(college.admission_eligibility || "");
          setBenefits(college.benefits || "");
          setCampusInfo(college.campus_info || "");
          setLogoLink(college.logo_link);
          setIntake(college.intake || "");
          setDuration(college.duration || "");
          setRecognition(college.recognition || "");
          setMedium(college.medium || "");
        } else {
          setError("Failed to fetch college data");
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchCollege();
    }
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
        `${import.meta.env.VITE_BACKEND_URL}/admin/colleges/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            country,
            state,
            year_of_establishment: parseInt(yearOfEstablishment),
            intro,
            course_fees: courseFees,
            admission_eligibility: admissionEligibility,
            benefits,
            campus_info: campusInfo,
            logo_link: logoLink,
            intake,
            duration,
            recognition,
            medium,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Success - redirect to colleges list
        navigate("/admin/colleges");
      } else {
        setError(data.message || "Failed to update college");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/colleges");
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading college data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit College</h1>
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
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    College Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter college name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="logoLink"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Logo URL *
                  </label>
                  <input
                    type="url"
                    id="logoLink"
                    value={logoLink}
                    onChange={(e) => setLogoLink(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/logo.png"
                  />
                  {logoLink && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <img
                        src={logoLink}
                        alt="Logo preview"
                        className="w-16 h-16 object-cover rounded border"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter country"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter state"
                  />
                </div>

                <div>
                  <label
                    htmlFor="yearOfEstablishment"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Year of Establishment *
                  </label>
                  <input
                    type="number"
                    id="yearOfEstablishment"
                    value={yearOfEstablishment}
                    onChange={(e) => setYearOfEstablishment(e.target.value)}
                    required
                    min="1800"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 1995"
                  />
                </div>

                <div>
                  <label
                    htmlFor="intake"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Intake
                  </label>
                  <input
                    type="text"
                    id="intake"
                    value={intake}
                    onChange={(e) => setIntake(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., September, March"
                  />
                </div>

                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 5 years"
                  />
                </div>

                <div>
                  <label
                    htmlFor="recognition"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Recognition
                  </label>
                  <input
                    type="text"
                    id="recognition"
                    value={recognition}
                    onChange={(e) => setRecognition(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., WHO, MCI"
                  />
                </div>

                <div>
                  <label
                    htmlFor="medium"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Medium of Instruction
                  </label>
                  <input
                    type="text"
                    id="medium"
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., English"
                  />
                </div>
              </div>

              {/* Course Fees */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Fees
                </label>
                <div className="border border-gray-300 rounded-md markdown">
                  <MDXEditor
                    markdown={courseFees}
                    onChange={(val) => setCourseFees(val)}
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
                    className="min-h-[150px]"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Use the toolbar above to format course fees information. You
                  can create tables, lists, and add formatting.
                </p>
              </div>

              {/* Introduction */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Introduction
                </label>
                <div className="border border-gray-300 rounded-md markdown">
                  <MDXEditor
                    markdown={intro}
                    onChange={(val) => setIntro(val)}
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
                    className="min-h-[200px]"
                  />
                </div>
              </div>

              {/* Admission Eligibility */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admission Eligibility
                </label>
                <div className="border border-gray-300 rounded-md markdown">
                  <MDXEditor
                    markdown={admissionEligibility}
                    onChange={(val) => setAdmissionEligibility(val)}
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
                    className="min-h-[200px]"
                  />
                </div>
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits
                </label>
                <div className="border border-gray-300 rounded-md markdown">
                  <MDXEditor
                    markdown={benefits}
                    onChange={(val) => setBenefits(val)}
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
                    className="min-h-[200px]"
                  />
                </div>
              </div>

              {/* Campus Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campus Information
                </label>
                <div className="border border-gray-300 rounded-md markdown">
                  <MDXEditor
                    markdown={campusInfo}
                    onChange={(val) => setCampusInfo(val)}
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
                    className="min-h-[200px]"
                  />
                </div>
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
                  {loading ? "Updating..." : "Update College"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
