import "./styles/index.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import HomePage from "./pages/homePage";
import VenuesPage from "./pages/venuesPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import BookingPage from "./pages/bookingPage";
import Dashboard from "./pages/dashboard";
import ProfilePage from "./pages/profilePage";

function App() {
  return (
  <>
    <Navigation />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/venues" element={<VenuesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/book/:id" element={<BookingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
    <Footer />
  </>
  );
}

export default App;
