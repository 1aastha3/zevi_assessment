// this is a reusable and customizable search box component which accepts styles like margin, width and height as all other styles remain fixed. 
import React, {ChangeEvent, KeyboardEvent } from 'react';
import { Search } from "@mui/icons-material";
import { TextField, InputProps } from "@mui/material";
import '../sass_styles/styles.scss';
import { fontFamily, fontWeight } from "../typography";
import { colors } from '../colors';

interface SearchBoxProps {
  onChange: (value: string) => void;
  onClick: () => void;
  onEnter: () => void;
  isModalOpen: boolean;
  styles?: React.CSSProperties;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onChange, onClick, onEnter, isModalOpen, styles }) => {

  // handler function for handling event of prssing "Enter"
  // I am using inbuilt MUI Search icon. I would have converted the FIGMA search icon vector to SVG and imported here but since I did not have any access to the FIGMA design edit, using that PLUGIN was invalid. 
  
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter();
    }
  };

  const searchBoxStyle: React.CSSProperties = {
    background: `${colors.white}`,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '8px',
    ...styles,
    fontSize: '32px',
    fontFamily: `${fontFamily.font_1}`,
    fontWeight: `${fontWeight.weight_3}`,
    color: `${colors.black}`,
  };

  return (
    <div onClick={onClick}>
      <TextField
        variant="standard"
        placeholder="Search"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <>
              <Search fontSize="large" /> 
            </>
          ),
          sx: { ...searchBoxStyle } as InputProps['sx'], 
          disableUnderline: true
        }}
      />
    </div>
  );
};

export default SearchBox;
