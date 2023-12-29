import { Button, Checkbox, Container, FormControlLabel, Grid, Paper, Rating, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import SearchBox from "../components/SearchBox"
import axios from "axios";
import { faker } from '@faker-js/faker';
import CardItem from "../components/CardItem";

const Results = () => {
    const [data, setData] = useState([]);
    

  useEffect(() => {
    axios
      .get('https://fakerapi.it/api/v1/persons?_quantity=20')
      .then(response => {
        const newData = response.data.data.map(person => {
          return {
            image: faker.image.urlPicsumPhotos({width:165, height:223}),
            productName: faker.commerce.productName(),
            price1: faker.commerce.price(),
            price2: faker.commerce.price(),
            ratingStars: faker.number.int({ min: 1, max: 5, precision: 0.1 }),
            numberOfRatings: faker.number.int({ min: 1, max: 100 }),
          };
        });
        setData(newData);
      })
      .catch(error => console.error('Error fetching persons data:', error));
  }, []);
    
      const handleFilterChange = (event) => {
    // Handle filter changes here
    console.log(event.target.name, event.target.checked);
  };
    return (
        <Container maxWidth="xl">
            <div className='flex-align-center margin-top-max' styles={{marginTop:'400px'}}>
                <SearchBox />
            </div>
            <Grid container spacing={2} marginTop="250px">
                <Grid item xs={3}>
        <Paper style={{ padding: '16px' }}>
        <Typography variant="h4">Search Results</Typography>

<div style={{ display: 'flex', flexDirection: 'column' }}>
  <Typography variant="h5">Brand</Typography>
  <FormControlLabel control={<Checkbox onChange={handleFilterChange} />} label="H&M" />
  <FormControlLabel control={<Checkbox onChange={handleFilterChange} />} label="Nike" />
  <FormControlLabel control={<Checkbox onChange={handleFilterChange} />} label="Adidas" />
</div>

    

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle1">Price Range</Typography>
        <FormControlLabel control={<Checkbox onChange={handleFilterChange} />} label="Under $50" />
        <FormControlLabel control={<Checkbox onChange={handleFilterChange} />} label="$50 - $100" />
        <FormControlLabel control={<Checkbox onChange={handleFilterChange} />} label="$100 - $200" />
                            <FormControlLabel control={<Checkbox onChange={handleFilterChange} />} label="Over $200" />
                            </div>

         <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle1" >Ratings</Typography>
        <FormControlLabel control={<Checkbox onChange={handleFilterChange} />} label={<Rating name="rating-filter" value={5} readOnly />} />
        <FormControlLabel control={<Checkbox onChange={handleFilterChange} />} label={<Rating name="rating-filter" value={4} readOnly />} />
        <FormControlLabel control={<Checkbox onChange={handleFilterChange} />} label={<Rating name="rating-filter" value={3} readOnly />} />
        <FormControlLabel control={<Checkbox onChange={handleFilterChange} />} label={<Rating name="rating-filter" value={2} readOnly />} />
                        <FormControlLabel control={<Checkbox onChange={handleFilterChange} />} label={<Rating name="rating-filter" value={1} readOnly />} />
                        </div>

        {/* Apply Button */}
      </Paper>
                </Grid>
                <Grid item xs={9}>
                    <div style={{display:'flex', gap:'30px', flexWrap:'wrap'}}>
                        {data.map((item, index) => (
                            <CardItem key={index} {...item} />
                        ))}
                    </div>
                </Grid>
            </Grid>
        </Container>
            
    )
}

export default Results