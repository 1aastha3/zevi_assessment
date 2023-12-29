// this is home page, with search box, and an event listener modal div
import React, { useEffect, useState } from "react"
import SearchBox from "../components/SearchBox";
import Trending from "../components/Trending";
import axios from 'axios'
import { faker } from '@faker-js/faker';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [search, setSearch] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [personsData, setPersonsData] = useState([]);
    const [clothesData, setClothesData] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate()

    const searchBoxStyle = {
        width: '62.5rem',
        height: '4rem',
        marginTop: '16.5%',
        marginLeft: '34%',
        borderRadius: '8px',
        border: "none"
    };

    useEffect(() => {
        axios.get('https://fakerapi.it/api/v1/persons?_quantity=5')
        .then(response => {
            setPersonsData(response.data.data)
            // console.log(personsData)
            // generating fake images of the "fashion clothes". Here the images generated are unrelated because many API methods have deprecated.
            const imagesArray = response.data.data.map(person => faker.image.urlPicsumPhotos({width:165, height:223}))
            setClothesData(imagesArray)

            // generating fake suggestion usinf FAKER API to render on the modal div
            const suggestionsArray = response.data.data.map(person => faker.commerce.productName())
            setSuggestions(suggestionsArray)
            // console.log(suggestions)
        })
        .catch(error => console.error('Error fetching persons data:', error))
    }, [])

    // input text handler function
    const handleChange = (e) => {
        setSearch(e)
    }

    // toggle function to handle modal div prompting upon clicking on the search button
    const handleClick = () => {
        setModalOpen(true)
    }
    
    // handler function to navigate to /results page on pressing "Enter" Key
      const handleEnterPress = () => {
    navigate("/results")
  };
    
    return ( // importing the custom reusable components here
        <div className="home-container">
            <div className="background-image"></div> 
                <SearchBox onChange={(e) => handleChange(e)} onClick={handleClick} isModalOpen={isModalOpen} styles={searchBoxStyle} onEnter={handleEnterPress}/> 
            {isModalOpen && ( // conditional prompting the rendering of modal div to show whats trending and render trending suggestions
                <div className="modal">
                    <Trending isOpen={isModalOpen} personsData={personsData} clothesData={clothesData} suggestions={ suggestions} />   
                </div>
            )}
            
        </div>
    )
}

export default Home