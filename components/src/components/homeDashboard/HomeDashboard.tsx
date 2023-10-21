import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppHeader } from "../AppHeader";
import { CreateRoomForm } from "../createRoom/CreateRoomForm";
import { RoomsBoard } from "../roomsBoard/RoomsBoard";
import { loginState } from "../state/loginState";

export const HomeDashboard = () => {
  const router = useRouter();
  const [login, setLogin] = useRecoilState(loginState);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser && storedUser.id) {
      setLogin(storedUser);
    } else {
      router.push("/login");
    }
  }, [setLogin]);

  return (
    <>
      <AppHeader username={login?.username} />
      <CreateRoomForm />
      <RoomsBoard />
    </>
  );
};
