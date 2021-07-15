import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

const responseBody = (res) => res.data;
const errResponse = (err) => {
  throw err;
};

const request = {
  get: (URL) => api.get(`${URL}`).then(responseBody, errResponse),
  post: (URL, reqBody) =>
    api.post(`${URL}`, reqBody).then(responseBody, errResponse),
  put: (URL, reqBody) =>
    api.put(`${URL}`, reqBody).then(responseBody, errResponse),
  patch: (URL, reqBody) =>
    api.patch(`${URL}`, reqBody).then(responseBody, errResponse),
  delete: (URL) => api.delete(`${URL}`).then(responseBody, errResponse),
};

export const setAuthHeaderToken = () => {
  let auth_token = localStorage.getItem("auth_token");
  api.defaults.headers.common["Authorization"] = `Token ${auth_token}`;
};

export const unsetAuthHeaderToken = () => {
  api.defaults.headers.common["Authorization"] = null;
};

export default request;
