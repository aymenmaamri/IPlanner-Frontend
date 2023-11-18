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
  Typography,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { createPlanningRoom } from "../../services/planningRoomsService";
import { loginState } from "../../state/loginState";
import { roomsState } from "../../state/roomsState";
import styles from "./styles.module.css";
import { mainTextColor } from "../../utils/colors";

export const CreateRoomForm = () => {
  const setRoomsState = useSetRecoilState(roomsState);
  const [roomName, setName] = useState<string>("");
  const [numberOfPlanners, setNumberOfPlanners] = useState<number>();
  const [toastData, setToastData] = useState<{
    show: boolean;
    message: string;
    type: string;
  } | null>(null);

  // TODO: handle input validation
  const handleCreate = async () => {
    try {
      const room = await createPlanningRoom(roomName, numberOfPlanners || 0);
      setToastData({
        show: true,
        message: "Room created successfully",
        type: "success",
      });
      console.log(room);
      setRoomsState((previousState) => [...previousState, room]);
    } catch (error) {
      setToastData({
        show: true,
        message: "Error while creating the room",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className={styles.create_room_main_form}>
        <Typography variant="h6" color={mainTextColor}>
          Create New Planning Room
        </Typography>

        <TextField
          value={roomName}
          id="create-room-input-field"
          label="Enter room name"
          variant="filled"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          value={numberOfPlanners}
          inputProps={{ type: "number" }}
          label="Number of planners"
          variant="filled"
          onChange={(e) =>
            setNumberOfPlanners(e.target.value as unknown as number)
          }
        />

        <Button
          variant="outlined"
          onClick={handleCreate}
          sx={{
            textTransform: "none",
            color: mainTextColor,
            borderColor: mainTextColor,
          }}
        >
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
      </div>
    </>
  );
};
