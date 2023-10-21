import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

export const AppHeader = ({ username }: { username: string | undefined }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#0f0830" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          color={"#1976d2"}
          sx={{ flexGrow: 1 }}
        >
          User: {username}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
