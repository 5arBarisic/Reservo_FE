import React from "react";


export type ReservationProps = {
    name: string,
    price: number,
    occupied: number[]
};
type MovieProps = {
    movie: ReservationProps,
    onChange: (movie: ReservationProps) => void
}

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

const Movies = ({movie, onChange}: MovieProps) => {
    return (
        <div className="mb-10">
            <label className="mr-4 text-white">Pick a date</label>
            <select
                id="movie"
                className="appearance-none bg-white text-lg pl-3 rounded-lg"
                value={movie.name}
                onChange={e => {
                    onChange(movies.find(movie => movie.name === e.target.value) ?? {
                        name: "",
                        price: 0,
                        occupied: [1, 3, 6]
                    })
                }}
            >
                {movies.map(movie => (
                    <option key={movie.name} value={movie.name}>
                        {movie.name} (${movie.price})
                    </option>
                ))}
            </select>
        </div>
    )
}
export default Movies;