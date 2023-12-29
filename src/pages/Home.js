import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import SearchBox from "../components/SearchBox";
import Trending from "../components/Trending";
import axios from 'axios'
import { faker } from '@faker-js/faker';

const Home = () => {
    const [search, setSearch] = useState('')
    const [isModalOpen, setModalOpen] = useState(false);
    const [personsData, setPersonsData] = useState([]);
    const [clothesData, setClothesData] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        axios.get('https://fakerapi.it/api/v1/persons?_quantity=5')
        .then(response => {
            setPersonsData(response.data.data);

            // Assuming the image links are in the 'image' property of each person object
            const imagesArray = response.data.data.map(person => faker.image.urlPicsumPhotos({width:165, height:223}));
            setClothesData(imagesArray);

            const suggestionsArray = response.data.data.map(person => faker.commerce.productName())
            setSuggestions(suggestionsArray)
            console.log(suggestions);
        })
        .catch(error => console.error('Error fetching persons data:', error));
    }, []);

    const handleChange = (e) => {
        setSearch(e)
    }

    const handleClick = () => {
        setModalOpen(true);
    }
    
    const handleCloseModal = () => {
    setModalOpen(false);
  }
    
    return (
        <div className="home-container">
            <div className="background-image"></div>
            <SearchBox onChange={(e) => handleChange(e)} onClick={handleClick} isModalOpen={isModalOpen} />
            {isModalOpen && (
                <div className="modal">
                    <Trending isOpen={isModalOpen} onClose={handleCloseModal} personsData={personsData} clothesData={clothesData} suggestions={ suggestions} />   
                </div>
            )}
            
        </div>
    )
}

export default Home