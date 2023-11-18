import { Box, Container } from "@mui/system";
import { LoginForm } from "../homeDashboard/LoginForm";
import styles from "./styles.module.css";

export const HomePage = () => {
  const handleLogin = () => {};

  return (
    <div className={styles.home_main}>
      <h1
        style={{
          position: "absolute",
          top: "0",
          fontFamily: "monospace",
          fontSize: "45px",
          wordSpacing: "15px",
          color: "#eddcb7",
        }}
      >
        Poker planning made fun
      </h1>
      <Box
        sx={{
          height: 160,
          width: 250,
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
          borderRadius: "15px",
        }}
      >
        <LoginForm />
      </Box>
    </div>
  );
};
