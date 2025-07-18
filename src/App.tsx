import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CountryDetail from "./pages/CountryDetail";
import AllCountry from "./pages/AllCountry";
import CollegeDetail from "./pages/CollegeDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/countries/:id" element={<CountryDetail />} />
        <Route path="/all-country" element={<AllCountry />} />
        <Route path="/colleges/:id" element={<CollegeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
