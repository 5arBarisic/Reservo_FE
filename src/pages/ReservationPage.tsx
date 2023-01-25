import React, {useCallback, useContext, useEffect, useState} from 'react'
import Cinema from "../components/reservation/Cinema";
import ShowCase from "../components/reservation/ShowCase";
import HeadBar from "../components/navigation/HeadBar";
import {createReservation, getProjectionById, getProjectionsByMovie} from "../api/Movies/apiCalls";
import {Projection, Reservation, ReservationSeat} from "../api/Movies/types";
import {useParams} from "react-router-dom";
import {AuthContext, getUserEmail} from "../authConfig/Authentication";
import {getUserByEmail} from "../api/Users/apiCalls";
import {User} from "../api/Users/types";


const formatDate = (backendDate: string | undefined) => {

    if (backendDate) return new Date(backendDate).toLocaleDateString('en-GB') +
        ' ' + new Date(backendDate).getHours() +
        ':' + new Date(backendDate).getMinutes();
}
const seatSorterToObject = (seat: number) => {

    const row = Math.ceil(seat / 8);
    const number = seat - ((row - 1) * 8);

    return {row, number};
}
const seatSorterTFromObject = (row: number, inRowSeat: number) => {

    return inRowSeat + ((row - 1) * 8);
}

const megaSeatSorter = (projections: Projection[], id: string | number | undefined) => {

    let z = 0;
    const reservedSeats: number[] = [];

    for (let i = 0; i < projections.length; i++) {
        if (projections[i].id === Number(id)) {
            for (let j = 0; j < projections[i].seats.length; j++) {
                if (projections[i].seats[j].reserved === 1) {
                    reservedSeats[z] = seatSorterTFromObject(projections[i].seats[j].row, projections[i].seats[j].number);
                    z++;
                }
            }
        }

    }
    return reservedSeats;

}


const ReservationPage = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [reservedSeats, setReservedSeats] = useState<number[]>([])
    const [selectedSeats, setSelectedSeats] = useState<number[]>([])
    const [projection, setProjection] = useState<Projection>();
    const [movie_Id, setMovieId] = useState<string>()
    const [projections, setProjections] = useState<Projection[]>([]);
    const [user, setUser] = useState<User>();
    const {token} = useContext(AuthContext);

    const loadMovieProjection = useCallback(async (projectionId: string) => {
        setLoading(true);

        await getProjectionById(projectionId)
            .then((response) => {
                setProjection(response.data);
                setMovieId(response.data.movie.id);
            })
            .catch(() => setProjection(undefined))
            .finally(() => setLoading(false));
    }, [setMovieId, setProjection]);

    const loadMovieProjections = useCallback(async (movieId: string) => {
        setLoading(true);


        await getProjectionsByMovie(movieId)
            .then((response) => {
                setProjections(response.data);
                setReservedSeats(megaSeatSorter(response.data, id));
            })
            .catch(() => setProjections([]))
            .finally(() => setLoading(false));
    }, [setProjections, setReservedSeats, id])

    const loadUser = async () => {
        setLoading(true);

        let email = getUserEmail(token);

        await getUserByEmail(email)
            .then((response) => {
                setUser(response.data);
            })
            .catch(() => setUser(undefined))
            .finally(() => setLoading(false));
    };

    const submitReservation = async () => {
        let seats: ReservationSeat[] = [];

        for (let i = 0; i < selectedSeats.length; i++) {
            seats[i] = seatSorterToObject(selectedSeats[i]);
        }

        let reservation: Reservation = {

            movieProjectionId: projection?.id,
            price: selectedSeats.length * 55,
            userId:user?.id,
            seats: seats
        }

        await createReservation(reservation)
            .catch((error)=>{
            console.log(error.response.data)
        }).finally(()=>console.log("bravooo"))

    }

    useEffect(() => {
        void loadUser()
        if (id) void loadMovieProjection(id);
        if (movie_Id) void loadMovieProjections(movie_Id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, movie_Id, loadMovieProjections, loadMovieProjection]);


    return (<>
        {!loading &&
            <div className="font-serif bg-gray-800 text-xl min-h-screen grid scroll-auto gap-y-10">
                <HeadBar haveBorder={false}/>
                <div className="text-center flex flex-row gap-x-10">
                    <div className="ml-20 mt-40">
                        <ShowCase/>
                    </div>
                    <div>
                        <Cinema
                            reservedSeats={reservedSeats}
                            selectedSeats={selectedSeats}
                            onSelectedSeatsChange={(selectedSeats: number[]) => setSelectedSeats(selectedSeats)}
                            numOfSeats={projection?.auditorium.seatsNo}
                        />
                    </div>
                    <div className=" flex flex-col gap-y-3 text-start ">
                        <p className="text-white"><span
                            className="text-orange-600">Naziv filma :</span> {' '} {projection?.movie.title}</p>
                        <p className="text-orange-600">Datum i vrijeme projekcije:</p>
                        <p className="text-white">{formatDate(projection?.screeningTime)}</p>
                        <p className="text-orange-600">Odabrana sjedala:{' '}</p>
                        <div className="grid gap-2 text-center overflow-y-auto h-48 "
                             style={{gridTemplateColumns: "repeat(8, min-content)"}}>
                            {selectedSeats.map(seat => {
                                return (
                                    <span
                                        tabIndex={0}
                                        key={seat}
                                        className='inline-block text-white  text-sm pt-2 font-sans bg-orange-600 w-10 h-8 rounded-t-md  relative top-1 '


                                    >{seat}</span>
                                )
                            })}
                        </div>
                        <div className="flex flex-col w-96">
                            <p className="text-white"><span
                                className="text-orange-600">Cijena:</span> {' '}{selectedSeats.length * 5}{' e'}</p>
                            <button
                                className=" mt-4 text-white max-w-fit p-3 rounded-2xl border border-orange-400 self-end hover:bg-orange-700"
                                onClick={() => submitReservation()}>Rezerviraj
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
    </>)
}
export default ReservationPage;


