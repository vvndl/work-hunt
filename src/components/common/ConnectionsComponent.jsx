import React, { useEffect, useState } from "react";
import { getAllUsers, addConnection } from "../../api/FirestoreAPI";
import ConnectedUsers from "../common/ConnectedUsers";
import "../../Sass/ConnectionsComponent.scss";
import { useTranslation } from "react-i18next";

export default function ConnectionsComponent({ currentUser }) {
  const [users, setUsers] = useState([]);
  const getCurrentUser = (id) => {
    addConnection(currentUser.id, id);
  };
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  const { t } = useTranslation();

  return users.length > 1 ? (
    <div className="connections-main">
      {users.map((user) => {
        return user.id === currentUser.id ? (
          <></>
        ) : (
          <ConnectedUsers
            currentUser={currentUser}
            user={user}
            getCurrentUser={getCurrentUser}
          />
        );
      })}
    </div>
  ) : (
    <div className="connections-main">{t("nocon")}</div>
  );
}
