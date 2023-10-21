import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const PlanningTimer = ({ time }) => {
  const [seconds, setSeconds] = useState<number>(time);

  useEffect(() => {
    console.log(seconds);
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prev: number) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [seconds]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 250,
        height: 100,
        backgroundColor: "#0f0830",
        marginTop: "20px",
      }}
    >
      <Typography fontSize={40} color="#1976d2">
        Timer: {seconds}
      </Typography>
    </Box>
  );
};
