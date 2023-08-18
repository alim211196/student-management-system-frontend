import React, { useState } from "react";
import CustomButton from "../../Utils/CustomButton";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../app/reducer/Snackbar";
import CustomPassword from "../../Utils/CustomPassword";
import BoxWrapper from "../../Utils/BoxWrapper";
import { RESET_PASSWORD } from "../../ApiFunctions/users";
import { errorHandler } from "../../ApiFunctions/ErrorHandler";
import { useCookies } from "react-cookie";
import CustomTextField from "../../Utils/CustomTextField";
import { setLoading } from "../../app/reducer/Loader";
export default function ResetPassword() {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { ID } = location.state;
  const [cookies] = useCookies(["theme"]);
  const [formData, setFormData] = useState({
    otp: "",
    new_password: "",
    confirm_password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataValues = new FormData(event.target);

    const data = {};
    for (let [key, value] of formDataValues.entries()) {
      data[key] = value;
    }

    const { new_password, confirm_password, otp } = data;
    if (new_password !== confirm_password) {
      dispatch(
        openSnackbar({
          message: "Passwords do not match.",
          severity: "error",
        })
      );
      return;
    }
    if (otp.length !== 6) {
      dispatch(
        openSnackbar({
          message: "OTP should be 6 digits long.",
          severity: "error",
        })
      );
      return;
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
    RESET_PASSWORD(ID, data.new_password, data.otp)
      .then((res) => {
        dispatch(
          openSnackbar({
            message: res.data,
            severity: "success",
          })
        );
        navigate("/login");
        dispatch(setLoading(false));
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
        dispatch(setLoading(false));
      });
  };

  return (
    <BoxWrapper
      maxWidth={"xs"}
      text={"Reset password"}
      label={"reset password"}
      handleSubmit={handleSubmit}
      cookies={cookies}
    >
      <CustomTextField
        label={"OTP"}
        name="otp"
        value={formData.otp}
        setFormData={setFormData}
        type="number"
        disabled={false}
      />
      <CustomPassword
        label={"New Password"}
        name="new_password"
        value={formData.new_password}
        setFormData={setFormData}
        cookies={cookies}
      />
      <CustomPassword
        label={"Confirm Password"}
        name="confirm_password"
        value={formData.confirm_password}
        setFormData={setFormData}
        cookies={cookies}
      />
      <CustomButton text={"Reset Password"} loading={loading} />
    </BoxWrapper>
  );
}
