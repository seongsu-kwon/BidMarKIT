import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation, useNavigate } from "react-router-dom";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function BottomAppBar() {
  const navigate = useNavigate();

  const location = useLocation().pathname;

  return (
    <>
      <Offset />
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          backgroundColor: "lightgrey",
          boxShadow: "none",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <HomeIcon
              fontSize="large"
              sx={{ color: location === "/main" && "black" }}
              onClick={() => {
                navigate("/main");
              }}
            />
            <Typography
              variant="caption"
              sx={
                location === "/main" && { color: "black", fontWeight: "bold" }
              }
            >
              홈
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SearchIcon
              fontSize="large"
              sx={{ color: location === "/search" && "black" }}
              onClick={() => {
                navigate("/search");
              }}
            />
            <Typography
              variant="caption"
              sx={
                location === "/search" && { color: "black", fontWeight: "bold" }
              }
            >
              상세검색
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <NotificationsIcon
              fontSize="large"
              sx={{ color: location === "/noti" && "black" }}
              onClick={() => {
                navigate("/noti");
              }}
            />
            <Typography
              variant="caption"
              sx={
                location === "/noti" && { color: "black", fontWeight: "bold" }
              }
            >
              알림
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ChatIcon
              fontSize="large"
              sx={{ color: location === "/chat" && "black" }}
              onClick={() => {
                navigate("/chat");
              }}
            />
            <Typography
              variant="caption"
              sx={
                location === "/chat" && { color: "black", fontWeight: "bold" }
              }
            >
              톡
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <PersonIcon
              fontSize="large"
              sx={{ color: location === "/my" && "black" }}
              onClick={() => {
                navigate("/my");
              }}
            />
            <Typography
              variant="caption"
              sx={location === "/my" && { color: "black", fontWeight: "bold" }}
            >
              마이페이지
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
