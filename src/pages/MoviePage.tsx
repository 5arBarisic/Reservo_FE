import React, {useEffect, useState} from "react";
import HeadBar from "../components/navigation/HeadBar";
import {CardMedia} from "@mui/material";
import {useParams} from "react-router-dom";
import { getProjectionsByMovie} from "../api/Movies/apiCalls";
import {Projection} from "../api/Movies/types";


const MoviePage = () => {
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [projections, setProjections] = useState<Projection[]>([]);
    const [projectionDates, setProjectionDates] = useState<string[]>([]);

    const formatDate = (backendDate: string) => {

        return new Date(backendDate).toLocaleDateString('en-GB') +
            ' ' + new Date(backendDate).getHours() +
            ':' + new Date(backendDate).getMinutes();
    }


    const loadMovieProjections = async (movieId: string) => {
        setLoading(true);

        await getProjectionsByMovie(movieId)
            .then((response) => {
                setProjections(response.data);
                setProjectionDates(response.data.map((item: Projection) => formatDate(item.screeningTime)))
            })
            .catch(() => setProjections([]))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        if (id) void loadMovieProjections(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    return (
        <div style={{borderRadius: "0 0 200px 0"}}
             className="mx-auto bg-gradient-to-r from-black via-gray-800 to-orange-500 min-h-screen">
            <HeadBar haveBorder={false}/>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col ml-44 mt-20 gap-y-10 mb-32 items-center">
                    <p className="text-white text-6xl "> {projections[0]?.movie.title}</p>
                    <p className="text-white text-2xl">{projections[0]?.movie.description}</p>
                    <div className=" flex justify-center px-20">
                        <button
                            className="text-white text-3xl border border-gray-400 rounded-lg p-2 hover:bg-orange-500 hover:border-orange-500">Learn
                            more
                        </button>
                    </div>
                    <p className="text-white text-3xl" >Reserve a seat</p>
                    <div className="grid grid-cols-4 gap-x-6 gap-y-5 ">
                        {projectionDates.length > 0 && projectionDates.map((projection) => {
                            return <button
                                key={projection}
                                className="text-white border border-gray-400 rounded-lg p-2 hover:bg-orange-500 hover:border-orange-500">
                                {projection}
                            </button>
                        })}
                    </div>
                </div>
                <div>
                    <CardMedia
                        sx={{
                            height: "450px",
                            width: "450px",
                            padding: "10px",
                            marginTop: "10px",
                            marginBottom: "10px",
                            marginRight: "200px",
                            borderRadius: "20px",
                            opacity: "40%"
                        }}
                        component="img"
                        image="https://i.pinimg.com/736x/9e/96/0d/9e960d4b33cafe5b256e034723d5120c.jpg"
                        alt="opis slike"
                    />
                </div>
            </div>
        </div>
    );
};
export default MoviePage;