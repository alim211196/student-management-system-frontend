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

const DialogBox = ({ open, handleClose, handleChange,text }) => {
  const [cookies] = useCookies(["theme"]);
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{zIndex:1000}}
      >
        <Box
          sx={{
            backgroundColor: Dark00(cookies),
            color: DarkFFF(cookies),
            border: DarkBorder(cookies),
          }}
        >
          <DialogTitle>{text}</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => handleClose()}
              sx={{ color: DarkFFF(cookies) }}
            >
              No
            </Button>
            <Button
              onClick={() => handleChange()}
              sx={{ color: DarkFFF(cookies) }}
            >
              Yes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};
export default memo(DialogBox);
