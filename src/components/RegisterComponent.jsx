import React, { useState } from "react";
import { RegisterAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import Logotype from "../assets/Logotype.png";
import { useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
import { getUniqueID } from "../helpers/getUniqueld";
import { firestore } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const register = async () => {
    try {
      let res = await RegisterAPI(credentails.email, credentails.password);
      toast.success("Акаунт створено!");
      // The following line creates the document in the "users" collection.
      // If you don't want to create it, you can remove this line.
      // await setDoc(doc(firestore, "users", res.user.uid), {});
      postUserData({
        userID: getUniqueID(),
        name: credentails.name,
        email: credentails.email,
        uid: res.user.uid,
        displayName: credentails.name,
      });
      await setDoc(doc(firestore, "userChats", res.user.uid), {});

      navigate("/home");
      localStorage.setItem("userEmail", res.user.email);
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create your Account");
    }
  };

  return (
    <div className="login-wrapper">
      <img src={Logotype} className="workhuntLogo" alt="" />

      <div className="login-wrapper-inner">
        <h1 className="heading">
          Використовуйте своє професійне життя на повну
        </h1>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Ваше ім'я"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Електронна пошта або номер телефону"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Пароль (6 або більше символів)"
          />
        </div>
        <button onClick={register} className="login-btn">
          Приєднатися
        </button>
      </div>
      <hr class="hr-text" data-content="або" />
      <div className="google-btn-container">
        <p className="go-to-signup">
          Вже на WORK-HUNT?{" "}
          <span className="join-now" onClick={() => navigate("/")}>
            Увійти
          </span>
        </p>
      </div>
    </div>
  );
}
