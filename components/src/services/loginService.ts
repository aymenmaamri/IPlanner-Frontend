import axios from "axios";
import axiosInstance from "../services/axiosInstance";

export const login = (username: string, password: string) => {
  const base64Credentials = btoa(`${username}:${password}`);
  return axios.post(
    "http://localhost:8080/user",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Basic ${base64Credentials}`,
      },
    }
  );
};

export const getUserData = (username: string) => {
  return axiosInstance.get(`http://localhost:8080/user?username=${username}`);
};
