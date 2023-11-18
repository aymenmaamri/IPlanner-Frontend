import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppHeader } from "../AppHeader";
import { CreateRoomForm } from "../createRoom/CreateRoomForm";
import { loginState } from "../../state/loginState";
import { RoomsBoard } from "./roomsBoard/RoomsBoard";
import styles from "./styles.module.css";

export const HomeDashboard = () => {
  const router = useRouter();
  const [login, setLogin] = useRecoilState(loginState);

  return (
    <div className={styles.main_dashboard}>
      <AppHeader />
      <CreateRoomForm />
      <RoomsBoard />
    </div>
  );
};
