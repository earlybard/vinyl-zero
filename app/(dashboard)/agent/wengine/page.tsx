"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete, TextField, Rating, Box } from '@mui/material';

const options = [
  { label: 'Option 1', rating: 3 },
  { label: 'Option 2', rating: 4 },
  { label: 'Option 3', rating: 2 },
];

const AutocompleteWithRating = () => {
  const [ratings, setRatings] = useState(options.map(option => option.rating));
  const [open, setOpen] = useState(false);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRatingChange = (event, newValue, index) => {
    event.stopPropagation(); // Prevent option from being deselected
    const newRatings = [...ratings];
    newRatings[index] = newValue;
    setRatings(newRatings);
  };

  return (
    <div ref={autocompleteRef}>
      <Autocomplete
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={options}
        getOptionLabel={(option) => option.label}
        disableCloseOnSelect
        renderOption={(props, option) => (
          <Box
            component="li"
            {...props}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
            onMouseDown={(e) => e.preventDefault()} // Prevent closing on click
          >
            <span>{option.label}</span>
            <Rating
              value={ratings[options.indexOf(option)]}
              onChange={(event, newValue) => handleRatingChange(event, newValue, options.indexOf(option))}
              onClick={(event) => event.stopPropagation()} // Prevent closing when clicking on the rating
            />
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label="Select Option" />}
        blurOnSelect
        clearOnBlur
      />
    </div>
  );
};

export default AutocompleteWithRating;