import React from "react";
import { userLogout } from "../../services";
import cookie from "js-cookie";

function Logout() {
  const removecookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    try {
      await userLogout();
      removecookie("jwt");
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
}

export default Logout;
