import React, {useCallback, useContext, useEffect, useState} from 'react'
import Cinema from "../components/reservation/Cinema";
import ShowCase from "../components/reservation/ShowCase";
import HeadBar from "../components/navigation/HeadBar";
import {createReservation, getProjectionById, getProjectionsByMovie} from "../api/Movies/apiCalls";
import {Projection, Reservation, ReservationSeat} from "../api/Movies/types";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext, getUserEmail} from "../authConfig/Authentication";
import {getUserByEmail} from "../api/Users/apiCalls";
import {User} from "../api/Users/types";
import {useNotification} from "use-toast-notification";
import {formatDate, handlePrice} from "../utils/functions";
import {Checkbox, TextField} from "@mui/material";
import {Paths} from "../routes/Paths";


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
    const [loyalty, setLoyalty] = useState<number | string>(0)
    const [checked, setChecked] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    const notification = useNotification()
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

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

    const loadUser = useCallback(async () => {
        setLoading(true);

        let email = getUserEmail(token);

        await getUserByEmail(email)
            .then((response) => {
                setUser(response.data);
                setLoyalty(response.data.loyaltyPoints);
            })
            .catch(() => setUser(undefined))
            .finally(() => setLoading(false));
    }, [token]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };


    var price = handlePrice(selectedSeats, projection?.auditorium.seatsNo);
    var loyaltyRequest = 0;
    if (checked) {
        if (price - Number(loyalty) >= 0 && Number(loyalty) >= 0) {
            price = price - Number(loyalty);
            loyaltyRequest = Number(loyalty);
        } else if (price - Number(loyalty) < 0 && Number(loyalty) >= 0) {
            loyaltyRequest = price;
            price = 0;
        }
    }
    const submitReservation = async () => {
        let seats: ReservationSeat[] = [];

        for (let i = 0; i < selectedSeats.length; i++) {
            seats[i] = seatSorterToObject(selectedSeats[i]);
        }


        let reservation: Reservation = {

            movieProjectionId: projection?.id,
            price: price,
            loyaltyPoints: loyaltyRequest,
            userId: user?.id,
            seats: seats
        }

        if (user?.loyaltyPoints && loyaltyRequest > user?.loyaltyPoints) {
            notification.show({
                message: 'Morata odabrati valjan broj bodova',
                title: 'Rezervacija neuspješna',
                variant: 'error'
            })
        } else if (reservation.seats?.length === 0) {
            notification.show({
                message: 'Morata odabrati sjedala za rezervaciju',
                title: 'Rezervacija neuspješna',
                variant: 'error'
            })
        } else if (user === undefined) {
            notification.show({
                message: 'Morata se ulogirati za rezervaciju',
                title: 'Rezervacija neuspješna',
                variant: 'error'
            })
        } else {

            await createReservation(reservation)
                .catch((error) => {
                    console.log(error.response.data)
                }).then(() => notification.show({
                    message: 'Uspješno ste rezervirali kartu',
                    title: 'Rezervacija uspješna',
                    variant: 'success'
                })).finally(()=>navigate(Paths.Profile));

        }

    }

    useEffect(() => {
        void loadUser()
        if (id) void loadMovieProjection(id);
        if (movie_Id) void loadMovieProjections(movie_Id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, movie_Id, loadMovieProjections, loadMovieProjection, loadUser]);


    return (<>
        {!loading &&
            <div className="font-serif bg-gray-800 text-xl min-h-screen grid scroll-auto gap-y-10">
                <HeadBar haveBorder={false}/>
                <div className="text-center flex flex-row gap-x-10">
                    <div className="ml-20 mt-20 ">
                        <p className="text-orange-600">Dvorana: </p>
                        <p className="text-white mt-2 uppercase">{projection?.auditorium.name}</p>
                        <div className="flex flex-row justify-center mt-2">
                            <p className="text-orange-600 mt-2">Use loyalty points:</p>
                            <Checkbox
                                sx={{color: "white"}}
                                checked={checked}
                                onChange={handleChange}/>
                        </div>
                        <div className="flex justify-center mt-5">
                            <TextField
                                sx={{fieldset: {borderColor: "gray"}, maxWidth: "100px", input: {color: 'white'}}}
                                name="duration_min" type="number"
                                InputProps={{
                                    inputProps: {min: 0}
                                }}
                                disabled={!checked}
                                value={loyalty}
                                onChange={(newValue) => {
                                    setLoyalty(newValue.target.value);
                                }}/>
                        </div>
                        <div className="mt-10">
                            <ShowCase/>
                        </div>
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
                                        className='inline-block text-white  text-sm pt-2 font-sans bg-orange-500 w-10 h-8 rounded-t-md  relative top-1 '


                                    >{seat}</span>
                                )
                            })}
                        </div>
                        <div className="flex flex-col w-96">
                            <p className="text-white"><span
                                className="text-orange-600">Cijena:</span> {' '}{price}{' €'}</p>
                            <button
                                className=" mt-4 text-white max-w-fit p-3 rounded-xl border border-orange-600 self-end bg-orange-600 hover:bg-gray-800 "
                                onClick={() => submitReservation()}>Rezerviraj
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
    </>)
}
export default ReservationPage;


