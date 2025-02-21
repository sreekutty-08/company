import React from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { ChevronDown } from 'lucide-react';

const FilterBy = ({ 
  options, 
  value, 
  onChange, 
  label = "Filter by", 
  placeholder = "Select option" 
}) => {
  return (
    <FormControl 
      className="w-[200px]"
      size="small"
    >
      <InputLabel id="filter-by-label" className="font-poppins">
        {label}
      </InputLabel>
      
      <Select
        labelId="filter-by-label"
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        className="font-poppins bg-white rounded-lg shadow-card"
        IconComponent={() => <ChevronDown className="w-5 h-5 mr-2 text-black-500" />}
        displayEmpty
      >
        
        
        {options.map((option) => (
          <MenuItem 
            key={option.value} 
            value={option.value}
            className="font-poppins hover:bg-gray-200/50"
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterBy;
