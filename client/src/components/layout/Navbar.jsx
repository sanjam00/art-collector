import { NavLink } from "react-router";
import "../../styles/Navbar.css";
import homeIcon from "../../styles/icons/house-door.svg";
import homeFillIcon from "../../styles/icons/house-door-fill.svg";

export default function NavBar() {


  return (
    <div className="navbar-expand{-lg}">
      <nav className="navbar">

      <div className="nav-icons">
        <NavLink to='/trips/new'> 
          ➕ {/* needs to trigger a pop up that will take user to appropriate adding page */}
        </NavLink>

        <NavLink to='/home' className="icon-hover">
          <img className="bi bi-house-door icon-default" src={homeIcon} />
          <img className="bi bi-house-door icon-hover-state" src={homeFillIcon} />
        </NavLink>

        <NavLink to='/whoami'>
          🚹 {/* not setup yet */}
        </NavLink>
      </div>

      </nav>
    </div>
  )
}