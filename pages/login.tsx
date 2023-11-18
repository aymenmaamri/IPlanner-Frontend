import Head from "next/head";
import styles from "../styles/Home.module.css";
import { CreateUser } from "../components/src/components/registerPage/CreateUser";

export default function Home() {
  return (
    <>
      <CreateUser />
    </>
  );
}
