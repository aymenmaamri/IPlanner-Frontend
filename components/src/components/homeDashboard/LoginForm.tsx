import { Button, CircularProgress, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useRouter } from "next/router";
import { getUserData, login } from "../../services/loginService";
import { AxiosResponse } from "axios";
import { useSetRecoilState } from "recoil";
import { loginState, setUserInBrowserStorage } from "../../state/loginState";

export const LoginForm = () => {
  const router = useRouter();
  const setLoginState = useSetRecoilState(loginState);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    router.push("/register");
  };

  // TODO: implement useLogin hook
  const handleLogin = async () => {
    try {
      if (loading) return;
      setLoading(true);
      const res: AxiosResponse = await login(username, password);
      if (res.status === 200) {
        localStorage.setItem("authToken", res.data);
        const user: AxiosResponse = await getUserData(username);
        // TODO: move this to the login state logic
        setUserInBrowserStorage(user.data.username, user.data.email);
        setLoginState(user.data);
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const customInputColors = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#eddcb7", // Change the border color
      },
      "&:hover fieldset": {
        borderColor: "#eddcb7", // Change the border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "#eddcb7", // Change the border color when focused
      },
    },
    "& .MuiInputBase-input": {
      color: "#eddcb7", // Change the text color
      caretColor: "#eddcb7", // Change the caret (blinking cursor) color
    },
    "#username-label, #password-label": {
      color: "#eddcb7", // Change the label color
    },
  };

  const buttonStyles = {
    width: "140px",
    fontSize: "18px",
    fontWeight: "bold",
    alignSelf: "center",
    color: "#eddcb7",
    "&:hover": {
      color: "black",
    },
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <TextField
        required
        focused
        value={username}
        id="username"
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
        sx={customInputColors}
      />
      <TextField
        required
        focused
        value={password}
        id="password"
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        sx={customInputColors}
      />

      <Button
        variant="text"
        sx={buttonStyles}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? <CircularProgress size={20} color="inherit" /> : "Login"}
      </Button>
      <Button sx={buttonStyles} variant="text" onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
};
