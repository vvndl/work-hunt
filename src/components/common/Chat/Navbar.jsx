import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../../../style.scss";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { t } = useTranslation(); // Moved outside of conditional block

  console.log("currentUser:", currentUser);

  // Check if currentUser is defined before accessing its properties
  if (!currentUser) {
    return null; // You can choose to render nothing or a "Not logged in" message
  }

  console.log("currentUser.displayName:", currentUser.displayName); // Add this line for debugging

  return (
    <div className="navbar">
      <span className="logo">{t("WKchat")}</span>
      <div className="user">
        {/* Use an empty string as fallback for src */}
        <span>{currentUser.name || t("user")}</span>{" "}
        {/* Use a default value as fallback */}
      </div>
    </div>
  );
};

export default Navbar;
