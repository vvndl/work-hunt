import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Main from "../components/common/Chat/Main";

export default function Message({ currentUser }) {
  const [, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  });

  return <Main currentUser={currentUser} />;
}
