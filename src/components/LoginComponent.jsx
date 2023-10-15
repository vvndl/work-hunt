import React, { useState } from "react";
import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";
import GoogleButton from "react-google-button";
import Logotype from "../assets/Logotype.png";
import { useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      toast.success("Ласкаво просими у WORK-HUNT!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Будь ласка, перевірте свою електронну пошту або пароль");
    }
  };

  const googleSignIn = () => {
    let response = GoogleSignInAPI();
    navigate("/home");
  };
  return (
    <div className="login-wrapper">
      <img src={Logotype} className="workhuntlogo" />
      <div className="login-wrapper-inner">
        <h1 className="heading">Увійдіть в систему</h1>
        <p className="sub-heading">
          Будьте в курсі подій у вашому професійному світі
        </p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Електронна пошта або телефон"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Пароль"
          />
        </div>
        <button onClick={login} className="login-btn">
          Увійти
        </button>
      </div>
      <hr className="hr-text" data-content="або" />
      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={googleSignIn} />
        <div className="google-btn-container">
          <p className="go-to-signup">
            Ви вперше на WORK-HUNT?{" "}
            <span className="join-now" onClick={() => navigate("/register")}>
              Приєднуйтеся зараз
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
