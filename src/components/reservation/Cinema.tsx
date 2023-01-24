import clsx from "clsx";
import React from "react";
import './Cinema.css'
import {ReservationProps} from "../../pages/ReservationPage";


export type CinemaProps = {
    movie: ReservationProps,
    selectedSeats: number[],
    onSelectedSeatsChange: (seats: number[]) => void
}

const seats = Array.from({length: 8 * 10}, (_, i) => i + 1)

const Cinema = ({movie, selectedSeats, onSelectedSeatsChange}: CinemaProps) => {
    function handleSelectedState(seat: number) {
        const isSelected = selectedSeats.includes(seat)
        if (isSelected) {
            onSelectedSeatsChange(
                selectedSeats.filter(selectedSeat => selectedSeat !== seat),
            )
        } else {
            onSelectedSeatsChange([...selectedSeats, seat])
        }
    }

    return (
        <div className=" mb-5 grid place-items-center gap-6" style={{perspective: "400px"}}>
            <div className="bg-white h-24 scale-110 shadow-md shadow-gray-500"
                 style={{transform: "rotateX(-30deg) ", width: "420px"}}/>

            <div className="grid gap-2 items-center " style={{gridTemplateColumns: "repeat(8, min-content)"}}>
                {seats.map(seat => {
                    const isSelected = selectedSeats.includes(seat)
                    const isOccupied = movie.occupied.includes(seat)
                    return (
                        <span
                            tabIndex={0}
                            key={seat}
                            className={clsx(
                                'sjedalo inline-block text-sm pt-2 font-sans bg-gray-600 w-10 h-8 rounded-t-md ease-in-out duration-300 relative top-1 ',
                                !isOccupied && 'hover:cursor-pointer hover:bg-green-300 hover:scale-125 ',
                                isSelected && 'bg-green-500 after:content-none after:absolute after:top-0 after:left-1 after:w-3 after:h-3 after:bg-transparent after:border after:border-solid after:border-green-500 after:hidden hover:cursor-pointer hover:bg-green-200 hover:scale-125 ',
                                isOccupied && 'bg-gray-400 ',
                            )}
                            onClick={isOccupied ? undefined : () => handleSelectedState(seat)}
                            onKeyPress={
                                isOccupied
                                    ? undefined
                                    : e => {
                                        if (e.key === 'Enter') {
                                            handleSelectedState(seat)
                                        }
                                    }
                            }
                        >{seat}</span>
                    )
                })}
            </div>
        </div>
    )
}

export default Cinema;