"use client"
import React, { useState } from "react";
import { Autocomplete, TextField, Rating, Box } from "@mui/material";

const options = [
  { label: "Option 1", rating: 2 },
  { label: "Option 2", rating: 3.5 },
  { label: "Option 3", rating: 4 },
];

export default function AutocompleteWithRating() {
  const [value, setValue] = useState([]);
  const [ratings, setRatings] = useState(options.map(option => option.rating));

  const handleRatingChange = (event, newRating, index) => {
    const newRatings = [...ratings];
    newRatings[index] = newRating;
    setRatings(newRatings);
  };

  return (
    <Autocomplete
      multiple
      id="autocomplete-with-rating"
      options={options}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Box sx={{ flexGrow: 1 }}>{option.label}</Box>
          {selected && (
            <Rating
              value={ratings[options.indexOf(option)]}
              onChange={(event, newValue) =>
                handleRatingChange(event, newValue, options.indexOf(option))
              }
              onMouseDown={(event) => {
                // Prevent mousedown from closing the dropdown
                event.preventDefault();
                event.stopPropagation();
              }}
              onClick={(event) => {
                // Prevent click from closing the dropdown
                event.preventDefault();
                event.stopPropagation();
              }}
              precision={0.5}
              sx={{ ml: 2 }}
            />
          )}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label="Select options" />}
    />
  );
}