import React, {useEffect, useState} from "react";
import {Movie} from "../api/Movies/types";
import {getMovies} from "../api/Movies/apiCalls";
import CardItem from "../components/carousel/CardItem";
import HeadBar from "../components/navigation/HeadBar";
import {TextField} from "@mui/material";

const ProjectionsPage = () => {

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState<Movie[]>([])
    const [filteredMovies,setFilteredMovies] = useState<Movie[]>([])

    const handleFilter = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const searchWord = event.currentTarget.value;
        const newFilter = movies.filter((item) => {
            return item.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredMovies(movies);
        } else {
            setFilteredMovies(newFilter);
        }

    };



    const loadMovies = async () => {
        setLoading(true);

        await getMovies()
            .then((response) => {
                setMovies(response.data)
                setFilteredMovies(response.data)
            })
            .catch(() => setMovies([]))
            .finally(() => setLoading(false));
    }
    useEffect(() => {
        void loadMovies();
    }, []);

    return (
        <div className="bg-orange-500 min-h-screen">
            <div className="bg-gray-800">
                <HeadBar haveNav={true} haveBorder={true}/>
            </div>
            <p className="text-gray-700 text-4xl mt-4 ml-60">Movies</p>
            <div className="flex justify-center max-w-2xl mx-auto  mt-4 rounded-6xl">
                <TextField
                    sx={{input: {color: 'black',marginLeft:'4px'}}}
                    className="w-full rounded-6xl"
                    style={{color:"white"}}
                    onChange={(e)=>handleFilter(e)}
                    variant="standard"
                    color="error"
                    label="Search"
                />
            </div>
            <div className="py-8 mx-56 flex flex-col gap-y-10 ">{
                !loading && filteredMovies.map((movie) => <CardItem key={movie.id} name={movie.title}
                                                            description={movie.description}
                                                            id={movie.id} images={movie.images}/>)
            }
            </div>
        </div>)
}
export default ProjectionsPage;