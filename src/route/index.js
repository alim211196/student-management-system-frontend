import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy } from "react";
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
const ResetPassword = lazy(() => import("../components/ResetPassword/index"));
const EditProfile = lazy(() => import("../components/EditProfile"));
const Home = lazy(() => import("../components/Home"));
const ViewMessage = lazy(() => import("../components/ViewMessage"));
const ManageAttendance = lazy(() =>
  import("../components/StudentAttendance/index")
);

const RouteIndex = () => {
  const [cookies] = useCookies(["UserType"]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-queries" element={<ViewMessage />} />

          {cookies?.UserType === "Admin" && (
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

          {cookies?.UserType === "Teacher" && (
            <>
              <Route path="/manage-students" element={<ManageStudent />} />
              <Route path="/manage-students/:id" element={<ViewRecords />} />
              <Route path="/manage-account" element={<EditProfile />} />
              <Route path="/manage-attendance" element={<ManageAttendance />} />
            </>
          )}
        </Route>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/sign_in" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default RouteIndex;
