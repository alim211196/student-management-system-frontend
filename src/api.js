const api = {
  //create student api
  addStudent: "/students/add",

  //get students
  getStudents: "/students/get-students",

  //get student by id
  getStudent: "/students/get-student/",

  //update student by id
  updateStudent: "/students/update-student/",

  //student activation
  studentActivation: "/students/activation/",

  //user register
  register: "/user/register",

  //get users
  getUsers: "/user/get-users",

  //user activation
  userActivation: "/user/activation/",

  //get user by id
  getUser: "/user/get-user/",

  //update user teacher
  updateUser: "/user/update-user/",

  //update profile
  updateProfile:"/user/update-profile/",

  //update password
  updatePassword: "/user/update-password/",

  //user login
  login: "/user/login",

  //forgot password
  forgotPassword: "/user/forgot-password/",

  //reset password
  resetPassword: "/user/reset-password/",

  //send wishes
  sendWishes : "/user/send-wishes/",

  //post comment
  addComment: "/students/contact/add",

  //send Reply
  sendReply: "/students/comment/reply",

  //get comments
  getComments: "/students/contact/get-comments",

  //comment activation
  commentActivation: "/students/comment/activation/",

  //get Resources quantity
  getResources: "/resource-quantity",

  //get recent entry
  getRecentEntry: "/get-recent-entry",

  //get recent entry
  getBirthday: "/get-birthday",

  //add attendance
  addAttendance: "/students/add-attendance",

  //get attendance
  getAttendance: "/students/get-attendance",

  //get attendance by id
  getAttendanceById: "/students/get-attendance/",

  //get specific student attendance
  getStudentAttendance: "/student/get-student-attendance/",

  //update attendance
  updateAttendance: "/students/update-attendance/",

  //delete attendance
  deleteAttendance: "/students/delete-attendance/",

  //attendance activation
  attendanceActivation: "/students/attendance/activation/",

  //add course
  addCourse: "/students/courses/add",

  //get courses
  getCourses: "/students/courses",

  //update courses
  updateCourse: "/students/update-course/",

  //courses activation
  courseActivation: "/students/courses/activation/",
};
export default api;
