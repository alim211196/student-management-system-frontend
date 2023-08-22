import React, { useEffect, useState } from "react";
import CustomTheme from "../../Utils/CustomTheme";
import MiniDrawer from "../Drawer";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../app/reducer/Snackbar";
import DialogBox from "../../Utils/DialogBox";
import CardContainer from "../../Utils/CardContainer";
import { SearchWithFuse } from "../../Utils/SearchWithFuse";
import {
  GET_COMMENTS,
  SEND_REPLY,
  STUDENT_COMMENT_ACTIVATION,
} from "../../ApiFunctions/students";
import { errorHandler } from "../../ApiFunctions/ErrorHandler";
import { Container, CssBaseline } from "@mui/material";
import TitleBox from "../../Utils/TitleBox";
import { Sms } from "@mui/icons-material";
import { useCookies } from "react-cookie";
import { ContainerStyle } from "../../Utils/stylingMethods";
import Reply from "./Reply";
import { setLoading } from "../../app/reducer/Loader";
const ViewMessage = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const loading = useSelector((state) => state.loading);
  const [ID, setID] = useState("");
  const [active, setActive] = useState(false);
  const [cookies] = useCookies(["theme"]);
  const DataObj = {
    fullName: "",
    email: "",
    course: "bca",
    courseYear: "first year",
    query: "",
    subject: "",
    reply: "",
  };
  const [formData, setFormData] = useState(DataObj);
  const getStudentComment = () => {
    GET_COMMENTS()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
      });
  };

  useEffect(() => {
  GET_COMMENTS()
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      errorHandler(err?.status, err?.data, dispatch);
    });
  }, [dispatch]);

  const handleClose = () => {
    setDialogOpen(false);
    setID("");
  };
  const handleActive = (flag, id) => {
    setActive(flag);
    setDialogOpen(true);
    setID(id);
  };
  const handleClickOpen = (id) => {
    const currentData = data.find((item) => item._id === id);
    if (currentData) {
      setOpen(true);
      setFormData(DataObj);
      setFormData({
        fullName: currentData.fullName,
        email: currentData.email,
        course: currentData.course,
        courseYear: currentData.courseYear,
        query: currentData.comment,
        subject: "",
        reply: "",
      });
    }
  };

  const handleClickClose = () => {
    setOpen(false);
  };
  const handleActiveState = () => {
    STUDENT_COMMENT_ACTIVATION(ID, active)
      .then((res) => {
        getStudentComment();
        dispatch(
          openSnackbar({
            message: res.data,
            severity: "success",
          })
        );
        handleClose();
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
      });
  };

  const newResults = SearchWithFuse(
    ["fullName", "email", "phone"],
    query,
    data
  );

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
    SEND_REPLY(formData)
      .then((res) => {
        dispatch(
          openSnackbar({
            message: res.data,
            severity: "success",
          })
        );
        setFormData(DataObj);
        dispatch(setLoading(false));
        handleClickClose();
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
        dispatch(setLoading(false));
      });
  };

  return (
    <CustomTheme>
      <MiniDrawer
        setQuery={setQuery}
        query={query}
        data={data}
        flag={false}
        value={1}
      >
        <Container component="main" maxWidth="xl" sx={ContainerStyle}>
          <CssBaseline />
          <TitleBox
            icon={<Sms sx={{ color: "#fff" }} />}
            text={"Manage Queries"}
            data={data}
            fileName={"student_queries"}
          />
          <CardContainer
            flag={false}
            parentComp={"Manage Queries"}
            handleActive={handleActive}
            data={newResults}
            handleClickOpen={handleClickOpen}
          />
        </Container>
      </MiniDrawer>
      <Reply
        formData={formData}
        setFormData={setFormData}
        cookies={cookies}
        loading={loading}
        open={open}
        handleClose={handleClickClose}
        handleSubmit={handleSubmit}
      />
      <DialogBox
        open={dialogOpen}
        handleClose={handleClose}
        handleChange={handleActiveState}
        text={
          active === true
            ? "Are your sure you want to activate this comment?"
            : "Are your sure you want to deactivate this comment?"
        }
      />
    </CustomTheme>
  );
};

export default ViewMessage;
