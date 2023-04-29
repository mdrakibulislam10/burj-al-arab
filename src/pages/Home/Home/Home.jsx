import React from 'react';
import { useLoaderData } from 'react-router-dom';
import HotelDataCard from '../HotelDataCard/HotelDataCard';
import "./Home.css";

const Home = () => {
    const hotelCards = useLoaderData();
    // console.log(hotelCards);

    return (
        <div>
            <h2>Book Your Room!!!</h2>
            <div className='hotel-container'>
                {
                    hotelCards.map(hotelCard =>
                        <HotelDataCard
                            key={hotelCard.id}
                            hotelCard={hotelCard}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default Home;