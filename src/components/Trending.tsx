import { Box, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { fontFamily, fontSize, fontWeight } from "../typography";

interface TrendingProps {
  isOpen: boolean;
  personsData: any[]; // Adjust the type accordingly
  clothesData: string[]; // Assuming this is an array of strings (URLs)
  suggestions: string[];
}

const Trending: React.FC<TrendingProps> = ({ isOpen, personsData, clothesData, suggestions }) => {
  return (
    <div data-open={isOpen}>
      <Box className="box-container">
        <Typography sx={{ fontFamily: `${fontFamily.font_1}`, fontSize: '21.972px', fontWeight: `${fontWeight.weight_2}` }}>
          Latest Trends
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.6rem' }}>
          {personsData.map((person, index) => (
            <div key={index}>
              <img
                src={clothesData[index]}
                alt={`Fashion ${index + 1}`}
                style={{ width: '100%', borderRadius: '4px' }}
              />
              <Typography sx={{ fontFamily: `${fontFamily.font_1}`, fontSize: `${fontSize.size_4}`, fontWeight: `${fontWeight.weight_4}` }}>
                {person.firstname} {person.lastname}
              </Typography>
            </div>
          ))}
        </Box>
        <Typography sx={{ marginTop: '16px', marginBottom: '8px', fontFamily: `${fontFamily.font_1}`,
          fontSize: '21.972px',
          fontWeight: `${fontWeight.weight_2}` }}>
          Popular Suggestions
        </Typography>

        <List>
          {suggestions.map((suggestion, index) => (
            <ListItem key={index} sx={{
              fontFamily: `${fontFamily.font_1}`,
              fontSize: `${fontSize.size_3}`,
              fontWeight: `${fontWeight.weight_3}`
            }}>{suggestion}</ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default Trending;
