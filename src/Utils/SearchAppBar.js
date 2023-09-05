import React, { memo } from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./stylingMethods";

const SearchAppBar = ({ setQuery, query, matches, cookies }) => {
  const handleSearch = ({ currentTarget = [] }) => {
    setQuery(currentTarget.value);
  };
  return (
    <Box
    >
      <Search cookies={cookies} matches={matches}>
        <SearchIconWrapper>
          <SearchIcon sx={{ color: "#118aef" }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          type="text"
          value={query}
          onChange={handleSearch}
        />
      </Search>
    </Box>
  );
};
export default memo(SearchAppBar);
