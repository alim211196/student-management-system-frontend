import React, { useState } from "react";
import CustomButton from "../../Utils/CustomButton";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openSnackbar } from "../../app/reducer/Snackbar";
import CustomTextField from "../../Utils/CustomTextField";
import BoxWrapper from "../../Utils/BoxWrapper";
import { FORGOT_PASSWORD } from "../../ApiFunctions/users";
import { errorHandler } from "../../ApiFunctions/ErrorHandler";
import { useCookies } from "react-cookie";
import { setLoading } from "../../app/reducer/Loader";
const ForgotPassword = () => {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies] = useCookies(["theme"]);
  const [formData, setFormData] = useState({
    email: "",
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
          message: "Please enter your email address.",
          severity: "error",
        })
      );
      return;
    }
    dispatch(setLoading(true));
    FORGOT_PASSWORD(formData)
      .then((res) => {
        dispatch(
          openSnackbar({
            message: "Valid email address.",
            severity: "success",
          })
        );
        navigate("/reset-password", { state: { ID: res.data } });
        dispatch(setLoading(false));
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
        dispatch(setLoading(false));
      });
  };

  return (
    <BoxWrapper
      text={"Forgot password"}
      label={"forgot password"}
      handleSubmit={handleSubmit}
      linkText={"Sign in"}
      path={"/login"}
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
      <CustomButton text={"Forgot Password"} loading={loading} />
    </BoxWrapper>
  );
};
export default ForgotPassword;
