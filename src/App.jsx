import "./styles/index.css";
import ProtectedRoute from "./helpers/protectedRoute";
import { AuthProvider } from "./contexts/authContext";
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
import CreateVenue from "./pages/createVenuePage";
import ManagerVenuesView from "./pages/managerVenuesView";
import EditVenue from "./pages/editVenuePage";

function App() {
  return (
    <>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="manager">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createVenue"
            element={
              <ProtectedRoute role="manager">
                <CreateVenue />
              </ProtectedRoute>
            }
          />
          <Route
            path="/managerVenuesView"
            element={
              <ProtectedRoute role="manager">
                <ManagerVenuesView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editVenue/:id"
            element={
              <ProtectedRoute role="manager">
                <EditVenue />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="user">
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
