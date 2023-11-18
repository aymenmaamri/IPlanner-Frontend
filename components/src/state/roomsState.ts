import { atom } from "recoil";

type Room = {
  joinedUsers: string[];
  roomOwner: string;
  roomName: string;
};

export const roomsState = atom<Room[]>({
  key: "roomsState",
  default: [],
});
