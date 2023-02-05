import React from "react";
import {ReservationResponse} from "../../api/Movies/types";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {formatDate} from "../../utils/functions";


const seatSorterTFromObject = (row: number, inRowSeat: number) => {

    return inRowSeat + ((row - 1) * 8);
}


const Tickets = ({
                     reservations
                 }: { reservations: ReservationResponse[] }) => {

    return (<div
        className="mx-auto max-w-4xl flex flex-col justify-start gap-y-10 bg-gray-700 mt-10 shadow-md shadow-blue-600 rounded-xl p-10">
        <div className="flex justify-start">
            <p className="text-white text-3xl"> List of tickets</p>
        </div>
        <div className="mt-10">
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{color: "blue", fontSize: "20px"}}>Movie title</TableCell>
                            <TableCell sx={{color: "blue", fontSize: "20px"}} align="center">Auditorium</TableCell>
                            <TableCell sx={{color: "blue", fontSize: "20px"}} align="center">Screening
                                time</TableCell>
                            <TableCell sx={{color: "blue", fontSize: "20px"}} align="center">Price</TableCell>
                            <TableCell sx={{color: "blue", fontSize: "20px"}} align="center">Seats</TableCell>
                            <TableCell sx={{color: "blue", fontSize: "20px"}} align="center">User</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row" align="left">
                                    {row.movieProjection.movie.title}
                                </TableCell>
                                <TableCell align="center">{row.movieProjection.auditorium.name}</TableCell>
                                <TableCell align="center">{formatDate(row.movieProjection.screeningTime)}</TableCell>
                                <TableCell align="center">{row.price}{' €'}</TableCell>

                                <TableCell align="center">{row.seatDto.map((seat, index) =>
                                        <span key={seat.id}>
                                            {seatSorterTFromObject(seat.row, seat.number)}
                                            {index < row.seatDto.length - 1 ? ", " : ""}
                                        </span>
                                )}
                                </TableCell>
                                <TableCell align="center">{row.user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>);
}
export default Tickets