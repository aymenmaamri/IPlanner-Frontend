import axios from "axios";

export const createNewRoom = (roomName: string) => {
  axios
    .post(`http://localhost:8080/planning-room?roomName=${roomName}`, null)
    .then((res) => {
      console.log(res);
      return res.data;
    });
};
