import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "lucide-react";

const SearchComponent = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      className="w-full max-w-md"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search className="text-gray-500" />
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          backgroundColor: "#fff",
          "& fieldset": {
            borderColor: "#ccc",
          },
          "&:hover fieldset": {
            borderColor: "#888",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#007bff",
          },
        },
      }}
    />
  );
};

export default SearchComponent;
