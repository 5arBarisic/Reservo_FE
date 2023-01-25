import axios from "axios";
import {Reservation} from "./types";


axios.defaults.baseURL = 'http://localhost:8080/api/v1';

const getMovies = async () => {

    return axios.get('/movies');
}

const getProjectionById = async (id:number|string) => {

    return axios.get(`/projections/${id}`)
}

const getProjectionsByMovie = async (id: number|string) => {

    return axios.get(`/projections/movie/${id}`)
}

const createReservation = async (values:Reservation)=>{

    return axios.post(`/reservations`,values)
}

export {getMovies, getProjectionById, getProjectionsByMovie,createReservation}