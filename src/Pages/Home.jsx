import React, { useEffect, useState } from "react";
import HomeComponent from "../components/HomeComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

export default function Home({ currentUser }) {
  const [, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (res) => {
        if (!res?.accessToken) {
          navigate("/");
        } else {
          setLoading(false);
        }
      },
      [navigate] // Include 'navigate' in the dependency array
    );
  }, []);

  return <HomeComponent currentUser={currentUser} />;
}
