import React, { useEffect, useState } from "react";
import Logotype from "../../../assets/Logotype.png";
import SearchUsers from "../SearchUsers";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  // AiOutlineBell,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import { BsBriefcase } from "react-icons/bs";
import { getAllUsers } from "../../../api/FirestoreAPI";
import ProfilePopup from "../ProfilePopup";
import "./index.scss";
import { useTranslation } from "react-i18next";

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  let navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  useEffect(() => {
    const handleSearch = () => {
      if (searchInput !== "") {
        let searched = users.filter((user) => {
          return Object.values(user)
            .join("")
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        });

        setFilteredUsers(searched);
      } else {
        setFilteredUsers(users);
      }
    };

    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput, users]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <div className="topbar-main">
        {popupVisible ? (
          <div className="popup-position">
            <ProfilePopup />
          </div>
        ) : (
          <></>
        )}

        <img className="workhunt-logo" src={Logotype} alt="" />
        {isSearch ? (
          <SearchUsers
            setIsSearch={setIsSearch}
            setSearchInput={setSearchInput}
          />
        ) : (
          <div className="react-icons">
            <AiOutlineSearch
              size={30}
              className="react-icon"
              onClick={() => setIsSearch(true)}
            />
            <AiOutlineHome
              size={30}
              className="react-icon"
              onClick={() => goToRoute("/home")}
            />
            <AiOutlineUserSwitch
              size={30}
              className="react-icon"
              onClick={() => goToRoute("/connections")}
            />
            {/* <BsBriefcase size={30} className="react-icon" /> */}
            <AiOutlineMessage
              size={30}
              className="react-icon"
              onClick={() => goToRoute("/message")}
            />
            {/* <AiOutlineBell size={30} className="react-icon" /> */}
            <div>
              <button
                className="react-btn"
                onClick={() => changeLanguage("en")}
              >
                EN
              </button>
              <button
                className="react-btn"
                onClick={() => changeLanguage("ukr")}
              >
                UKR
              </button>
            </div>
          </div>
        )}
        <img
          className="user-logo"
          src={currentUser?.imageLink}
          alt="user"
          onClick={displayPopup}
        />

        {searchInput.length === 0 ? (
          <></>
        ) : (
          <div className="search-results">
            {filteredUsers.length === 0 ? (
              <div className="search-inner">{t("non")}</div>
            ) : (
              filteredUsers.map((user) => (
                <div className="search-inner" onClick={() => openUser(user)}>
                  <img src={user.imageLink} alt="" />
                  <p className="name">{user.name}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
