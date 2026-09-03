import { NavLink } from "react-router";
import "../../styles/Navbar.css";
import homeIcon from "../../styles/icons/house-door.svg";
import homeFillIcon from "../../styles/icons/house-door-fill.svg";
// import profileCircleIcon from "../../styles/icons/person-circle.svg"
import profileIcon from "../../styles/icons/person.svg"
import profileFillIcon from "../../styles/icons/person-fill.svg"
import plusCircleIcon from "../../styles/icons/plus-circle.svg"
import plusCircleFillIcon from "../../styles/icons/plus-circle-fill.svg"

export default function NavBar() {

  return (
    <div className="navbar-expand{-lg}">
      <nav className="navbar">

      <div className="nav-icons">
          {/* needs to trigger a pop up that will take user to appropriate adding page */}
        <NavLink to='/trips/new' className="icon-hover"> 
          <img className="bi bi-plus-circle icon-default" src={plusCircleIcon} />
          <img className="bi bi-plus-circle icon-hover-state" src={plusCircleFillIcon} />
        </NavLink>

        <NavLink to='/home' className="icon-hover">
          <img className="bi bi-house-door icon-default" src={homeIcon} />
          <img className="bi bi-house-door-fill icon-hover-state" src={homeFillIcon} />
        </NavLink>

        <NavLink to='/whoami' className="icon-hover"> {/* not setup yet */}
          <img className="bi bi-person-circle icon-default" src={profileIcon} /> 
          <img className="bi bi-person-fill icon-hover-state" src={profileFillIcon} />
        </NavLink>
      </div>

      </nav>
    </div>
  )
}