import React, { memo } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useCookies } from "react-cookie";
import { Box } from "@mui/material";
import { Dark00, DarkFFF, DarkBorder } from "./CommonCookies";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = ({ open, handleLogout, handleContinue }) => {
  const [cookies] = useCookies(["theme"]);

  return (
    <div>
      {open && (
        <div className="modal-overlay">
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            sx={{ zIndex: 1600 }}
          >
            <Box
              sx={{
                backgroundColor: Dark00(cookies),
                color: DarkFFF(cookies),
                border: DarkBorder(cookies),
              }}
            >
              <DialogTitle>
                Are you sure you want to continue to this session?
              </DialogTitle>
              <DialogActions
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => handleLogout()}
                  sx={{
                    background: "#DC143C",
                    ":hover": {
                      background: "#DC143C !important",
                    },
                  }}
                >
                  Logout
                </Button>
                <Button
                  onClick={() => handleContinue()}
                  sx={{
                    background: "#0063A5",
                    ":hover": {
                      background: "#0063A5 !important",
                    },
                  }}
                >
                  Continue
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default memo(DialogBox);
