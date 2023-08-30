import React, { useState } from "react";
import CustomButton from "../../Utils/CustomButton";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeSnackbar, openSnackbar } from "../../app/reducer/Snackbar";
import { useCookies } from "react-cookie";
import CustomTextField from "../../Utils/CustomTextField";
import CustomPassword from "../../Utils/CustomPassword";
import BoxWrapper from "../../Utils/BoxWrapper";
import { USER_LOGIN } from "../../ApiFunctions/users";
import { errorHandler } from "../../ApiFunctions/ErrorHandler";
import { setLoading } from "../../app/reducer/Loader";
export default function SignIn() {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([
    "token",
    "theme",
  ]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataValues = new FormData(event.target);
    const data = {};
    for (let [key, value] of formDataValues.entries()) {
      data[key] = value;
    }
    const hasEmptyFields = Object.values(data).some((value) => !value);
    if (hasEmptyFields) {
      dispatch(
        openSnackbar({
          message: "Please fill out all fields.",
          severity: "error",
        })
      );
      return;
    }
    dispatch(setLoading(true));
    USER_LOGIN(formData)
      .then((res) => {
        dispatch(
          openSnackbar({
            message: "Login successfully.",
            severity: "success",
          })
        );
        setCookie("token", res?.data?.token, { path: "/" });
        navigate("/dashboard");
        dispatch(setLoading(false));
        dispatch(closeSnackbar())
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
        dispatch(setLoading(false));
      });
  };

  return (
    <BoxWrapper
      text={"Welcome back!"}
      handleSubmit={handleSubmit}
      linkText={"Forgot password"}
      path={"/forgot-password"}
      cookies={cookies}
      maxWidth={"xs"}
    >
      <CustomTextField
        label={"Email Address"}
        name="email"
        value={formData.email}
        setFormData={setFormData}
        type="email"
        disabled={false}
      />
      <CustomPassword
        label={"Password"}
        name="password"
        value={formData.password}
        setFormData={setFormData}
        cookies={cookies}
      />
      <CustomButton text={"LOG IN"} loading={loading} />
    </BoxWrapper>
  );
}
