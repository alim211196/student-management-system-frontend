import React, { memo } from "react";
import { Button, Dialog, DialogActions, Grid } from "@mui/material";
import CustomTextField from "../../Utils/CustomTextField";
import PaperWrapper from "../../Utils/PaperWrapper";
import CustomMultilineTextField from "../../Utils/CustomMultilineTextField";
import { gradientBackground } from "../../Utils/stylingMethods";
import { LoadingButton } from "@mui/lab";
const Reply = ({
  cookies,
  formData,
  setFormData,
  loading,
  open,
  handleClose,
  handleSubmit,
}) => {
  return (
    <Dialog
      open={open}
      maxWidth="xs"
      onClose={handleClose}
      component="form"
      onSubmit={handleSubmit}
    >
      <PaperWrapper
        cookies={cookies}
        boxBGColor={"#2C497F"}
        text={"Submit your replay"}
      >
        <Grid container spacing={2} sx={{ p: 2, mb: 1 }}>
          <Grid item xs={12} sm={12} md={12}>
            <CustomTextField
              label={"Email Address"}
              name="email"
              value={formData.email}
              setFormData={setFormData}
              type="email"
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <CustomTextField
              label={"Subject"}
              name="subject"
              value={formData.subject}
              setFormData={setFormData}
              type="text"
              disabled={false}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <CustomMultilineTextField
              label={"Your reply"}
              name="reply"
              value={formData.reply}
              setFormData={setFormData}
              type="text"
              disabled={false}
            />
          </Grid>
        </Grid>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              background: gradientBackground("#DC143C"),
              color: "#fff",
              borderColor: "#fff",
              ":hover": {
                color: "#fff",
                borderColor: "#fff",
                background: gradientBackground("#DC143C"),
              },
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant={"contained"}
            sx={{
              background: gradientBackground("#2C497F"),
              color: "#fff",
              borderColor: "#fff",
              minHeight: 32,
              ":hover": {
                color: "#fff",
                borderColor: "#fff",
                background: gradientBackground("#2C497F"),
              },
            }}
            disabled={loading}
            loading={loading}
          >
            {loading ? null : <span> Submit your reply</span>}
          </LoadingButton>
        </DialogActions>
      </PaperWrapper>
    </Dialog>
  );
};

export default memo(Reply);
