import { atom } from "recoil";

export const setUserInBrowserStorage = (username, id) => {
  localStorage.setItem("userData", JSON.stringify({ username, id }));
};

export const loginState = atom<{ id: string; username: string } | undefined>({
  key: "loginState",
  default: undefined,
});
