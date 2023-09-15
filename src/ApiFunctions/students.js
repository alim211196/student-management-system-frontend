import axios from "axios";
import api from "../api";
import AxiosConfig from "../axiosConfig";
import apiUrl from "../Utils/apiConfig";
//create student
export const CREATE_STUDENT = (formData,token) => {
  return new Promise((resolve, reject) => {
       return AxiosConfig(token)
         .post(`${apiUrl}${api.addStudent}`, formData)
         .then((res) => {
           if (res.status === 201) {
             resolve(res.data);
           } else {
             reject(res.error);
           }
         })
         .catch((err) => {
           reject(err.response);
         });
  });
};

//get students
export const GET_STUDENTS = (token) => {
  return new Promise((resolve, reject) => {
    return AxiosConfig(token)
      .get(`${apiUrl}${api.getStudents}`)
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

//get student by id
export const GET_STUDENT_BY_ID = (id,token) => {
  return new Promise((resolve, reject) => {
    return AxiosConfig(token)
      .get(`${apiUrl}${api.getStudent}${id}`)
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

//update student
export const UPDATE_STUDENT = (id, formData,token) => {
  return new Promise((resolve, reject) => {
       return AxiosConfig(token)
         .patch(
           `${apiUrl}${api.updateStudent}${id}`,
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

//activate or deactivate student
export const STUDENT_RECORD_ACTIVATION = (id, active,token) => {
  return new Promise((resolve, reject) => {
       return AxiosConfig(token)
         .patch(
           `${apiUrl}${api.studentActivation}${id}`,
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

//post comment api
export const POST_COMMENT = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiUrl}${api.addComment}`, formData)
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

//send reply api
export const SEND_REPLY = (formData,token) => {
  return new Promise((resolve, reject) => {
       return AxiosConfig(token)
         .post(`${apiUrl}${api.sendReply}`, formData)
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

//get comments
export const GET_COMMENTS = (token) => {
  return new Promise((resolve, reject) => {
       return AxiosConfig(token)
         .get(`${apiUrl}${api.getComments}`)
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

//activate or deactivate student's comment
export const STUDENT_COMMENT_ACTIVATION = (id, active,token) => {
  return new Promise((resolve, reject) => {
       return AxiosConfig(token)
         .patch(
           `${apiUrl}${api.commentActivation}${id}`,
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

//get Resources quantity
export const GET_RESOURCE = (token) => {
  return new Promise((resolve, reject) => {
    return AxiosConfig(token)
      .get(`${apiUrl}${api.getResources}`)
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

//get Recent Entry of students, teachers and massages
export const GET_RECENT_ENTRY = (token) => {
  return new Promise((resolve, reject) => {
    return AxiosConfig(token)
      .get(`${apiUrl}${api.getRecentEntry}`)
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

//get teachers and students birthday
export const GET_BIRTHDAY = (token) => {
  return new Promise((resolve, reject) => {
    return AxiosConfig(token)
      .get(`${apiUrl}${api.getBirthday}`)
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
