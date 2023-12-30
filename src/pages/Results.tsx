//This is the search results page
import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import SearchBox from "../components/SearchBox";
import axios from "axios";
import { faker } from "@faker-js/faker";
import CardItem from "../components/CardItem";
import { ArrowDropDown } from "@mui/icons-material";
import { CSSProperties } from "react"; 
import { fontFamily, fontSize, fontWeight } from "../typography";
import '../sass_styles/styles.scss'

// customizable styles for labels on side filter panel
const labelStyle = {
    fontFamily: `${fontFamily.font_1}`, 
    fontSize: `${fontSize.size_3}`, 
    fontWeight: `${fontWeight.weight_2}`, 
};

interface ResultsItem {
  image: string;
  productName: string;
  price1: number; 
  price2: number;
  ratingStars: number;
  numberOfRatings: number;
}

const Results: React.FC = () => {
  const [data, setData] = useState<ResultsItem[]>([]);
  const [filteredData, setFilteredData] = useState<ResultsItem[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

  // custom styles setting for search box
  const searchBoxStyle: CSSProperties = {
    width: "39rem",
    marginTop: "2.5rem",
    border: "1px solid rgba(0, 0, 0, 0.5)",
    borderRadius: "13.73px",
  };

  // fetching the required fake data as soon as the page mounts, manually fetching 200 items
  useEffect(() => {
    axios
      .get('https://fakerapi.it/api/v1/persons?_quantity=200')
      .then((response) => {
        const newData: ResultsItem[] = response.data.data.map((person: any) => ({
          image: faker.image.urlPicsumPhotos({ width: 165, height: 223 }),
          productName: faker.commerce.productName(),
          price1: faker.commerce.price(),
          price2: faker.commerce.price(),
          ratingStars: faker.number.int({ min: 1, max: 5}),
          numberOfRatings: faker.number.int({ min: 1, max: 100 }),
        }));
        setData(newData);
        setFilteredData(newData);
      })
      .catch((error) => console.error('Error fetching persons data:', error));
  }, []);
  
// filter handling function
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    // bifurcating the filter categories: pricing and rating through "name" param of <FormControlLabel> Tag
    if (name.startsWith("priceRange")) {
      updateSelectedFilterPricing(selectedPriceRanges, name, checked, setSelectedPriceRanges);
      
    }
    else if (name.startsWith("rating")) {
      updateSelectedFilterRating(selectedRatings, name, checked, setSelectedRatings);
    }
};

  // filtering the items based on selected ratings. Since the "name" field is of the form "ratingX", I am slicing this word to procure the last letter. Updating the selectedFilters using spread operator is feasible. 
  const updateSelectedFilterRating = (
    selectedFilters: string[],
    filter: string,
    checked: boolean,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (checked) {
      setter((prevFilters) => (prevFilters.length === 0 ? [filter.slice(-1)] : [...prevFilters, filter.slice(-1)]));
      
    } else {
      setter((prevFilters) => prevFilters.filter((f) => f !== filter));
    }
  };

  // I could have set the "name" field directly with the required numeric values. But, in order to make it more customizable, I have incorporated efficient parsing of the any "name" string to procure the numeric values from it and update the selected Price range list using spread operator.

  const updateSelectedFilterPricing = (
    selectedFilters: string[],
    filter: string,
    checked: boolean,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    // console.log(filter);
    
    if (checked) {
      setter((prevFilters) => (prevFilters.length === 0 ? [filter] : [...prevFilters, filter]));
      
    } else {
      setter((prevFilters) => prevFilters.filter((f) => f !== filter));
    }
  };
  
  // "useState" is asynchronous. So when my selectedPriceRanges and selectedRating arrays were empty, I faced a technical lag in the updation of feature as per filters. Hence, I make use of useEffect to procure the changed state as soon as the state is changed.
  useEffect(() => {

    const newData = data.filter((item) => {
      let passesRatingFilter = false;

      if (selectedRatings.length === 0) {
        passesRatingFilter = true; 
      } else {
        for (const selectedRating of selectedRatings) {
          if (item.ratingStars?.toString().includes(selectedRating)) {
            passesRatingFilter = true;
            break;
          }
        }
      }

      let passesPriceFilter = selectedPriceRanges.length === 0;
      for (const range of selectedPriceRanges) {
        const match = range.match(/\d+/g); // parsing to procure numeric values from the string

        if (match && match.length === 2) {
          const [min, max] = match.map(Number);

          if (!isNaN(min) && !isNaN(max) && Number(item.price2) >= min && Number(item.price2) <= max) {
            passesPriceFilter = true; // Number makes sure the comparision happens within same data type
            break;
          }
        }
      }
      const passesFilter = passesPriceFilter && passesRatingFilter;

      return passesFilter;
    });

    setFilteredData(newData); // updating the filterData state
    // console.log(filteredData);
    
  }, [selectedPriceRanges, selectedRatings, data]); // this useEffect Hook runs whenever the user selects a filter (except brand, because the the images are unrelated to the brand, as the methods of FAKER API have deprecated)

  // RENDERING 
  return (
    <Container maxWidth="xl" className="my-component" >
      <div className="search-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <SearchBox onChange={(value) => console.log(value)} onClick={() => {}} onEnter={() => {}} isModalOpen={false} styles={searchBoxStyle}/>
      </div>

      <Typography
        sx={{
          fontFamily: `${fontFamily.font_1}`,
          fontSize: `${fontSize.size_1}`,
          fontWeight: `${fontWeight.weight_3}`,
          marginTop: '3rem',
          position:'fixed'
        }}
      >
        Search Results
      </Typography>

      <Grid container spacing={3} marginTop="8rem" sx={{overflowY:'auto', height:'100vh'}}>
        <Grid item xs={12} md={3} className="side-panel"  sx={{position:'fixed'}}>
          <Paper style={{ boxShadow: 'none' }}>
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
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} />} label="H&M" sx={labelStyle}/>
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange}/>} label="Nike" sx={labelStyle}/>
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} />} label="Adidas" sx={labelStyle}/>
                </div>

                <Divider style={{ margin: '8px 0px', width: '320px' }} />

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
              
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="priceRange0to200"/>} label="Rs.0 - Rs. 200" sx={labelStyle}/>
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="priceRange200to400"/>} label="Rs.200 - Rs.400" sx={labelStyle}/>
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="priceRange400to700"/>} label="Rs.400 - Rs.700" sx={labelStyle}/>
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="priceRange700to1000"/>} label="Rs.700 - Rs. 1000" sx={labelStyle}/>
                </div>
                        
              <Divider style={{ margin: '8px 0', width:'100%' }} />

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
        <Grid item xs={12} md={9} className="cards" sx={{marginLeft:'25%'}} >
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            {filteredData.map((item, index) => (
              <CardItem key={index} {...item} />
            ))}
          </div>
        </Grid>
      </Grid>
      </Container>
      
  );
};

export default Results;
