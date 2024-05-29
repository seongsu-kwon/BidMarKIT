import { FormControl, Grid, NativeSelect } from "@mui/material";
import React from "react";
import CategoryItem from "./CategoryItem";
import CategoryList from "constants/Category";

export default function CategorySelect(props) {
  const { searchCategory, setSearchCategory } = props;

  console.log("서치 카테고리", searchCategory);
  return (
    <FormControl fullWidth>
      <NativeSelect
        inputProps={{
          name: "category",
          id: "uncontrolled-native",
        }}
        sx={{
          mt: 2,
          mb: 2,
          // position: 'fixed',
          // width: '70%',
        }}
        onChange={(e) => {
          setSearchCategory(e.target.value);
        }}
        defaultValue={searchCategory !== "" ? searchCategory : "8"}
      >
        <option value="8">전체</option>
        {CategoryList.map((category) => (
          <option value={category.code}>{category.name}</option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
