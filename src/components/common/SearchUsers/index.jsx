import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./index.scss";
import { useTranslation } from "react-i18next";

export default function SearchUsers({ setIsSearch, setSearchInput }) {
  const { t } = useTranslation();

  return (
    <div className="search-users">
      <input
        placeholder={t("search")}
        onChange={(event) => setSearchInput(event.target.value)}
      />

      <AiOutlineCloseCircle
        className="close-icon"
        size={20}
        onClick={() => {
          setIsSearch(false);
          setSearchInput("");
        }}
      />
    </div>
  );
}
