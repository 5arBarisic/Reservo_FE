import React from 'react';
import Carousel from 'react-material-ui-carousel';
import SliderItem from "./SliderItem";

const Slider = () => {
    const movies = [
        {
            name: "Movie title #1",
            description: "Movie desc",
            id: 1
        },
        {
            name: "Movie title #2",
            description: "Movie desc",
            id: 2
        }
    ];

    return (
        <Carousel navButtonsProps={{
            style: {
                backgroundColor: 'deepskyblue'
            }
        }} height="400px" animation="fade" autoPlay={true} stopAutoPlayOnHover={true} duration={500}>
            {
                movies.map((movie) => <SliderItem key={movie.id} name={movie.name} description={movie.description} id={movie.id}/>)
            }
        </Carousel>
    );
};

export default Slider;
