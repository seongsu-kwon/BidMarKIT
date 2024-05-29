import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ItemCard from "components/ItemCard";
import Types from "constants/Types";
import {
  allItemsPreviewState,
  suggestItemsPreviewState,
} from "recoil/products";
import { useRecoilValue } from "recoil";

function chunk(data = [], size = 1) {
  console.log("data", data);
  const results = [];
  while (data.length) {
    results.push(data.splice(0, size));
  }
  return results;
}

function CardItems(props) {
  const { items, count } = props;
  return (
    <Carousel
      // slidable={true}
      // emulateTouch={true}
      showStatus={false}
      showArrows={count === 4 ? true : false}
      showThumbs={false}
      renderArrowPrev={(clickHandler, hasPrev) => {
        return (
          hasPrev && (
            <IconButton
              sx={{
                position: "absolute",
                left: 0,
                top: "50%",
                zIndex: 1,
              }}
              onClick={clickHandler}
            >
              <ArrowBackIosNewIcon fontSize="large" />
            </IconButton>
          )
        );
      }}
      renderArrowNext={(clickHandler, hasNext) => {
        return (
          hasNext && (
            <IconButton
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                zIndex: 1,
              }}
              onClick={clickHandler}
            >
              <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
          )
        );
      }}
      preventMovementUntilSwipeScrollTolerance={true}
      swipeScrollTolerance={50}
    >
      {items?.map((item) => (
        <Grid container spacing={2}>
          {item?.map((i) => (
            <Grid
              item
              key={i.id}
              xs={6}
              sm={4}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <ItemCard item={i} />
              </Suspense>
            </Grid>
          ))}
        </Grid>
      ))}
    </Carousel>
  );
}

export default function CardsCarousel({ type, count }) {
  const navigate = useNavigate();
  // let items = [];

  const [cards, setCards] = useState([]);

  const allItems = useRecoilValue(allItemsPreviewState(count));
  const suggestItems = useRecoilValue(suggestItemsPreviewState(count));

  // useEffect(() => {
  //     setCards(items?.content);
  //     console.log(type, items);
  // }, [items]);

  const title = Types[type];

  // useEffect(() => {
  //     if (type === 'suggest') {
  //         setCards(suggestItems);
  //     } else {
  //         setCards(allItems);
  //     }
  // }, [allItems, suggestItems]);

  // for (let i = 1; i <= 8; i++) {
  //     items.push({
  //         id: i,
  //         name: '상품 이름' + i,
  //         bidPrice: '10,000',
  //         price: '20,000',
  //         deadline: '~3/30 18:00',
  //     });
  // }

  return (
    <Box
      sx={{
        "& .carousel": {
          margin: "0px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          onClick={() => {
            navigate(`/list/${type}`);
          }}
          SX={{ cursor: "pointer" }}
        >
          {"전체보기 >"}
        </Typography>
      </Box>

      {type === "suggest" ? (
        <CardItems items={suggestItems} count={count} />
      ) : (
        <CardItems items={allItems} count={count} />
      )}
    </Box>
  );
}
