import { configureStore } from "@reduxjs/toolkit";
import snackbarSlice from '../app/reducer/Snackbar'
import progressSlice from "../app/reducer/progressBar";
import userProfileSlice from "./reducer/getUserProfile";
import studentDetailsSlice from "./reducer/getStudentData";
import userDetailsSlice from "./reducer/getUsers";
import commentsSlice from "./reducer/getComments";
import loadingSlice from './reducer/Loader'
export const store = configureStore({
  reducer: {
    snackbar: snackbarSlice,
    loading: loadingSlice,
    progressBar: progressSlice,
    getUserProfile: userProfileSlice,
    getStudentDetails: studentDetailsSlice,
    getUsers:userDetailsSlice,
    getStudentComment: commentsSlice,
  },
});
