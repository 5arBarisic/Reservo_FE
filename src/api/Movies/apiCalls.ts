import axios from "axios";
import {MovieRequest, ProjectionRequest, Reservation} from "./types";


axios.defaults.baseURL = 'http://localhost:8080/api/v1';

const getMovies = async () => {

    return axios.get('/movies');
}

const getMovieById = async (id: number | string) => {

    return axios.get(`/movies/${id}`)
}

const getProjectionById = async (id: number | string) => {

    return axios.get(`/projections/${id}`)
}

const getProjectionsByMovie = async (id: number | string) => {

    return axios.get(`/projections/movie/${id}`)
}


const getAllProjections = async () => {

    return axios.get(`/projections`)
}


const createProjection = async (values: ProjectionRequest) => {

    return axios.post(`/projections`, values)
}

const createReservation = async (values: Reservation) => {

    return axios.post(`/reservations`, values)
}

const getUserReservations = async (id: number | string) => {
    return axios.get(`/reservations/${id}`)
}

const getAllReservations  = async () => {

    return axios.get(`/reservations`)
}


const createMovie = async (values: MovieRequest) => {

    return axios.post(`/movies`, values)
}

export {
    getMovies,
    getProjectionById,
    getProjectionsByMovie,
    createReservation,
    getUserReservations,
    createMovie,
    getMovieById,
    createProjection,
    getAllProjections,
    getAllReservations
}