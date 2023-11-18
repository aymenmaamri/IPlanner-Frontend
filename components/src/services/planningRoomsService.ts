const baseUrl = "http://localhost:8080/planning-room";
import axiosInstance from "../services/axiosInstance";

export const getRooms = () => {
  return axiosInstance

    .get(baseUrl)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("error while fetching planning rooms");
      throw err;
    });
};

export const createPlanningRoom = (
  roomName: string,
  numberOfPlanners: number
) => {
  return axiosInstance
    .post(baseUrl, { roomName, numberOfPlanners })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("error while fetching planning rooms");
      throw err;
    });
};

export const closePlanningRoom = (roomName: string) => {
  return axiosInstance
    .delete(`${baseUrl}/${roomName}`)
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      console.error("error while closing planning rooms");
      throw err;
    });
};

export const joinRoom = (username: string, roomName: string) => {
  return axiosInstance
    .get(`${baseUrl}/join?roomName=${roomName}&username=${username}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("error while fetching planning rooms");
      throw err;
    });
};
