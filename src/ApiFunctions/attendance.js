import api from "../api";
import AxiosConfig from "../axiosConfig";
import apiUrl from '../Utils/apiConfig'
//add attendance
export const ADD_ATTENDANCE = (
  formData,
  teacher_id,
  course,
  courseYear,
  date,
  active = true,
  token
) => {
  return new Promise((resolve, reject) => {
    return AxiosConfig(token)
      .post(`${apiUrl}${api.addAttendance}`, {
        attendance: formData,
        takenByTeacher_id: teacher_id,
        course,
        courseYear,
        date,
        active,
      })
      .then((res) => {
        if (res.status === 201) {
          resolve(res);
        } else {
          reject(res.error);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

//get attendance
export const GET_ATTENDANCE = (token) => {
  return new Promise((resolve, reject) => {
    return AxiosConfig(token)
      .get(`${apiUrl}${api.getAttendance}`)
      .then((res) => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res.error);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

//get attendance by id
export const GET_ATTENDANCE_BY_ID = (id, token) => {
  return new Promise((resolve, reject) => {
    return AxiosConfig(token)
      .get(`${apiUrl}${api.getAttendanceById}${id}`)
      .then((res) => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res.error);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

// get student attendance
export const GET_STUDENT_ATTENDANCE = (id, startDate, endDate, token) => {
  return new Promise((resolve, reject) => {
    return AxiosConfig(token)
      .get(
        `${apiUrl}${api.getStudentAttendance}${id}?startDate=${startDate}&endDate=${endDate}`
      )
      .then((res) => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res.error);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

//update attendance
export const UPDATE_ATTENDANCE = (_id, attendanceId, attendance, token) => {
  return new Promise((resolve, reject) => {
    return AxiosConfig(token)
      .patch(`${apiUrl}${api.updateAttendance}${_id}`, {
        attendanceId: attendanceId,
        attendanceValue: attendance,
      })
      .then((res) => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res.error);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

//activate or deactivate attendance
export const ATTENDANCE_ACTIVATION = (id, active, token) => {
  return new Promise((resolve, reject) => {
    return AxiosConfig(token)
      .patch(
        `${apiUrl}${api.attendanceActivation}${id}`,
        {
          active: active,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res.error);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};
