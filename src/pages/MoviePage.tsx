import React, {useEffect, useRef, useState} from "react";
import HeadBar from "../components/navigation/HeadBar";
import {CardMedia} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {getProjectionsByMovie} from "../api/Movies/apiCalls";
import {Projection} from "../api/Movies/types";
import {Paths} from "../routes/Paths";


export type ProjectionProps = {
    id: number;
    time: string;
}

const MoviePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [projections, setProjections] = useState<Projection[]>([]);
    const [projectionDates, setProjectionDates] = useState<ProjectionProps[]>([]);

    const ref = useRef<null | HTMLDivElement>(null);

    const handleLearnMore = () => {

        ref.current?.scrollIntoView({behavior: 'smooth'});
    };

    const formatDate = (backendDate: string) => {

        return new Date(backendDate).toLocaleDateString('en-GB') +
            ' ' + new Date(backendDate).getHours() +
            ':' + new Date(backendDate).getMinutes();
    }

    const projectionFormatter = (projection: Projection) => {

        const project: ProjectionProps = {
            id: projection.id,
            time: formatDate(projection.screeningTime)
        };


        return project;
    }


    const loadMovieProjections = async (movieId: string) => {
        setLoading(true);

        await getProjectionsByMovie(movieId)
            .then((response) => {
                setProjections(response.data);
                setProjectionDates(response.data.map((item: Projection) => projectionFormatter(item)))
            })
            .catch(() => setProjections([]))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        if (id) void loadMovieProjections(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    return (<>
        <div
            className={` ${loading ? 'bg-gradient-to-r from-black via-gray-800 to-orange-500' : 'bg-white'} space-y-6`}>
            {!loading && <div style={{borderRadius: "0 0 200px 0"}}
                              className="mx-auto bg-gradient-to-r from-black via-gray-800 to-orange-500 min-h-screen">
                <HeadBar haveBorder={false}/>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col ml-44 mt-20 gap-y-10 mb-24 items-center">
                        <p className="text-orange-600 text-6xl max-w-lg "> {projections[0]?.movie.title}</p>
                        <p className="text-white text-2xl max-w-lg">{projections[0]?.movie.description}</p>
                        <div className=" flex justify-center px-20">
                            <button
                                className="text-white text-xl border border-gray-400 rounded-lg p-2 hover:bg-orange-500 hover:border-orange-500"
                                onClick={()=>handleLearnMore()}
                            >Learn
                                more
                            </button>
                        </div>
                        <p className="text-white text-3xl">Reserve a seat</p>
                        <div className="grid grid-cols-4 gap-x-6 gap-y-5 ">
                            {projectionDates.length > 0 && projectionDates.map((projection) => {
                                return <button
                                    onClick={() => navigate(`${Paths.Reservation}/${projection.id}`)}
                                    key={projection.time}
                                    className="text-white border border-gray-400 rounded-lg p-2 hover:bg-orange-500 hover:border-orange-500">
                                    {projection.time}
                                </button>
                            })}
                        </div>
                    </div>
                    <div>
                        {projections[0].movie.images && <CardMedia
                            sx={{
                                height: "450px",
                                width: "450px",
                                padding: "10px",
                                marginTop: "60px",
                                marginRight: "200px",
                                borderRadius: "20px",
                                opacity: "40%"
                            }}
                            component="img"
                            image={projections[0].movie.images[0]?.url}
                            alt="opis slike"
                        />}
                    </div>
                </div>
            </div>}
            <div ref={ref} className={` ${loading ? 'hidden' : 'visible'}`}>
                <p className="text-4xl text-center text-orange-600 mb-10">About movie</p>
                <hr className=" h-px bg-orange-500 border-0 mx-24"/>
                <div className=" flex justify-center">
                    <div className=" w-full flex mx-24 justify-center rounded-xl mb-20">
                        <iframe className=" mx-56 my-12 rounded-xl"
                                width="100%" height="450"
                                src='https://www.youtube.com/embed/Vh_3zdmaHbk'
                                allow='autoplay; encrypted-media'
                                allowFullScreen
                                title='trailer'
                        />
                    </div>
                </div>
            </div>
        </div>
    </>);
};
export default MoviePage;