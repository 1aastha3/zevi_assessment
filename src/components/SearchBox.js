// This is a reusable, and customizable search box user input component
import { Search } from "@mui/icons-material"
import { TextField } from "@mui/material"
import '../sass_styles/styles.scss';
import React from "react"
import { fontFamily, fontWeight } from "../typography";
import { colors } from '../colors'

const SearchBox = ({ onChange, onClick, styles, onEnter }) => {

    // "Enter key press handling for page navigation"
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        onEnter()
        }
    }

    // customizable searchBox Styles
    const searchBoxStyle = {
        background: `${colors.white}`,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        padding: '8px',
        ...styles,
         fontSize: '32px',
         fontFamily: `${fontFamily.font_1}`,
         fontWeight: `${fontWeight.weight_3}`,
        color: `${colors.black}80`
    };

    return (
        <div onClick={onClick}>
            <TextField // searchBox properties and adornments
                variant="standard"
                placeholder="Search"
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                    endAdornment: (
                        <>
                            <Search fontSize="large"/>
                        </>
                    ),
                    sx: { ...searchBoxStyle },
                    
                    disableUnderline: true
                }}
            />
        </div>
    )
}

export default SearchBox