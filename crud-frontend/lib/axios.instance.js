import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
});

export const getUserDetails = async (id) => {
  return await $axios.get(`/user/details/${id}`);
};

export const deleteUser = async (id) => {
  return await $axios.get(`/user/delete/${id}`);
};
// Add a request interceptor
$axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token;
  if (config.url.startsWith("/admin")) {
    token = localStorage.getItem("admin-token");
  } else {
    token = localStorage.getItem("token");
  }
  // token xa vane
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default $axios;
