import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CountryDetail from "./pages/CountryDetail";
import AllCountry from "./pages/AllCountry";
import CollegeDetail from "./pages/CollegeDetail";
import CompareCollege from "./pages/CompareCollege";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import AdminCountries from "./pages/AdminCountries";
import AddCountry from "./pages/AddCountry";
import EditCountry from "./pages/EditCountry";
import AdminColleges from "./pages/AdminColleges";
import AddCollege from "./pages/AddCollege";
import EditCollege from "./pages/EditCollege";
import BlogDetailedView from "./pages/BlogDetailedView";
import AllBlogs from "./pages/AllBlogs";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePage />
            </>
          }
        />
        <Route
          path="/countries/:id"
          element={
            <>
              <Header />
              <CountryDetail />
            </>
          }
        />
        <Route
          path="/all-country"
          element={
            <>
              <Header />
              <AllCountry />
            </>
          }
        />
        <Route
          path="/colleges/:id"
          element={
            <>
              <Header />
              <CollegeDetail />
            </>
          }
        />
        <Route
          path="/compare-colleges"
          element={
            <>
              <Header />
              <CompareCollege />
            </>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <>
              <Header />
              <BlogDetailedView />
            </>
          }
        />
        <Route
          path="/allblogs"
          element={
            <>
              <Header />
              <AllBlogs />
            </>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/countries"
          element={
            <ProtectedRoute>
              <AdminCountries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/countries/add"
          element={
            <ProtectedRoute>
              <AddCountry />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/countries/edit/:id"
          element={
            <ProtectedRoute>
              <EditCountry />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/colleges"
          element={
            <ProtectedRoute>
              <AdminColleges />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/colleges/add"
          element={
            <ProtectedRoute>
              <AddCollege />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/colleges/edit/:id"
          element={
            <ProtectedRoute>
              <EditCollege />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
