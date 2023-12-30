//This is the home page
import React, { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import Trending from "../components/Trending";
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { useNavigate } from "react-router-dom";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    //states
    const [search, setSearch] = useState<string>('');
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [personsData, setPersonsData] = useState<any[]>([]); 
    const [clothesData, setClothesData] = useState<string[]>([]); 
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const navigate = useNavigate();

    //customizable styles for searchbox
    const searchBoxStyle: React.CSSProperties = {
        width: '62.5rem',
        height: '4rem',
        marginTop: '16.5%',
        marginLeft: '34%',
        borderRadius: '8px',
        border: "none"
    };

    // fetching the data from faker API manually 5 quantities. The data is unrelated because many methods of this api have deprecated. As a relut the generated data is sometimes derogatory. 
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

    // right now its redundant as the the data generated is unrealated to fashion category. But given a proper source of data, I would be able to implement this function further. 
    const handleChange = (value: string) => {
        setSearch(value)
    }

    // prompting function for the modal div to open up
    const handleClick = () => {
        setModalOpen(true);
    }

    // handler funcntion to navigate to /results pages
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
