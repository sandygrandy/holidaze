import { Link } from "react-router";

function Navigation() {
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
          <li className="m-6 text-woody-wine text-medium-p">
            <Link to="/login">Login</Link>
          </li>

          {/* Manager view */}
          <li className="m-6 text-woody-wine hidden">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          {/* User and manager view */}
          <li className="m-6 text-woody-wine hidden">
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
