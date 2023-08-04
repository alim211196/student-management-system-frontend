import {
  Dashboard,
  People,
  ManageAccounts,
  Sms,
  Home,
  Login,
  CalendarMonth,
  Diversity3,
  AccountBalance,
  Equalizer

} from "@mui/icons-material";
export const navLinks = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Dashboard />,
    LoggedIn: true,
    access: "both",
  },
  {
    title: "Manage Teachers",
    path: "/manage-teachers",
    icon: <Diversity3 />,
    LoggedIn: true,
    access: "Admin",
  },
  {
    title: "Manage Departments",
    path: "/manage-departments",
    icon: <AccountBalance />,
    LoggedIn: true,
    access: "Admin",
  },
  {
    title: "Manage Students",
    path: "/manage-students",
    icon: <People />,
    LoggedIn: true,
    access: "Teacher",
  },
  {
    title: "Manage Students",
    path: "/manage-students-account",
    icon: <People />,
    LoggedIn: true,
    access: "Admin",
  },
  {
    title: "Manage Account",
    path: "/manage-account",
    icon: <ManageAccounts />,
    LoggedIn: true,
    access: "Teacher",
  },
  {
    title: "Manage Profile",
    path: "/manage-profile",
    icon: <ManageAccounts />,
    LoggedIn: true,
    access: "Admin",
  },

  {
    title: "Manage Queries",
    path: "/manage-queries",
    icon: <Sms />,
    LoggedIn: true,
    access: "both",
  },
  {
    title: "Manage Attendance",
    path: "/manage-attendance",
    icon: <CalendarMonth />,
    LoggedIn: true,
    access: "Teacher",
  },
  {
    title: "Manage Attendance",
    path: "/manage-students-attendance",
    icon: <Equalizer />,
    LoggedIn: true,
    access: "Admin",
  },
  {
    title: "Home",
    path: "/",
    icon: <Home />,
    LoggedIn: false,
  },
  {
    title: "Sign in",
    path: "/sign_in",
    icon: <Login />,
    LoggedIn: false,
  },
];
