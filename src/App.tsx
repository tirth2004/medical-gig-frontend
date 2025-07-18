import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CountryDetail from "./pages/CountryDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/countries/:id" element={<CountryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
