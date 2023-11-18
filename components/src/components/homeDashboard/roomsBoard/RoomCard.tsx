import {
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { mainTextColor } from "../../../utils/colors";

type RoomCardProps = {
  roomName: string;
  joinedUsers: string[];
  roomOwner: string;
  handleCloseRoom: (roomName: string) => void;
  handleJoinRoom: (roomName: string) => void;
};

export const RoomCard = ({
  roomName,
  joinedUsers,
  roomOwner,
  handleCloseRoom,
  handleJoinRoom,
}: RoomCardProps) => {
  return (
    <Card
      key={roomName}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "#00695C",
        boxShadow: "0 0 4px 4px rgba(128, 203, 196, 0.5)",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 22 }} color={mainTextColor} gutterBottom>
          {roomName}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color={mainTextColor} gutterBottom>
          Owner: {roomOwner}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color={mainTextColor} gutterBottom>
          Planners: {joinedUsers?.length}
        </Typography>
        <Stack direction="row" spacing={1} marginTop={2}>
          <Button
            sx={{
              textTransform: "none",
              color: mainTextColor,
              borderColor: mainTextColor,
            }}
            variant="outlined"
            onClick={() => handleJoinRoom(roomName)}
            startIcon={<AddIcon />}
          >
            Join
          </Button>
          <Button
            sx={{
              textTransform: "none",
              color: mainTextColor,
              borderColor: mainTextColor,
            }}
            variant="outlined"
            onClick={() => handleCloseRoom(roomName)}
            startIcon={<DeleteIcon />}
          >
            Close
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
