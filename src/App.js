import React, { lazy, Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import LinearProgress from "@mui/material/LinearProgress";
const CustomSnackbar = lazy(() => import("./Utils/CustomSnackbar"));
const CustomProgressBar = lazy(() => import("./Utils/CustomProgressBar"));
const RouteIndex = lazy(() => import("./route"));

function App() {
  return (
    <Suspense
      fallback={
        <LinearProgress
          sx={{
            height: "10px",
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          }}
        />
      }
      timeout={1000}
    >
      <CookiesProvider>
        <CustomSnackbar />
        <CustomProgressBar />
        <RouteIndex />
      </CookiesProvider>
    </Suspense>
  );
}

export default App;
