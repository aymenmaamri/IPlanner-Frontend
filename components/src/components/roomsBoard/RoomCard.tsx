import { Button, Card, CardContent, Typography } from "@mui/material";

export const RoomCard = ({
  id,
  roomName,
  users,
  roomOwner,
  closeRoom,
  joinRoom,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: 250,
        height: 250,
        backgroundColor: "#0f0830",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="#1976d2" gutterBottom>
          {roomName}
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="#1976d2" gutterBottom>
          Room owner: {roomOwner}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="#1976d2" gutterBottom>
          Planners in room: {users?.length}
        </Typography>
        <Button
          sx={{ width: 200, marginTop: "10px" }}
          variant="contained"
          onClick={() => joinRoom(id)}
        >
          Join room
        </Button>
        <Button
          sx={{ width: 200, marginTop: "10px" }}
          variant="contained"
          onClick={closeRoom}
        >
          Close room
        </Button>
      </CardContent>
    </Card>
  );
};
