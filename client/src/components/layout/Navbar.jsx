import { NavLink } from "react-router";
import "../../styles/Navbar.css";
import homeIcon from "../../styles/icons/house-door.svg";
import homeFillIcon from "../../styles/icons/house-door-fill.svg";
// import profileCircleIcon from "../../styles/icons/person-circle.svg"
import profileIcon from "../../styles/icons/person.svg"
import profileFillIcon from "../../styles/icons/person-fill.svg"
import AddMenu from "../AddMenu";

export default function NavBar() {

  return (
    <nav className="navbar">

      <div className="nav-icons">
        < AddMenu />          

        <NavLink to='/home' className="icon-hover">
          <img className="icon-default" src={homeIcon} />
          <img className="icon-hover-state" src={homeFillIcon} />
        </NavLink>

        <NavLink to='/my-collections' className="icon-hover"> {/* not setup yet */}
          <img className="icon-default" src={profileIcon} /> 
          <img className="icon-hover-state" src={profileFillIcon} />
        </NavLink>
      </div>

    </nav>
  )
}