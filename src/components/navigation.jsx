import { useEffect, useState } from "react";
import { Link } from "react-router";

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);

      try {
        const user = JSON.parse(userData);
        if (user.venueManager === true) {
          setIsManager(true);
        }
      }
      catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="bg-greige w-full h-nav-height flex items-center px-wrapper flex-row justify-between">
      <div>
        <img src="../src/logo/Veloura.png" alt="Veloura Logo"></img>
      </div>
      <div>
        <ul className="flex items-center justify-center flex-row">
          <li className="m-6 text-woody-wine text-medium-p">
            <Link to="/">Home</Link>
          </li>
          <li className="m-6 text-woody-wine text-medium-p">
            <Link to="/venues">Venues</Link>
          </li>

          {!isLoggedIn && (
            <li className="m-6 text-woody-wine text-medium-p">
              <Link to="/login">Login</Link>
            </li>
          )}

          {isManager && (
            <li className="m-6 text-woody-wine text-medium-p relative group">
            <Link to="/dashboard">Dashboard</Link>
            <ul className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded-md w-40 z-50">
              <li className="px-4 py-2 hover:bg-gray-100 rounded-md">
                <Link to="/managerVenuesView">Manage venues</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 rounded-md">
                <Link to="/createVenue">New venue</Link>
              </li>
            </ul>
          </li>
          )}

          {isLoggedIn && (
            <li className="m-6 text-woody-wine text-medium-p relative group">
              <Link to="/profile">Profile</Link>
              <ul className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded-md w-40 z-50">
                <li className="px-4 py-2 hover:bg-gray-100 rounded-md">
                  <Link to="/settings">Settings</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 rounded-md">
                  <Link to="/bookings">My Bookings</Link>
                </li>
              </ul>
            </li>
          )}

          {isLoggedIn && (
            <li className="m-6 text-woody-wine text-medium-p logout-btn">
              <button onClick={handleLogout}>Log out</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
