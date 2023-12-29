// This is the Results page to render Search results
import { Checkbox, Container, Divider, FormControlLabel, Grid, Paper, Rating, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import SearchBox from "../components/SearchBox"
import axios from "axios";
import { faker } from '@faker-js/faker';
import CardItem from "../components/CardItem";
import { ArrowDropDown } from "@mui/icons-material";
import { fontFamily, fontSize, fontWeight } from "../typography";
import { colors } from '../colors'

const Results = () => {
  const [data, setData] = useState([])  // generating fake images, prices, ratings from Faker API. However, the data is unrelated to the 
  // category of "Fashion" because of deprecated and inconsistent methods
  const [filteredData, setFilteredData] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([])
  const [selectedRatings, setSelectedRatings] = useState([])
  
  const labelStyle = {
    fontFamily: `${fontFamily.font_1}`, 
    fontSize: `${fontSize.size_3}`, 
    fontWeight: `${fontWeight.weight_2}`, 
};

  // fetching the required fake data as soon as the page mounts
  useEffect(() => {
    axios
      .get('https://fakerapi.it/api/v1/persons?_quantity=20') // manually setting up the response to be 20
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
        setData(newData)
        setFilteredData(newData)
      })
      .catch(error => console.error('Error fetching persons data:', error))
  }, [])

    // custom styles setting for search box
      const searchBoxStyle = {
        width: '39rem',
        marginTop: '2.5rem',
        marginLeft: '27.625rem',
        border: '1px solid rgba(0, 0, 0, 0.5)',
        borderRadius: '13.73px'
      };
  
  const handleFilterChange = (event) => {
    console.log(event);
    const { name, checked } = event.target

    if (name.startsWith("priceRange")) {
      updateSelectedFilter(
        selectedPriceRanges,
        name,
        checked,
        setSelectedPriceRanges
      )
    } else if (name.startsWith("rating")) {
      updateSelectedFilter(selectedRatings, name, checked, setSelectedRatings)
    }

    // Filter data based on selected filters
    console.log(selectedPriceRanges);
    const newData = data.filter((item) => {

      const priceRangeFilter =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.includes(item.price1)

      const ratingFilter =
        selectedRatings.length === 0 ||
        selectedRatings.includes(item.ratingStars.toString())
 
      return priceRangeFilter && ratingFilter
    })

    setFilteredData(newData)
  }

  const updateSelectedFilter = (selectedFilters, filter, checked, setter) => {
    if (checked) {
      setter((prevFilters) => [...prevFilters, filter])
    } else {
      setter((prevFilters) => prevFilters.filter((f) => f !== filter))
    }
  }
  
    return (
        <Container maxWidth="xl">
          <div className='flex-align-center margin-top-max' >
            <SearchBox styles={searchBoxStyle}/>
          </div>
        
          <Typography sx={{
              fontFamily: `${fontFamily.font_1}`, 
              fontSize: `${fontSize.size_3}`, 
              fontWeight: `${fontWeight.weight_3}`,
              marginTop: '3rem',
              marginLeft: '1rem'}}>
            Search Results
          </Typography>

          <Grid container spacing={2} marginTop='2rem'>
            <Grid item xs={3}>
              <Paper style={{ padding: '16px', boxShadow: 'none'}}>
                <div style={{ display: 'flex', flexDirection: 'column'}} >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontFamily: `${fontFamily.font_1}`, 
                        fontSize: `${fontSize.size_2}`, 
                        fontWeight: `${fontWeight.weight_2}`,
                        marginBottom: '0.8rem'
                      }}>BRAND
                    </Typography>
                    <ArrowDropDown />
                  </div>
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="brandH&M"/>} label="H&M" sx={labelStyle}/>
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="brandNike"/>} label="Nike" sx={labelStyle}/>
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="brandAdidas"/>} label="Adidas" sx={labelStyle}/>
                </div>

                <Divider style={{ margin: '8px 0' }} />

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1" sx={{
                              fontFamily: `${fontFamily.font_1}`, 
                              fontSize: `${fontSize.size_2}`, 
                              fontWeight: `${fontWeight.weight_2}`,
                              marginBottom: '0.8rem'
                          }}>PRICE RANGE</Typography>
                      <ArrowDropDown />
                    </div>
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="priceRangeUnder200"/>} label="Under Rs.200" sx={labelStyle}/>
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="priceRange200to400"/>} label="Rs.200 - Rs.400" sx={labelStyle}/>
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="priceRange400to700"/>} label="Rs.400 - Rs.700" sx={labelStyle}/>
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="priceRangeOver700"/>} label="Over Rs.700" sx={labelStyle}/>
                </div>
                        
              <Divider style={{ margin: '8px 0' }} />

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" sx={{
                            fontFamily: `${fontFamily.font_1}`, 
                            fontSize: `${fontSize.size_2}`, 
                            fontWeight: `${fontWeight.weight_2}`,
                            marginBottom: '0.8rem'
                      }}>RATINGS</Typography>
                    <ArrowDropDown />
                  </div>
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="rating5"/>} label={<Rating name="rating-filter" value={5} readOnly sx={labelStyle} />} />
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="rating4"/>} label={<Rating name="rating-filter" value={4} readOnly sx={labelStyle} />} />
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="rating3"/>} label={<Rating name="rating-filter" value={3} readOnly  sx={labelStyle}/>} />
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="rating2"/>} label={<Rating name="rating-filter" value={2} readOnly sx={labelStyle}/>} />
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="rating1"/>} label={<Rating name="rating-filter" value={1} readOnly sx={labelStyle}/>} />
                </div>
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