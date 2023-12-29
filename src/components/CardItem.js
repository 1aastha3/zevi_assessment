import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const CardItem = ({ image, productName, price1, price2, ratingStars, numberOfRatings }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<StarIcon key={i} color={i < ratingStars ? 'primary' : 'disabled'} />);
    }
    return stars;
  };

  return (
      <Card style={{ width: '239px' }}>
      <CardMedia
        component="img"
        alt="Product"
        height="140"
        image={image}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {productName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textDecoration:'line-through'}}>
          {price1}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {price2}
        </Typography>
        <Box>
                         <Box display="flex">{renderStars()}</Box>
                  {numberOfRatings}  
        </Box>
         

      </CardContent>
    </Card>
  );
};

export default CardItem;
