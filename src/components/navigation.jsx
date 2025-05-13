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
        <img src="src\logo\Veloura.png" alt="Veloura Logo"></img>
      </div>
      <div>
        <ul className="flex items-center justify-center flex-row ">
          <li className="m-6 text-woody-wine text-medium-p">
            <Link to="/">Home</Link>
          </li>
          <li className="m-6 text-woody-wine text-medium-p">
            <Link to="/venues">Venues</Link>
          </li>
          <li className="m-6 text-woody-wine text-medium-p">
            <Link to="/about">About us</Link>
          </li>
          <li className="m-6 text-woody-wine text-medium-p">
            <Link to="/contact">Contact us</Link>
          </li>

          {/* Visitor view */}
          {!isLoggedIn && (
            <li className="m-6 text-woody-wine text-medium-p">
            <Link to="/login">Login</Link>
          </li>
          )}

          {/* User view */}

          {isLoggedIn && (
          <li className="m-6 text-woody-wine text-medium-p logout-btn">
            <button onClick={handleLogout}>Log out</button>
          </li>
          )}

          {/* Manager view */}
          {isManager && (
          <li className="m-6 text-woody-wine hidden">
          <Link to="/dashboard">Dashboard</Link>
        </li>
          )}
          {/* User and manager view */}
          {isLoggedIn && (
          <li className="m-6 text-woody-wine hidden">
            <Link to="/profile">Profile</Link>
          </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
