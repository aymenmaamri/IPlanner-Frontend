import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Todos } from "../components/src/components/Todos/Todos";
import { CreateUser } from "../components/src/components/welcomePage/CreateUser";

export default function Home() {
  return (
    <>
      <CreateUser />
    </>
  );
}
