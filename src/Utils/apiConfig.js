let apiUrl;

if (process.env.NODE_ENV === "development") {
  apiUrl = process.env.REACT_APP_API_URL_DEV;
} else {
  apiUrl = process.env.REACT_APP_API_URL_PROD;
}

export default apiUrl;
