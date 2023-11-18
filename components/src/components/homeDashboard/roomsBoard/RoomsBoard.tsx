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
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  closePlanningRoom,
  getRooms,
  joinRoom,
} from "../../../services/planningRoomsService";
import { useFetch } from "../../customHooks/useFetch";
import { loginState } from "../../../state/loginState";
import { roomsState } from "../../../state/roomsState";
import { RoomCard } from "./RoomCard";
import styles from "./styles.module.css";
import { Login } from "@mui/icons-material";

export const RoomsBoard = () => {
  const router = useRouter();

  const [rooms, setRooms] = useRecoilState(roomsState);
  const login = useRecoilValue(loginState);
  const { data, loading, error } = useFetch(
    "http://localhost:8080/planning-room"
  );
  const [toastData, setToastData] = useState<{
    show: boolean;
    message: string;
    type: string;
  } | null>(null);

  useEffect(() => {
    if (data) setRooms(data);
  }, [data, setRooms]);

  const handleJoinRoom = async (roomName: string) => {
    if (!login) return;
    try {
      const res = await joinRoom(login?.username, roomName);
      setRooms((prev) => {
        return prev.map((room) => {
          if (room.roomName === roomName) return res;
          return room;
        });
      });
      setToastData({
        show: true,
        message: "Room joined successfully",
        type: "success",
      });
    } catch (err) {
      setToastData({
        show: true,
        message: "Could not join room",
        type: "error",
      });
    }
  };

  const handleCloseRoom = async (roomName: string) => {
    try {
      await closePlanningRoom(roomName);
      setRooms((prev) => {
        return prev.filter((room) => {
          if (room.roomName !== roomName) return true;
          return false;
        });
      });
      setToastData({
        show: true,
        message: "Room closed successfully",
        type: "success",
      });
    } catch (err) {
      console.log(err);
    }
  };

  /* const isAlreadyJoined = (roomId: string) => {
    const roomToJoin = rooms.find((r) => r.roomId == roomId);
    if (!roomToJoin) return undefined;
    if (login && roomToJoin.users.includes(login?.id)) return true;
    return false;
  }; */

  return (
    <>
      <div className={styles.rooms_main_board}>
        {rooms.length > 0
          ? rooms.map((room) => {
              return (
                <RoomCard
                  key={room.roomName}
                  roomName={room.roomName}
                  joinedUsers={room.joinedUsers}
                  roomOwner={room.roomOwner}
                  handleCloseRoom={handleCloseRoom}
                  handleJoinRoom={handleJoinRoom}
                />
              );
            })
          : null}
      </div>
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
