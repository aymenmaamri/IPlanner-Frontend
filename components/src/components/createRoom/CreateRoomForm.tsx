import { Label } from "@mui/icons-material";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Input,
  Snackbar,
  TextField,
  InputBase,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../state/loginState";
import { roomsState } from "../state/roomsState";

export const CreateRoomForm = () => {
  const setRoomsState = useSetRecoilState(roomsState);
  const userId = useRecoilValue(loginState)?.id;
  const [roomName, setName] = useState<string>("");
  const [toastData, setToastData] = useState<{
    show: boolean;
    message: string;
    type: string;
  } | null>(null);

  const handleCreate = async () => {
    if (roomName.length == 0) return;
    const roomId = await axios
      .post(
        `http://localhost:8080/planning-room?roomName=${roomName}&userId=${userId}`,
        null
      )
      .then((res) => {
        setToastData({
          show: true,
          message: "Room created successfully",
          type: "success",
        });
        setRoomsState((previousState) => [...previousState, res.data]);
      })
      .catch((error) => {
        setToastData({
          show: true,
          message: "Room already exist",
          type: "error",
        });
      });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 225,
          height: 160,
          borderRadius: "5%",
          backgroundColor: "#eddcb7",
          margin: "20px 0",
          gap: "10px",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <TextField
          value={roomName}
          id="create-room-input-field"
          label="Enter room name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="outlined" onClick={handleCreate}>
          Create Room
        </Button>
        <Snackbar
          open={toastData?.show}
          autoHideDuration={5000}
          onClose={(e) => setToastData(null)}
        >
          <Alert
            severity={toastData?.type as AlertColor}
            sx={{ width: "100%" }}
          >
            {toastData?.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};
