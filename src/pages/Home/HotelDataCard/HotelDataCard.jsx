import React from 'react';
import "./HotelDataCard.css";
import { useNavigate } from 'react-router-dom';

const HotelDataCard = ({ hotelCard }) => {
    // console.log(hotelCard);
    const navigate = useNavigate();

    const { location, img, hotelName, price } = hotelCard;

    return (
        <div className='hotel-card'>
            <img src={img} alt="" />
            <h2>Hotel Name: {hotelName}</h2>
            <p>Location: {location}</p>
            <p>Price: {price}</p>
            <button onClick={() => navigate("/book")}>Book</button>
        </div>
    );
};

export default HotelDataCard;