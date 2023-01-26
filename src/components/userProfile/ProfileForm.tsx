import React from "react";
import {User} from "../../api/Users/types";
import {ReservationResponse} from "../../api/Movies/types";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


const formatDate = (backendDate: string | undefined) => {

    if (backendDate) return new Date(backendDate).toLocaleDateString('en-GB') +
        ' ' + new Date(backendDate).getHours() +
        ':' + new Date(backendDate).getMinutes();
}


const ProfileForm = ({user,reservations}: { user: User | undefined ,reservations:ReservationResponse[]|undefined}) => {

    console.log(reservations);
    return (
        <div className=" mx-auto max-w-6xl flex flex-col justify-start gap-y-10 bg-gray-700 mt-4 shadow-md shadow-orange-700 rounded-xl p-10">
            <p className="text-3xl text-white">My profile</p>
            <div className="grid grid-cols-2 max-w-sm gap-y-3 ">
                <p className="text-2xl text-orange-600">First name:</p>
                <p className="text-2xl text-white">{user?.firstName}</p>
                <p className="text-2xl text-orange-600">Last name:</p>
                <p className="text-2xl text-white">{user?.lastName}</p>
                <p className="text-2xl text-orange-600">Email:</p>
                <p className="text-2xl text-white">{user?.email}</p>
                <p className="text-2xl text-orange-600">Loyalty points:</p>
                <p className="text-2xl text-white">{user?.loyaltyPoints}</p>
            </div>
            <hr className="text-gray-700"/>

            <p className="text-3xl text-white">My reservations</p>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{color:"orangered", fontSize:"20px"}} >Movie name</TableCell>
                            <TableCell sx={{color:"orangered", fontSize:"20px"}} align="center">Screening time</TableCell>
                            <TableCell sx={{color:"orangered", fontSize:"20px"}} align="center">Auditorium</TableCell>
                            <TableCell sx={{color:"orangered", fontSize:"20px"}}  align="center">Number of seats</TableCell>
                            <TableCell sx={{color:"orangered", fontSize:"20px"}}  align="center">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="left">
                                    {row.movieProjection.movie.title}
                                </TableCell>
                                <TableCell align="center">{formatDate(row.movieProjection.screeningTime)}</TableCell>
                                <TableCell align="center">{row.movieProjection.auditorium.name}</TableCell>
                                <TableCell align="center">{row.seatDto.length}</TableCell>
                                <TableCell align="center">{row.price} {' e'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default ProfileForm