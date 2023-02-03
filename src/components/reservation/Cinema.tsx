import clsx from "clsx";
import React from "react";
import './Cinema.css'


export type CinemaProps = {
    reservedSeats: number[],
    selectedSeats: number[],
    onSelectedSeatsChange: (seats: number[]) => void,
    numOfSeats: number | undefined
}

const seats_80 = Array.from({length: 8 * 10}, (_, i) => i + 1)
const seats_64 = Array.from({length: 8 * 8}, (_, i) => i + 1)

const Cinema = ({reservedSeats, selectedSeats, onSelectedSeatsChange, numOfSeats}: CinemaProps) => {

   const handleSelectedState=(seat: number) =>{
        const isSelected = selectedSeats.includes(seat)
        if (isSelected) {
            onSelectedSeatsChange(
                selectedSeats.filter(selectedSeat => selectedSeat !== seat),
            )
        } else {
            onSelectedSeatsChange([...selectedSeats, seat])
        }
    }

    let seats = seats_64;
    if (numOfSeats === 80) seats = seats_80;

    return (
        <div className=" grid place-items-center gap-6" style={{perspective: "400px"}}>
            <div className="bg-white h-24 scale-110 shadow-md shadow-gray-500"
                 style={{transform: "rotateX(-30deg) ", width: "420px"}}/>

            <div className="grid gap-2 items-center" style={{gridTemplateColumns: "repeat(8, min-content)"}}>
                {seats.map(seat => {
                    const isSelected = selectedSeats.includes(seat)
                    const isOccupied = reservedSeats.includes(seat)
                    return (
                        <span
                            tabIndex={0}
                            key={seat}
                            className={clsx(
                                `sjedalo ${(seats===seats_80 && seat > 64) || (seats===seats_64 && seat > 56)  ? 'text-yellow-300' : 'text-white' }  inline-block text-sm pt-2 font-sans ${isSelected ? 'bg-orange-500':'bg-gray-600' } w-10 h-8 rounded-t-md ease-in-out duration-300 relative top-1 `,
                                !isOccupied && 'hover:cursor-pointer hover:bg-orange-500 hover:scale-125 ',
                                isSelected && ' after:content-none after:absolute after:top-0 after:left-1 after:w-3 after:h-3 after:bg-transparent after:border after:border-solid after:border-orange-400 after:hidden hover:cursor-pointer hover:bg-orange-400 hover:scale-125 ',
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