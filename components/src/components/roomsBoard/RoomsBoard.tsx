import {
  Alert,
  AlertColor,
  Box,
  Card,
  CardContent,
  Paper,
  Snackbar,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../state/loginState";
import { roomsState } from "../state/roomsState";
import { RoomCard } from "./RoomCard";

export const RoomsBoard = () => {
  const router = useRouter();
  const [rooms, setRooms] = useRecoilState(roomsState);
  const login = useRecoilValue(loginState);
  const [toastData, setToastData] = useState<{
    show: boolean;
    message: string;
    type: string;
  } | null>(null);

  useEffect(() => {
    const rooms = axios
      .get("http://localhost:8080/planning-room")
      .then((res) => {
        if (res.data.length > 0) setRooms(res.data);
      });
  }, []);

  const joinRoom = async (id: string) => {
    /*  if (isAlreadyJoined(id)) {
      setToastData({
        show: true,
        message: "You have already joined this room",
        type: "warning",
      });
      return;
    } */
    const joined = await axios
      .get(
        `http://localhost:8080/planning-room/join?roomId=${id}&username=${login?.username}`
      )
      .then((res) => {
        console.log(res);
        const updatedRooms = rooms.map((room) => {
          if (room.roomId == res.data.roomId) return res.data;
          return room;
        });
        setRooms(updatedRooms);
        setToastData({
          show: true,
          message: "Room joined successfully",
          type: "success",
        });
        // route to the plan board
        router.push("/plan");
      })
      .catch((error) => {
        setToastData({
          show: true,
          message: "Could not join room",
          type: "error",
        });
      });
  };

  const closeRoom = () => {};

  const isAlreadyJoined = (roomId: string) => {
    const roomToJoin = rooms.find((r) => r.roomId == roomId);
    if (!roomToJoin) return undefined;
    if (login && roomToJoin.users.includes(login?.id)) return true;
    return false;
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Stack direction="row" spacing={3}>
          {rooms.length > 0
            ? rooms.map((room) => {
                return (
                  <RoomCard
                    key={room.roomId}
                    id={room.roomId}
                    roomName={room.roomName}
                    users={room.users}
                    roomOwner={room.roomOwnerUsername}
                    closeRoom={closeRoom}
                    joinRoom={joinRoom}
                  />
                );
              })
            : null}
        </Stack>
      </Box>
      <Snackbar
        open={toastData?.show}
        autoHideDuration={5000}
        onClose={(e) => setToastData(null)}
      >
        <Alert severity={toastData?.type as AlertColor} sx={{ width: "100%" }}>
          {toastData?.message}
        </Alert>
      </Snackbar>
    </>
  );
};
