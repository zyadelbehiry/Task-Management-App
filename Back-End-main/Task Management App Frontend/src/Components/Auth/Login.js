import React, { useReducer, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Store/AuthSlice";
import style from "./Login.module.css";
import AuthCard from "../UI/Auth/AuthCard";
import BrandIcon from "../UI/BrandIcon/BrandIcon";
import bg from "../../BG4.jpg";
import Spinner from "../UI/Spinner/Spinner";

const credentialsReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.value };
    case "SET_PASSWORD":
      return { ...state, password: action.value };
    default:
      return state;
  }
};

const initialCredentials = { username: "", password: "" };

const Login = () => {
  const [userCredentials, dispatchUser] = useReducer(
    credentialsReducer,
    initialCredentials
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isInputTouched, setIsInputTouched] = useState(false);

  let authError = useSelector((state) => state.auth.error);
  let authLoading = useSelector((state) => state.auth.loading); 
  const [checkValidation, setCheckValidation] = useState(false);
  let [showErrorMessage, setShowError] = useState(authError !== null);
  const inputChangeHandler = (type, value) => {
    dispatchUser({ type, value });
    setIsInputTouched(true);
    setShowError(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(loginUser(userCredentials));
    setCheckValidation(true);
    setIsInputTouched(false);
  };
  if (checkValidation && localStorage.user !== undefined) {
    setCheckValidation(false);
    navigate("/work-space");
  }

  return (
    <>
      {authLoading ? (
        <Spinner />
      ) : (
        <div className={style["login"]}>
          <AuthCard>
            <h1>
              TASK <BrandIcon />
            </h1>
            <h4>Login to TaskOO</h4>
            <form className={style["login-form"]} onSubmit={submitHandler}>
              {showErrorMessage && (
                <p className={style["wrong-credentials"]}>{authError}</p>
              )}
              <input
                onChange={(e) => {
                  inputChangeHandler("SET_USERNAME", e.target.value);
                }}
                className={style["form-inpt"]}
                type="email"
                placeholder="Enter your email"
              />
              <input
                onChange={(e) => {
                  inputChangeHandler("SET_PASSWORD", e.target.value);
                }}
                className={style["form-inpt"]}
                type="password"
                placeholder="Enter your password"
              />
              <input
                className={`${style["form-inpt"]} ${style["submit-btn"]}`}
                type="submit"
                value={"Login"}
              />
              <NavLink className={style["signup"]} to={"/auth/signup"} >
                Create an account
              </NavLink>
            </form>
          </AuthCard>
          <img src={bg} loading="lazy" alt="" />
        </div>
      )}
    </>
  );
};

export default Login;
