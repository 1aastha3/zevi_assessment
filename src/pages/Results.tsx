import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import SearchBox from "../components/SearchBox";
import axios from "axios";
import { faker } from "@faker-js/faker";
import CardItem from "../components/CardItem";
import { ArrowDropDown } from "@mui/icons-material";
import { CSSProperties } from "react"; 
import { fontFamily, fontSize, fontWeight } from "../typography";
import { colors } from "../colors";
import '../sass_styles/styles.scss'
import { log } from "console";

const labelStyle = {
    fontFamily: `${fontFamily.font_1}`, 
    fontSize: `${fontSize.size_3}`, 
    fontWeight: `${fontWeight.weight_2}`, 
};

interface ResultsItem {
  image: string;
  productName: string;
  price1: string;
  price2: string;
  ratingStars: number;
  numberOfRatings: number;
}

const Results: React.FC = () => {
  const [data, setData] = useState<ResultsItem[]>([]);
  const [filteredData, setFilteredData] = useState<ResultsItem[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

  // custom styles setting for search box
  const searchBoxStyle: CSSProperties = {
    width: "39rem",
    marginTop: "2.5rem",
    // marginLeft: "27.625rem",
    border: "1px solid rgba(0, 0, 0, 0.5)",
    borderRadius: "13.73px",
  };

  // fetching the required fake data as soon as the page mounts
  useEffect(() => {
    axios
      .get('https://fakerapi.it/api/v1/persons?_quantity=20')
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
  

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

  if (name.startsWith("priceRange")) {
    updateSelectedFilter(
      selectedPriceRanges,
      name,
      checked,
      setSelectedPriceRanges
    );
  } else if (name.startsWith("rating")) {
    updateSelectedFilter(selectedRatings, name, checked, setSelectedRatings);
  }

console.log(selectedPriceRanges);

    // Filter data based on selected filters
const newData = data.filter((item) => {

  // Convert 'priceRange400to700' to [400, 700]
  const priceRange = selectedPriceRanges.map((range) => {
    const match = range.match(/\d+/g);
    if (!match || match.length < 2) {
      // Handle invalid or missing values
      return null;
    }
    const [min, max] = match.map(Number);
    if (isNaN(min) || isNaN(max)) {
      // Handle cases where min or max is not a number
      return null;
    }
    return { min, max };
  }).filter((range) => range !== null);

  const priceRangeFilter =
    selectedPriceRanges.length === 0 ||
    priceRange.some((range) => range && !isNaN(Number(item.price1)) && Number(item.price1) >= range.min && Number(item.price1) <= range.max);

const ratingFilter =
    selectedRatings.length === 0 ||
    selectedRatings.some((selectedRating) => item.ratingStars?.toString().includes(selectedRating));

  return priceRangeFilter && ratingFilter;
});



    console.log(newData);
    
    setFilteredData(newData);
    
  };

const updateSelectedFilter = (
  selectedFilters: string[],
  filter: string,
  checked: boolean,
  setter: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (checked) {
    setter((prevFilters) => [...prevFilters, filter]);
  } else {
    setter((prevFilters) => prevFilters.filter((f) => f !== filter));
  }
};

  return (
    <Container maxWidth="xl" className="my-component">
      <div className="search-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <SearchBox onChange={(value) => console.log(value)} onClick={() => {}} onEnter={() => {}} isModalOpen={false} styles={searchBoxStyle}/>
      </div>

      <Typography
        sx={{
          fontFamily: `${fontFamily.font_1}`,
          fontSize: `${fontSize.size_1}`,
          fontWeight: `${fontWeight.weight_3}`,
          marginTop: '3rem',
        }}
      >
        Search Results
      </Typography>

      <Grid container spacing={3} marginTop="2rem">
        <Grid item xs={12} md={3} className="side-panel">
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
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="brandH&M"/>} label="H&M" sx={labelStyle}/>
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="brandNike"/>} label="Nike" sx={labelStyle}/>
                  <FormControlLabel control={<Checkbox onChange={handleFilterChange} name="brandAdidas"/>} label="Adidas" sx={labelStyle}/>
                </div>

                <Divider style={{ margin: '8px 0px' }} />

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
        <Grid item xs={12} md={9} className="cards">
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
