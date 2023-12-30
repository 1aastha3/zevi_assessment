//This is the trending modal div component that is prompted by clicking on search box
import { Box, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { fontFamily, fontSize, fontWeight } from "../typography";

interface TrendingProps {
  isOpen: boolean;
  personsData: any[];
  clothesData: string[]; 
  suggestions: string[];
}
// font size, family, weight and colors are highly reusable. and easily customizable from typography.js and colors.js files.
// I could not create an entire set of fonts like header, subHeader1, subHeader2, body etc because of a lot of permutations and combnations of font family, size and weights involved in the FIGMA design. Otherwise it would have become more customised by just adding a variant field in Typography - MUI component.

// paasing generated data as props from Home page, as well as a state called isOpen which determines whether the user has clicked on the search box or not.
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
                alt={`Fashion ${index + 1}`} // iterating on the data prop to render different images for all the data
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
