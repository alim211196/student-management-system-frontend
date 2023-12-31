import axios from "axios";
import api from "../api";
import AxiosConfig from "../axiosConfig";
import apiUrl from "../Utils/apiConfig";
//user login
export const USER_LOGIN = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiUrl}${api.login}`, formData)
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

export const REFRESH_TOKEN = (token) => {
  return new Promise((resolve, reject) => {
    return AxiosConfig(token)
      .post(`${apiUrl}${api.refreshToken}`)
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

//get users
export const GET_USERS = (token) => {
  return new Promise((resolve, reject) => {
  return AxiosConfig(token)
    .get(`${apiUrl}${api.getUsers}`)
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

//activate or deactivate user account
export const USER_ACTIVATION = (id, active,token) => {
  return new Promise((resolve, reject) => {
     return AxiosConfig(token)
       .patch(`${apiUrl}${api.userActivation}${id}`, {
         active: active,
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

//get current user data by id
export const GET_USER = (id, token) => {
  return new Promise((resolve, reject) => {
    return AxiosConfig(token)
      .get(`${apiUrl}${api.getUser}${id}`)
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

//user register
export const USER_REGISTER = (formData,token) => {
  return new Promise((resolve, reject) => {
     return AxiosConfig(token)
       .post(`${apiUrl}${api.register}`, formData)
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

//forgot password
export const FORGOT_PASSWORD = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiUrl}${api.forgotPassword}`, formData)
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

//reset password
export const RESET_PASSWORD = (id, password, otp) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${apiUrl}${api.resetPassword}${id}`, {
        new_password: password,
        otp: otp,
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

//update user
export const UPDATE_USER = (id, formData,token) => {
  return new Promise((resolve, reject) => {
     return AxiosConfig(token)
       .patch(
         `${apiUrl}${api.updateUser}${id}`,
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

//update user
export const UPDATE_PROFILE = (id, formData,token) => {
  return new Promise((resolve, reject) => {
     return AxiosConfig(token)
       .patch(
         `${apiUrl}${api.updateProfile}${id}`,
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

//update password
export const UPDATE_PASSWORD = (id, currentPassword, newPassword,token) => {
  return new Promise((resolve, reject) => {
     return AxiosConfig(token)
       .patch(`${apiUrl}${api.updatePassword}${id}`, {
         currentPassword,
         newPassword,
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

//send birthday wishes
export const SEND_WISHES = (id, formData,token) => {
  return new Promise((resolve, reject) => {
     return AxiosConfig(token)
       .post(`${apiUrl}${api.sendWishes}${id}`, formData)
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
