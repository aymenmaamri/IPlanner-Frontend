import { atom } from "recoil";
import { DATA_TYPE_TO_PERSIST, persistState } from "../utils/persistOnBrowser";

export const setUserInBrowserStorage = (username: string, email: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("userData", JSON.stringify({ username, email }));
  }
};

const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    console.log(JSON.parse(localStorage.getItem("userData") || "{}"));
    return JSON.parse(localStorage.getItem("userData") || "{}");
  }
  return undefined;
};

export const loginState = atom<{ email: string; username: string } | undefined>(
  {
    key: "loginState",
    default: undefined,
    effects: [
      persistState(
        "loginState",
        DATA_TYPE_TO_PERSIST.DEFAULT,
        getUserFromLocalStorage()
      ),
    ],
  }
);
