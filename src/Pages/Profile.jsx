import React, { useEffect } from "react";
import ProfileComponent from "../components/ProfileComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Profile({ currentUser }) {
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      console.log(res?.accessToken);
    });
  }, []);
  return <ProfileComponent currentUser={currentUser} />;
}
