import React from "react";
import { NavLink } from "react-router-dom";

function LeftNav(props) {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink
            to="/"
            exact="true"
            className={props.active === "home" ? "active-left-nav" : null}
          >
            <img src="./img/icons/home.svg" alt="home" />
          </NavLink>
          <NavLink
            to="/trending"
            exact="true"
            className={props.active === "trending" ? "active-left-nav" : null}
          >
            <img src="./img/icons/rocket.svg" alt="trending" />
          </NavLink>
          <NavLink
            to="/profil"
            exact="true"
            className={props.active === "profil" ? "active-left-nav" : null}
          >
            <img src="./img/icons/user.svg" alt="user profil" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LeftNav;
