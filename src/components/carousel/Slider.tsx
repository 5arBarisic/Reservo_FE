import React, {useEffect, useState} from 'react';
import Carousel from 'react-material-ui-carousel';
import SliderItem from "./SliderItem";
import {getMovies} from "../../api/Movies/apiCalls";
import {Movie} from "../../api/Movies/types";

const Slider = () => {

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState<Movie[]>([])

    const loadMovies = async () => {
        setLoading(true);

        await getMovies()
            .then((response) => setMovies(response.data))
            .catch(()=>setMovies([]))
            .finally(()=>setLoading(false));
    }
    useEffect(() => {
        void loadMovies();
    }, []);

    return (
        <Carousel navButtonsProps={{
            style: {
                backgroundColor: 'deepskyblue'
            }
        }} height="400px" animation="fade" autoPlay={true} stopAutoPlayOnHover={true} duration={500}>
            {
               !loading && movies.map((movie) => <SliderItem key={movie.id} name={movie.title} description={movie.description}
                                                  id={movie.id}/>)
            }
        </Carousel>
    );
};

export default Slider;
