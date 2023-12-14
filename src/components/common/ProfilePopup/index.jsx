import React, { useMemo, useState } from "react";
import { onLogout } from "../../../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import "./index.scss";
import { useTranslation } from "react-i18next";

export default function ProfilePopup() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const { t } = useTranslation();
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="popup-card">
      <p className="name">{currentUser?.name}</p>
      <p className="headline">{currentUser?.headline}</p>
      <Button
        title={t("profile")}
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.id,
            },
          })
        }
      />
      <Button title={t("exit")} onClick={onLogout} />
    </div>
  );
}
