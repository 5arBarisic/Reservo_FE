import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import HeadBar from "../components/navigation/HeadBar";
import {CardMedia} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {getMovieById, getProjectionsByMovie} from "../api/Movies/apiCalls";
import {Movie, Projection} from "../api/Movies/types";
import {Paths} from "../routes/Paths";
import {formatDate} from "../utils/functions";
import Review from "../components/reviews/Reviews";
import AddReview from "../components/reviews/AddReview";
import {User} from "../api/Users/types";
import {AuthContext, getUserEmail} from "../authConfig/Authentication";
import {getUserByEmail} from "../api/Users/apiCalls";


export type ProjectionProps = {
    id: number;
    time: string;
}

const MoviePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {token, saveToken} = useContext(AuthContext);
    const [projections, setProjections] = useState<Projection[]>([]);
    const [projectionDates, setProjectionDates] = useState<ProjectionProps[]>([]);
    const [movie, setMovie] = useState<Movie>()
    const [user, setUser] = useState<User>();

    const ref = useRef<null | HTMLDivElement>(null);

    const handleLearnMore = () => {

        ref.current?.scrollIntoView({behavior: 'smooth'});
    };


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
            .catch(() => {
                setProjections([])
            })
            .finally(() => setLoading(false));

        await getMovieById(movieId)
            .then((response) => {
                setMovie(response.data);
            })
            .catch(() => setMovie(undefined))

    }

    const loadUser = useCallback(async () => {

        let email = getUserEmail(token);

        await getUserByEmail(email)
            .then((response) => {
                setUser(response.data);
            })
            .catch(() => setUser(undefined))
    }, [token]);


    useEffect(() => {
        if (id) void loadMovieProjections(id);
                void loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id,loadUser]);

    return (<>
        <div
            className={` ${loading ? 'bg-gradient-to-r from-black via-gray-800 to-orange-500' : 'bg-white'} space-y-6`}>
            {!loading && <div style={{borderRadius: "0 0 200px 0"}}
                              className="mx-auto bg-gradient-to-r from-black via-gray-800 to-orange-500 min-h-screen">
                <HeadBar haveBorder={false}/>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col ml-44 mt-20 gap-y-10 mb-24 items-center">
                        <p className="text-orange-600 text-6xl max-w-lg "> {projections[0]?.movie.title ?? movie?.title}</p>
                        <p className="text-white text-2xl max-w-lg">{projections[0]?.movie.description ?? movie?.description}</p>
                        <div className=" flex justify-center px-20">
                            <button
                                className="text-white text-xl border border-gray-400 rounded-lg p-2 hover:bg-orange-500 hover:border-orange-500"
                                onClick={() => handleLearnMore()}
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

                            {projectionDates.length === 0 &&
                                <p className="text-white text-xl justify-self-center">COMING SOON</p>}
                        </div>
                    </div>
                    <div>
                        {projections.length > 0 && projections[0].movie.images ? <CardMedia
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
                        /> : <CardMedia
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
                            image={movie?.images[0].url}
                            alt="opis slike"
                        />}
                    </div>
                </div>
            </div>}
            <div ref={ref} className={` ${loading ? 'hidden' : 'visible'}`}>
                <p className="text-4xl text-center text-orange-600 mb-10">About movie</p>
                <hr className=" h-px bg-orange-500 border-0 mx-24"/>
                <div className=" flex justify-center">
                    <div className=" w-full flex mx-24 justify-center rounded-xl">
                        <iframe className=" mx-56 my-12 rounded-xl"
                                width="100%" height="450"
                                src={`https://www.youtube.com/embed/${projections[0]?.movie.trailer ?? movie?.trailer}`}
                                allow='autoplay; encrypted-media'
                                allowFullScreen
                                title='trailer'
                        />
                    </div>
                </div>
            </div>
            <div className={` ${loading ? 'hidden' : 'visible'}`}>
                <p className="text-4xl text-center text-orange-600 mb-10">User reviews</p>
                <hr className=" h-px bg-orange-500 border-0 mx-24"/>
                <div className="flex justify-center mt-2">
                    <div className=" grid grid-cols-4 gap-x-8 gap-y-5 p-3 ">
                        {user && id && <AddReview name={user.firstName} movieId={id} userId={user.id} refreshReviews={()=>loadMovieProjections(id)}/>}
                        {projections[0]?.movie.reviews.length > 0 ? projections[0]?.movie.reviews.map((review) => {
                            return (<Review key={review.id} name={review.user.firstName} description={review.description}
                                            rating={review.rating}/>)
                        }):<p className="text-3xl text-orange-600 h-14">No reviews yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    </>);
};
export default MoviePage;