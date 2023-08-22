import React, { memo, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TablePagination,
  TableRow,
  Box,
  Avatar,
  Stack,
  Typography,
} from "@mui/material";
import { errorHandler } from "../../../ApiFunctions/ErrorHandler";
import {
  AntSwitch,
  StyledTableCell,
} from "../../../Utils/stylingMethods";
import { CardName } from "../../../Utils/CardName";
import { Dark00FF, DarkFFF } from "../../../Utils/CommonCookies";
import { ADD_ATTENDANCE } from "../../../ApiFunctions/attendance";
import { openSnackbar } from "../../../app/reducer/Snackbar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { LoadingButton } from "@mui/lab";
const AddAttendance = ({
  formattedDate,
  data,
  setData,
  cookies,
  dispatch,
  loading,
  setFullName,
  setStatus,
  status,
  fullName,
  userData,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAttendanceChange = (event, id) => {
    const newAttendanceData = data
      .filter(
        (i) =>
          i?.course === userData?.course &&
          i?.courseYear === userData?.courseYear
      )
      .map((student) =>
        student._id === id
          ? { ...student, attendance: event.target.checked }
          : student
      );
    setData(newAttendanceData);
  };
  const handleSubmit = () => {
    const attendanceList = data
      .filter(
        (i) =>
          i?.course === userData?.course &&
          i?.courseYear === userData?.courseYear
      )
      .map(({ _id, attendance }) => ({
        _id,
        attendance,
      }));

    ADD_ATTENDANCE(
      attendanceList,
      userData?._id,
      userData?.course,
      userData?.courseYear,
      formattedDate
    )
      .then(() => {
        setFullName("Thanks for taking attendance.");
        setStatus(true);
        dispatch(
          openSnackbar({
            message: "Data saved successfully.",
            severity: "success",
          })
        );
      })
      .catch((err) => {
        errorHandler(err?.status, err?.data, dispatch);
      });
  };

  return status ? (
    <Box
      sx={{
        height: "30vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <EventAvailableIcon
        sx={{ height: "80px", width: "80px", color: DarkFFF(cookies) }}
      />
      <Typography sx={{ fontSize: "20px", color: DarkFFF(cookies) }}>
        {fullName}
      </Typography>
    </Box>
  ) : (
    <>
      {loading === false && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align="left"
                    sx={{ width: "15%" }}
                    cookies={cookies}
                  >
                    Roll no
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{ width: "15%" }}
                    cookies={cookies}
                  >
                    Profile
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{ width: "30%" }}
                    cookies={cookies}
                  >
                    Full name
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{ width: "20%" }}
                    cookies={cookies}
                  >
                    Gender
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{ width: "20%" }}
                    cookies={cookies}
                  >
                    Attendance
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: Dark00FF(cookies) }}>
                {data
                  .filter(
                    (i) =>
                      i?.course === userData?.course &&
                      i?.courseYear === userData?.courseYear
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item?._id} cookies={cookies}>
                      <StyledTableCell
                        align="left"
                        sx={{ width: "15%", textTransform: "capitalize" }}
                        cookies={cookies}
                      >
                        {item?.rollNo}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ width: "15%", textTransform: "capitalize" }}
                        cookies={cookies}
                      >
                        <Avatar
                          sx={{ width: 40, height: 40 }}
                          src={item?.profileImage}
                        >
                          {" "}
                          {CardName(`${item?.fullName}`)}
                        </Avatar>
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ width: "30%", textTransform: "capitalize" }}
                        cookies={cookies}
                      >
                        {item?.fullName}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ width: "20%", textTransform: "capitalize" }}
                        cookies={cookies}
                      >
                        {item?.gender}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ width: "20%" }}
                        cookies={cookies}
                      >
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography>Absent</Typography>
                          <AntSwitch
                            checked={item?.attendance}
                            onChange={(event) =>
                              handleAttendanceChange(event, item?._id)
                            }
                            inputProps={{ "aria-label": "ant design" }}
                          />
                          <Typography>Present</Typography>
                        </Stack>
                      </StyledTableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              backgroundColor: Dark00FF(cookies),
              color: DarkFFF(cookies),
            }}
          >
            <LoadingButton
              type="submit"
              variant={"contained"}
              sx={{
                m: 1,
                minWidth: "120px",
                textTransform: "capitalize",
                background: "#000",
                color: "#fff",
                borderColor: "#fff",
                minHeight: 32,
                ":hover": {
                  color: "#fff",
                  borderColor: "#fff",
                  background: "#292929",
                },
                ":disabled": {
                  background: "#7e7f81",
                },
              }}
              disabled={loading}
              loading={loading}
              onClick={handleSubmit}
            >
              {loading ? null : <span>Submit</span>}
            </LoadingButton>
          </Box>

          <TablePagination
            sx={{ backgroundColor: Dark00FF(cookies), color: DarkFFF(cookies) }}
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
};
export default memo(AddAttendance);
