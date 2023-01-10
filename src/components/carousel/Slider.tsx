import React from 'react';
import Carousel from 'react-material-ui-carousel';
import SliderItem from "./SliderItem";

const Slider = () =>
{
    const items = [
        {
            name: "Movie title #1",
            description: "Movie desc"
        },
        {
            name: "Movie title #2",
            description: "Movie desc"
        }
    ];

    return (
        <Carousel height="400px" animation="fade" autoPlay={true} stopAutoPlayOnHover={true} duration={500} >
            {
                items.map( (item, i) => <SliderItem key={i} name={item.name} description={item.description}/> )
            }
        </Carousel>
    );
};

export default Slider;
