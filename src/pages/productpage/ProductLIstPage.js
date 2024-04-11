import { Grid } from "@mui/material";
import ItemCard from "components/ItemCard";

export default function ProductListPage() {
  let items = [];

  for (let i = 1; i <= 40; i++) {
    items.push({
      name: "상품 이름" + i,
      currentPrice: "10,000",
      buyNowPrice: "20,000",
      deadline: "~3/30 18:00",
    });
  }
  return (
    <div>
      <h1>Product List Page</h1>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid
            item
            key={index}
            xs={6}
            sm={4}
            md={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
