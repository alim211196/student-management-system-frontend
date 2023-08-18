import React, { memo } from "react";
import { Button, Dialog, DialogActions, Grid } from "@mui/material";
import CustomTextField from "../../../Utils/CustomTextField";
import PaperWrapper from "../../../Utils/PaperWrapper";
import CustomDropDown from "../../../Utils/CustomDropDown";
import { LoadingButton } from "@mui/lab";
const AddCourses = ({
  cookies,
  formData,
  setFormData,
  loading,
  open,
  handleClose,
  flag,
  handleSubmit,
}) => {
  const dropdownOptions = [
    { value: 1, name: "One year course" },
    { value: 2, name: "Two years course" },
    { value: 3, name: "Three years course" },
    { value: 4, name: "Four years course" },
    { value: 5, name: "Five years course" },
  ];

  const courseCondition = flag === "add" ? "Add Course" : "Update Course";

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
        boxBGColor={"#000"}
        text={courseCondition}
      >
        <Grid container spacing={2} sx={{ p: 2, mb: 1 }}>
          <Grid item xs={12} sm={12} md={12}>
            <CustomTextField
              label={"Course name"}
              name="course"
              value={formData?.course}
              setFormData={setFormData}
              type="text"
              disabled={false}
              admin={true}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <CustomDropDown
              label={"Select no. of years for course"}
              name="years"
              value={formData.years}
              setFormData={setFormData}
              data={dropdownOptions}
            />
          </Grid>
        </Grid>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              background:"#DC143C",
              color: "#fff",
              borderColor: "#fff",
              ":hover": {
                color: "#fff",
                borderColor: "#fff",
                background:"#DC143C",
              },
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant={"contained"}
            sx={{
              background:"#000",
              color: "#fff",
              borderColor: "#fff",
              minHeight: 32,
              ":hover": {
                color: "#fff",
                borderColor: "#fff",
                background:"#000",
              },
            }}
            disabled={loading}
            loading={loading}
          >
            {loading ? null : <span>{courseCondition}</span>}
          </LoadingButton>
        </DialogActions>
      </PaperWrapper>
    </Dialog>
  );
};

export default memo(AddCourses);
