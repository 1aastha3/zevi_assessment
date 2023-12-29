import { Search } from "@mui/icons-material"
import { TextField } from "@mui/material"
import '../sass_styles/search_box.scss';
import React from "react"

const SearchBox = ({ onChange, onClick, isModalOpen }) => {


    return (
        <div className="search-box" onClick={onClick}>
            <TextField
                variant="standard"
                placeholder="Search"
                onChange={(e) => onChange(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <>
                            <Search fontSize="large"/>
                        </>
                    ),

                    disableUnderline: true
                }}

            />
        </div>
    )
}

export default SearchBox