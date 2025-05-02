import { Link } from "react-router";

function Footer() {
  return (
    <div className="w-full h-footer-height bg-tulip flex items-center px-wrapper flex-row justify-between">
      <div>
        <img src="src\logo\Veloura.png" alt="Veloura Logo"></img>
      </div>
      <div>
        <h5 className="text-woody-wine">Help</h5>
        <ul>
          <li className="underline">
            <Link to="/">FAQ</Link>
          </li>
          <li className="underline">
            <Link to="/">Cookie policy</Link>
          </li>
          <li className="underline">
            <Link to="/">Privacy policy</Link>
          </li>
        </ul>
      </div>
      <div>
        <h5 className="text-woody-wine">About</h5>
        <ul>
          <li className="underline">
            <Link to="/">About us</Link>
          </li>
          <li className="underline">
            <Link to="/">Contact us</Link>
          </li>
        </ul>
      </div>
      <div>
        <h5 className="text-woody-wine">Socials</h5>
        <ul>
          <li className="underline">
            <Link to="/">Instagram</Link>
          </li>
          <li className="underline">
            <Link to="/">Facebook</Link>
          </li>
          <li className="underline">
            <Link to="/">Linkedin</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
