import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { loginState } from "../state/loginState";

export const AppHeader = () => {
  const login = useRecoilValue(loginState);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#424242" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          color={"white"}
          sx={{ flexGrow: 1 }}
        >
          User: {login ? login.username : "unknown user"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
