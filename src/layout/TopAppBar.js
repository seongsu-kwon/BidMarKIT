import { AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function TopAppBar() {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "green", boxShadow: "none" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <img src="/BMKlogo.png" alt="logo" style={{ width: "200px" }} />
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
}
