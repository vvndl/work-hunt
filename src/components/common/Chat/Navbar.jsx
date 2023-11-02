import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import "../../../style.scss";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  console.log("currentUser:", currentUser);

  // Check if currentUser is defined before accessing its properties
  if (!currentUser) {
    return null; // You can choose to render nothing or a "Not logged in" message
  }
  console.log("currentUser.displayName:", currentUser.displayName); // Add this line for debugging
  return (
    <div className="navbar">
      <span className="logo">WORK-HUNT Чат</span>
      <div className="user">
        {/* Use an empty string as fallback for src */}
        <span>{currentUser.name || "Користувач"}</span>{" "}
        {/* Use a default value as fallback */}
      </div>
    </div>
  );
};

export default Navbar;
