import React, { useState } from "react";
import { editProfile } from "../../../api/FirestoreAPI";
import { AiOutlineClose } from "react-icons/ai";
import "./index.scss";
import { useTranslation } from "react-i18next";

export default function ProfileEdit({ onEdit, currentUser }) {
  const [editInputs, seteditInputs] = useState(currentUser);
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    seteditInputs({ ...editInputs, ...input });
  };

  const updateProfileData = async () => {
    await editProfile(currentUser?.id, editInputs);
    await onEdit();
  };
  const { t } = useTranslation();
  return (
    <div className="profile-card">
      <div className="edit-btn">
        <AiOutlineClose className="close-icon" onClick={onEdit} size={25} />
      </div>

      <div className="profile-edit-inputs">
        <label>{t("name")}</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder={t("name")}
          name="name"
          value={editInputs.name}
        />
        <label>{t("headline")}</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder={t("headline")}
          name="headline"
          value={editInputs.headline}
        />
        <label>{t("country")}</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder={t("country")}
          name="country"
          value={editInputs.country}
        />
        <label>{t("city")}</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder={t("city")}
          name="city"
          value={editInputs.city}
        />
        <label>{t("company")}</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder={t("company")}
          name="company"
          value={editInputs.company}
        />
        <label>{t("college")}</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder={t("college")}
          name="college"
          value={editInputs.college}
        />
        <label>{t("website")}</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder={t("website")}
          name="website"
          value={editInputs.website}
        />
        <label>{t("aboutMe")}</label>
        <textarea
          placeholder={t("aboutMe")}
          className="common-textArea"
          onChange={getInput}
          rows={5}
          name="aboutMe"
          value={editInputs.aboutMe}
        />
        <label>{t("skills")}</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder={t("skills")}
          name="skills"
          value={editInputs.skills}
        />
      </div>
      <div className="save-container">
        <button className="save-btn" onClick={updateProfileData}>
          {t("save")}
        </button>
      </div>
    </div>
  );
}
