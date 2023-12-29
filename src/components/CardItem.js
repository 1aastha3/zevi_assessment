// This is a reusable Card Item Component
import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Favorite } from '@mui/icons-material';
import '../sass_styles/styles.scss'
import { colors } from '../colors'
import { fontFamily, fontSize, fontWeight } from '../typography';

const CardItem = ({ image, productName, price1, price2, ratingStars, numberOfRatings }) => {
  const [isLiked, setIsLiked] = useState(false) //state of wishlisting
  const [isHovered, setIsHovered] = useState(false) // state of hovering
  
  // constructing a list of 5 stars to render ratings
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<StarIcon key={i} sx={{ color: i < ratingStars ? `${colors.yellow}` : `${colors.unselected}` }} />)
    }
    return stars
  }

  // toggle function for wishlisting
  const handleLikeToggle = () => {
    setIsLiked(!isLiked)
  }

  // react render
  return (
    <Card style={{ width: '239px', height: '450px', boxShadow: 'none', overflow: 'hidden', ':hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        },
          position:'relative'
        }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
    >
      <IconButton   // Wishlist Icon settings
        style={{
          position: 'absolute',
          marginTop: '1px',
          right: 0
        }}
        onClick={handleLikeToggle}
      >
        <Favorite
          sx={{
            color: isLiked ? `${colors.red}` : 'grey.100',
          }}
        />
      </IconButton>

      {isHovered && ( // View Product hover settings
        <div
          style={{
            position: 'absolute',
            width: '239px',
            height: '50px',
            top:275,
            background: `${colors.hover}99`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: `${colors.white}`,
            transition: 'opacity 0.3s ease-in-out',
            fontFamily:  `${fontFamily.font_1}`,
            fontSize: `${fontSize.size_2}`,
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          View Product
        </div>
      )}

      <CardMedia component="img" alt="Product" height="325" image={image} />
      <CardContent>
        <Typography 
          sx={{ fontFamily: `${fontFamily.font_1}`,  fontSize: `${fontSize.size_2}`, fontWeight: `${fontWeight.weight_3}`}} component="div" > {productName}
        </Typography>

        <Box display="flex" alignItems="center">
          <Typography color='rgba(0,0,0,0.40)' sx={{ textDecoration: 'line-through', fontFamily: `${fontFamily.font_1}`, 
                      fontSize: `${fontSize.size_2}`, 
                      fontWeight: `${fontWeight.weight_4}` }}> {price1}
          </Typography>
          <Typography sx={{ color: `${colors.hover}` ,display: 'inline', marginLeft: '5px' , fontFamily: `${fontFamily.font_1}`, 
                      fontSize: `${fontSize.size_2}`, 
                      fontWeight: `${fontWeight.weight_1}`}}> Rs.{price2}
          </Typography>
        </Box>

        <Box>
          <Box display="flex" alignItems="center">
            {renderStars()}
            <Typography sx={{ color:`${colors.black}40`, marginLeft: '5px', fontFamily: `${fontFamily.font_2}`, 
                    fontSize: `${fontSize.size_4}`, 
                    fontWeight: `${fontWeight.weight_4}`}}>
              ({numberOfRatings})
            </Typography>
          </Box>
        </Box>

      </CardContent>
    </Card>
  );
};

export default CardItem;
