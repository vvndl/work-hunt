import React, { useState } from "react";
import { editProfile } from "../../../api/FirestoreAPI";
import { AiOutlineClose } from "react-icons/ai";
import "./index.scss";

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
  return (
    <div className="profile-card">
      <div className="edit-btn">
        <AiOutlineClose className="close-icon" onClick={onEdit} size={25} />
      </div>

      <div className="profile-edit-inputs">
        <label>Ім'я</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Ім'я"
          name="name"
          value={editInputs.name}
        />
        <label>Заголовок</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Заголовок"
          name="headline"
          value={editInputs.headline}
        />
        <label>Країна</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Країна"
          name="country"
          value={editInputs.country}
        />
        <label>Місто</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Місто"
          name="city"
          value={editInputs.city}
        />
        <label>Місце роботи</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Місце роботи"
          name="company"
          value={editInputs.company}
        />
        <label>Освіта</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Освіта"
          name="college"
          value={editInputs.college}
        />
        <label>Веб-сторінка</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Веб-сторінка"
          name="website"
          value={editInputs.website}
        />
        <label>Про</label>
        <textarea
          placeholder="Про себе"
          className="common-textArea"
          onChange={getInput}
          rows={5}
          name="aboutMe"
          value={editInputs.aboutMe}
        />
        <label>Навички</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Навички"
          name="skills"
          value={editInputs.skills}
        />
      </div>
      <div className="save-container">
        <button className="save-btn" onClick={updateProfileData}>
          Зберегти
        </button>
      </div>
    </div>
  );
}
