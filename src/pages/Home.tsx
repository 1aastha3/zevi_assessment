import React, { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import Trending from "../components/Trending";
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { useNavigate } from "react-router-dom";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const [search, setSearch] = useState<string>('');
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [personsData, setPersonsData] = useState<any[]>([]); // Adjust the type accordingly
    const [clothesData, setClothesData] = useState<string[]>([]); // Assuming this is an array of strings (URLs)
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const navigate = useNavigate();

    const searchBoxStyle: React.CSSProperties = {
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
            setPersonsData(response.data.data);
            const imagesArray = response.data.data.map((person: any) => faker.image.urlPicsumPhotos({ width: 165, height: 223 }));
            setClothesData(imagesArray);

            const suggestionsArray = response.data.data.map((person: any) => faker.commerce.productName());
            setSuggestions(suggestionsArray);
        })
        .catch(error => console.error('Error fetching persons data:', error));
    }, []);

    const handleChange = (value: string) => {
        setSearch(value)
    }

    const handleClick = () => {
        setModalOpen(true);
    }

    const handleEnterPress = () => {
        navigate("/results");
    };

    return (
        <div className="home-container">
            <div className="background-image"></div> 
            <div className="content-wrapper">
                <SearchBox onChange={(e) => handleChange(e)} onClick={handleClick} isModalOpen={isModalOpen} styles={searchBoxStyle} onEnter={handleEnterPress}/> 
                {isModalOpen && (
                    <div className="modal">
                        <Trending isOpen={isModalOpen} personsData={personsData} clothesData={clothesData} suggestions={suggestions} />   
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
