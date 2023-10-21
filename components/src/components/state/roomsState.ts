import { atom } from "recoil";

type Room = {
  roomOwnerUsername: string;
  roomId: string;
  roomName: string;
  roomOwnerId: string;
  users: string[];
};

export const roomsState = atom<Room[]>({
  key: "roomsState",
  default: [],
});
