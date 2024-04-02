import { Box, Container } from "@mui/material";
import TopAppBar from "./TopAppBar";
import BottomAppBar from "./BottomAppBar";

export default function MobileLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <TopAppBar />
      <Container maxWidth="md" sx={{ mt: 1 }}>
        {children}
      </Container>
      <BottomAppBar />
    </Box>
  );
}
