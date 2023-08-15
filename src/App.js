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
        <div>
          {" "}
          <LinearProgress
            sx={{
              background:"#2C497F",
            }}
          />
        </div>
      }
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
