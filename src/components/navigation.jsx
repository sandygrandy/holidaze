import { useEffect, useState } from "react";
import { Link } from "react-router";
import Hamburger from 'hamburger-react'

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
        setShowHamburgerMenu(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <div className="bg-greige w-full h-nav-height-mobile md:h-nav-height flex items-center px-10 md:px-wrapper flex-row justify-between">
        <div>
          <img 
          onClick={() => window.location.href = "/"}
          className="w-32 md:w-56 cursor-pointer"
          src="../src/logo/Veloura.png" 
          alt="Veloura Logo"></img>
        </div>
        <div className="normal-menu">
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
              <Link to="#">Dashboard</Link>
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
              <li className="m-6 text-woody-wine text-medium-p">
                <Link to="/profile">Profile</Link>
              </li>
            )}

            {isLoggedIn && (
              <li className="m-6 text-woody-wine text-medium-p logout-btn">
                <button onClick={handleLogout}>Log out</button>
              </li>
            )}
          </ul>
        </div>
        <div className="hamburger-menu-button">
          <Hamburger 
          color="#4C2C2C" 
          
          toggled={showHamburgerMenu} 
          toggle={setShowHamburgerMenu} />
        </div>
        
      </div>
      {showHamburgerMenu && 
        <ul className="flex flex-col items-center justify-center">
        <li className="m-4 text-woody-wine text-medium-p" onClick={() => setShowHamburgerMenu(false)}>
          <Link to="/">Home</Link>
        </li>
        <li className="m-4 text-woody-wine text-medium-p" onClick={() => setShowHamburgerMenu(false)}>
          <Link to="/venues" >Venues</Link>
        </li>
        {!isLoggedIn && (
          <li className="m-4 text-woody-wine text-medium-p" onClick={() => setShowHamburgerMenu(false)}>
            <Link to="/login" >Login</Link>
          </li>
        )}
        {isManager && (
          <li className="m-4 text-woody-wine text-medium-p" onClick={() => setShowHamburgerMenu(false)}>
            <Link to="/managerVenuesView" >Manage venues</Link>
          </li>
        )}
        {isManager && (
          <li className="m-4 text-woody-wine text-medium-p" onClick={() => setShowHamburgerMenu(false)}>
            <Link to="/createVenue" >New venue</Link>
          </li>
        )}
        {isLoggedIn && (
          <li className="m-6 text-woody-wine text-medium-p" onClick={() => setShowHamburgerMenu(false)}>
            <Link to="/profile" >Profile</Link>
          </li>
        )}
        {isLoggedIn && (
          <li className="m-6 text-woody-wine text-medium-p logout-btn" onClick={() => setShowHamburgerMenu(false)}>
            <button onClick={handleLogout}>Log out</button>
          </li>
        )}
      </ul> 
        }
    </>
  );
}

export default Navigation;
