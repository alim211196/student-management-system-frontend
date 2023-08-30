import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy } from "react";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
const ViewRecords = lazy(() =>
  import("../components/ManageStudent/ViewRecords")
);
const ViewTeacher = lazy(() =>
  import("../components/ManageTeacher/ViewTeacher")
);
const ManageTeacher = lazy(() => import("../components/ManageTeacher/index"));
const ManageDepartment = lazy(() => import("../components/ManageDept/index"));
const ManageAttendanceByAdmin = lazy(() =>
  import("../components/AttendanceManageByAdmin/index")
);
const UniqueAttendance = lazy(() =>
  import("../components/UniqueAttendance/index")
);
const UniqueStudentAttendance = lazy(() =>
  import("../components/UniqueStudentAtt/index")
);
const Dashboard = lazy(() => import("../components/Dashboard/index"));
const ManageStudent = lazy(() => import("../components/ManageStudent/index"));
const Login = lazy(() => import("../components/Login/index"));
const PageNotFound = lazy(() => import("../Utils/PageNotFound"));
const PrivateRoute = lazy(() => import("../route/PrivateRoute"));
const PublicRoute = lazy(() => import("../route/PublicRoute"));
const ForgotPassword = lazy(() => import("../components/ForgotPassword/index"));
const PrivacyPolicy = lazy(() => import("../components/PrivacyPolicy/index"));
const ResetPassword = lazy(() => import("../components/ResetPassword/index"));
const EditProfile = lazy(() => import("../components/EditProfile"));
const Home = lazy(() => import("../components/Home"));
const ViewMessage = lazy(() => import("../components/ViewMessage"));
const ManageAttendance = lazy(() =>
  import("../components/StudentAttendance/index")
);

const RouteIndex = () => {
  const [cookies] = useCookies(["token"]);
 let decoded = null;

if (cookies?.token && cookies?.token !== "undefined") {
  try {
    decoded = jwt_decode(cookies.token);
    // You can access properties of 'decoded' here
  } catch (error) {
    console.error("JWT decoding error:", error);
  }
} else {
  console.log("Token is undefined or not present.");
}


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-queries" element={<ViewMessage />} />

          {decoded?.userType === "Admin" && (
            <>
              <Route path="/manage-teachers" element={<ManageTeacher />} />
              <Route path="/manage-teachers/:id" element={<ViewTeacher />} />
              <Route
                path="/manage-departments"
                element={<ManageDepartment />}
              />
              <Route
                path="/manage-students-account"
                element={<ManageStudent />}
              />
              <Route
                path="/manage-students-account/:id"
                element={<ViewRecords />}
              />
              <Route path="/manage-profile" element={<EditProfile />} />
              <Route
                path="/manage-students-attendance"
                element={<ManageAttendanceByAdmin />}
              />
              <Route
                path="/manage-students-attendance/:id"
                element={<UniqueAttendance />}
              />
              <Route
                path="/view-student-attendance/:id"
                element={<UniqueStudentAttendance />}
              />
            </>
          )}

          {decoded?.userType === "Teacher" && (
            <>
              <Route path="/manage-students" element={<ManageStudent />} />
              <Route path="/manage-students/:id" element={<ViewRecords />} />
              <Route path="/manage-account" element={<EditProfile />} />
              <Route path="/manage-attendance" element={<ManageAttendance />} />
            </>
          )}
        </Route>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default RouteIndex;
