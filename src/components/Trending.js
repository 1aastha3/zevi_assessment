// This is a separate Modal component to render suggestions and trends div
import { Box, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { fontFamily, fontSize, fontWeight } from "../typography";

// handling of onClick function on the searchBar leading to the pop up of a modal div
// random data from faker API is passed as props 

// NOTE: Many methods of Faker API have deprecated. Also, the "kind" of data generated is not consistent with the input params.
// the images data genereated is sometimes derogatory, hence I have generated random images unrelated to the "fashion" category

const Trending = ({ isOpen, personsData, clothesData, suggestions }) => {
    return (
    <div open={isOpen}>
        <Box className="box-container">
            <Typography sx={{ fontFamily: `${fontFamily.font_1}`, fontSize: '21.972px', fontWeight: `${fontWeight.weight_2}` }}>
                Latest Trends
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.6rem'}}>
                {personsData.map((person, index) => ( // mapping over all the generated images to render
                <div key={index}>
                    <img
                        src={clothesData[index]}
                        alt={`Fashion ${index + 1}`}
                        style={{ width: '100%', borderRadius: '4px' }}
                    />
                    <Typography sx={{ fontFamily:`${fontFamily.font_1}`, fontSize: `${fontSize.size_4}`,  fontWeight: `${fontWeight.weight_4}` }}>
                        {person.firstname} {person.lastname}
                    </Typography>
                </div>
                ))}
            </Box>    
            <Typography sx={{ marginTop: '16px', marginBottom: '8px', fontFamily: `${fontFamily.font_1}`, 
                    fontSize: '21.972px', 
                    fontWeight: `${fontWeight.weight_2}`}}>
                Popular Suggestions
            </Typography>
                
            <List>
                {suggestions.map((person, index) => ( // the fashion category of Faker API is deprecated. It did not seeem possible to procure fashion clothes products. Hence here too I am generating random products. 
                    <ListItem key={index} sx={{
                    fontFamily: `${fontFamily.font_1}`, 
                    fontSize: `${fontSize.size_3}`, 
                    fontWeight: `${fontWeight.weight_3}`
                }}>{suggestions[index]}</ListItem>
                ))}
            </List>
        </Box>
        </div>
    )
}

export default Trending