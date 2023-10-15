import React, { useEffect, useState } from "react";
import LoginComponent from "../components/LoginComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

export default function Login() {
  const [, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res?.accessToken) {
        navigate("/home");
      } else {
        setLoading(false);
      }
    });
  }, []);
  return <LoginComponent />;
}
