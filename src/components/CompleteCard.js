import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

export default function CompleteCard({ item }) {
  const { name, currentPrice, buyNowPrice, deadline } = item;

  return (
    <Card sx={{ width: "160px" }}>
      <CardMedia
        sx={{ height: 140, flex: 1 }}
        image="/image.png"
        title="image"
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography gutterBottom variant="h6" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption" color="text.secondary">
            최종판매가
          </Typography>

          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            {currentPrice}원
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" color="success">
            판매완료
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
