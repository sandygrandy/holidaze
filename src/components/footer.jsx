import { Link } from "react-router";

function Footer() {
  return (
    <div className="w-full h-footer-height bg-tulip flex items-center px-10 md:px-wrapper flex-row justify-between">
      <div className="hidden md:flex ">
        <img 
        className="w-full object-contain "
        src="/logo/Veloura.png" 
        alt="Veloura Logo"></img>
      </div>
      <div>
        <h5 className="text-woody-wine">Help</h5>
        <ul>
          <li>
            <Link to="/">FAQ</Link>
          </li>
          <li>
            <Link to="/">Cookie policy</Link>
          </li>
          <li>
            <Link to="/">Privacy policy</Link>
          </li>
        </ul>
      </div>
      <div>
        <h5 className="text-woody-wine">About</h5>
        <ul>
          <li>
            <Link to="/">About us</Link>
          </li>
          <li>
            <Link to="/">Contact us</Link>
          </li>
        </ul>
      </div>
      <div>
        <h5 className="text-woody-wine">Socials</h5>
        <ul>
          <li>
            <Link to="/">Instagram</Link>
          </li>
          <li>
            <Link to="/">Facebook</Link>
          </li>
          <li>
            <Link to="/">Linkedin</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
