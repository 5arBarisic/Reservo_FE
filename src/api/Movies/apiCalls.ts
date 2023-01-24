import axios from "axios";


axios.defaults.baseURL = 'http://localhost:8080/api/v1';

const getMovies = async () => {

    return axios.get('/movies');
}

const getAllProjections = async () => {

    return axios.get('/projections')
}

const getProjectionsByMovie = async (id: number|string) => {

    return axios.get(`/projections/movie/${id}`)
}


export {getMovies, getAllProjections, getProjectionsByMovie}