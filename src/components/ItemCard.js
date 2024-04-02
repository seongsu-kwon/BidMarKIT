import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

export default function ItemCard({ item }) {
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
            현재가
          </Typography>

          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            {currentPrice}원
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption" color="text.secondary">
            즉시구매가
          </Typography>

          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            {buyNowPrice}원
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption" color="text.secondary">
            마감 기한
          </Typography>

          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            {deadline}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
