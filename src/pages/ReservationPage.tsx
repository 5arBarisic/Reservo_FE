import React, {useState} from 'react'
import Cinema from "../components/reservation/Cinema";
import Movies from "../components/reservation/Movies";
import ShowCase from "../components/reservation/ShowCase";
import HeadBar from "../components/navigation/HeadBar";

 export type ReservationProps = {
    name: string,
    price: number,
    occupied: number[]
};


const movies: ReservationProps[] = [
    {
        name: 'Avatar',
        price: 10,
        occupied: [20, 21, 30, 3, 1, 8],
    },
    {
        name: 'Ant-man',
        price: 12,
        occupied: [9, 41, 35, 11, 65, 26],
    }

]


export default function ReservationPage() {
    const [selectedMovie, setSelectedMovie] = useState<ReservationProps>(movies[0])
    const [selectedSeats, setSelectedSeats] = useState<number[]>([])


    const seatSorterToObject = (seat: number) => {

        const row = Math.ceil(seat / 8);
        const inRowSeat = seat - ((row - 1) * 8);

        return {row, inRowSeat};
    }
    const seatSorterTFromObject = (row: number, inRowSeat:number) => {

        return inRowSeat + ((row - 1) * 8) ;
    }

    console.log(seatSorterToObject(9));

    return (
        <div className="font-serif bg-gray-800 text-xl min-h-screen grid justify-center gap-y-10">
            <HeadBar haveBorder={false}/>
            <div className="text-center flex flex-row items-center gap-x-4">
                <div>
                <Movies
                    movie={selectedMovie}
                    onChange={(movie: ReservationProps) => {
                        setSelectedSeats([])
                        setSelectedMovie(movie)
                    }}
                />
                <ShowCase/>
                </div>
                <Cinema
                    movie={selectedMovie}
                    selectedSeats={selectedSeats}
                    onSelectedSeatsChange={(selectedSeats: number[]) => setSelectedSeats(selectedSeats)}
                />

                <p className="text-white">
                    You have selected <span className="text-green-500">{selectedSeats.length}</span>{' '}
                    seats for the price of{' '}
                    <span className="text-green-500">
          {selectedSeats.length * selectedMovie.price}$
        </span>
                </p>
            </div>
        </div>
    )
}



