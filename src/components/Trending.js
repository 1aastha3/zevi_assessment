import { Box, Card, CardContent, List, ListItem, Modal, Typography } from "@mui/material";
import React from "react";
import { faker } from '@faker-js/faker';

const Trending = ({ isOpen, onClose, personsData, clothesData, suggestions }) => {

    return (
    <div open={isOpen} onClose={onClose}>
        <Box className="box-container">
            <Typography variant="h5">Latest Trends</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.6rem'}}>
                    {personsData.map((person, index) => (
                    <div key={index}>
                        <img
                            src={clothesData[index]}
                            alt={`Fashion ${index + 1}`}
                            style={{ width: '100%', borderRadius: '4px' }}
                        />
                        <Typography variant="subtitle1">{person.firstname} {person.lastname}</Typography>
                    </div>
                    ))}
                </Box>    
            <Typography variant="h5" sx={{ marginTop: '16px', marginBottom: '8px' }}>
                Popular Suggestions
                </Typography>
                
            <List>
                {suggestions.map((person, index) => (
                    <ListItem key={index}>{suggestions[index]}</ListItem>
                ))}
            </List>

        </Box>
        </div>
    )
}

export default Trending