import axios from "axios";
import api from "../api";
import AxiosConfig from "../axiosConfig";
import apiUrl from "../Utils/apiConfig";
//add attendance
export const ADD_COURSE = (formData,token) => {
  return new Promise((resolve, reject) => {
       return AxiosConfig(token)
         .post(`${apiUrl}${api.addCourse}`, formData)
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


//get courses
export const GET_COURSES = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}${api.getCourses}`)
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

//update courses 
export const UPDATE_COURSE = (id, formData,token) => {
  return new Promise((resolve, reject) => {
       return AxiosConfig(token)
         .patch(
           `${apiUrl}${api.updateCourse}${id}`,
           formData
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

//activate or deactivate course
export const COURSE_ACTIVATION = (id, active,token) => {
  return new Promise((resolve, reject) => {
       return AxiosConfig(token)
         .patch(
           `${apiUrl}${api.courseActivation}${id}`,
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



